import { IReviewFormInputs } from "@/typings/Review.type";
import { Button, Flex, FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { apiPaths } from "@/app/data/api-paths";
import { mutate } from "swr";
import { createReview } from "@/fetchers/show";

interface IReviewFormProps{
        showId: number;
}

export const ReviewForm = ({showId}: IReviewFormProps) => { 
    const { trigger } = useSWRMutation(apiPaths.reviews, createReview,
        {
            onSuccess: () => {
                mutate(apiPaths.showReviews(showId.toString()));
                mutate(apiPaths.show(showId.toString()));
            },
            onError: (err) => {
                setError('root', {message:err.message});
            }
        }
    );

    const [starRatingValue, setStarRatingValue] = useState(0);
    const {register, handleSubmit, reset, setValue, setError, clearErrors, getValues,
        formState:{
            isSubmitting,
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
        setStarRatingValue(0);
        reset({
            comment: "",
            rating: undefined,
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

    const starRatingChange = (value: number | undefined, temporary: boolean) => {
        if(value){
            setStarRatingValue(value);
            if(!temporary){                
                clearErrors('rating');
                setValue('rating', value);
            }
        }else{
            setStarRatingValue(getValues('rating'));
        }
    }

    return (
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <FormControl isInvalid={errors.root && errors.root.message != ""}>
          <Flex flexDirection={"column"} gap={5}>
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
              isInvalid={errors.rating && errors.rating.message != ""}
            >
              <StarRating
                value={starRatingValue}
                onChange={starRatingChange}
                label="Rating:"
              />
              <FormErrorMessage>{errors.rating?.message}</FormErrorMessage>
            </FormControl>
            <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
            <Button
              width={["100%", "100%", "fit-content"]}
              isLoading={isSubmitting}
              loadingText="Submitting"
              rounded={20}
              type="submit"
            >Post</Button>
          </Flex>
        </FormControl>
      </form>
    );
}