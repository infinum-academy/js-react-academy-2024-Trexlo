import { IReviewFormInputs } from "@/typings/Review.type";
import { Button, Flex, FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import { StarRating } from "../StarRating/StarRating";
import { Controller, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { apiPaths } from "@/app/data/api-paths";
import { mutate } from "swr";
import { createReview } from "@/fetchers/show";
import { ReviewPaginationContext } from "../ShowReviewSection/components/ReviewPaginationContext";
import { useContext } from "react";

interface IReviewFormProps{
        showId: number;
}

export const ReviewForm = ({showId}: IReviewFormProps) => { 
    const { pagination } = useContext(ReviewPaginationContext);
    const { trigger } = useSWRMutation(apiPaths.reviews, createReview,
        {
            onSuccess: () => {
                mutate(apiPaths.showReviews(showId.toString(), pagination.page, pagination.items));
                mutate(apiPaths.show(showId.toString()));
            },
            onError: (err) => {
                setError('root', {message:err.message});
            }
        }
    );

    const {register, handleSubmit, reset, setError, clearErrors, control, setValue,
        formState:{
            isSubmitting,
            isDirty,
            errors
        }
    } = useForm<IReviewFormInputs>({
      defaultValues:{
        comment:"",
        rating:0,
        show_id:showId
      }
    });

    const resetForm = ()=>{
      reset({
          comment: "",
          rating: 0,
      });
    }

    const formSubmitHandler = async (data: IReviewFormInputs) => {
        if(!data.comment || !data.rating){
            if(!data.comment){
                setError('comment', {message:"Comment cannot be empty."});
            }
            if(!data.rating){
                setError('rating', {message:"Rating cannot be empty."});
            }
            return;
        }
        clearErrors(['comment', 'rating']);

        const newReview: IReviewFormInputs = {
            show_id: showId,
            comment: data.comment,
            rating: data.rating,
        };

        await trigger(newReview);
        resetForm();
    } 

    return (
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <FormControl isInvalid={errors.root && errors.root.message != ""}>
          <Flex flexDirection={"row"} flexWrap={"wrap"} justifyContent={"space-between"} gap={5}>
            <FormControl
              isInvalid={errors.comment && errors.comment.message != ""}
            >
              <Textarea
                {...register("comment")}
                backgroundColor={"white"}
                placeholder="Add comment"
                required
              />
              <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              width={"fit-content"}
              isInvalid={errors.rating && errors.rating.message != ""}
            >
              <Controller
                control={control}
                name="rating"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <StarRating
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Rating:"
                />
                )}
              />
             
              <FormErrorMessage>{errors.rating?.message}</FormErrorMessage>
            </FormControl>
            <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
            <Button
              isLoading={isSubmitting}
              loadingText="Submitting"
              type="submit"
              isDisabled={!isDirty}
            >Post</Button>
          </Flex>
        </FormControl>
      </form>
    );
}