import { IReview, IReviewFormInputs } from "@/typings/Review.type";
import { Button, Flex, FormControl, FormErrorMessage, Image, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { apiPaths } from "@/app/data/api-paths";
import { mutate } from "swr";
import { editReview } from "@/fetchers/show";

interface IEditReviewFormProps{
    review: IReview;
    onFinishEdit: ()=>void;
}

export const EditReviewForm = ({review, onFinishEdit}: IEditReviewFormProps) => { 
    const { trigger } = useSWRMutation(apiPaths.review(review.id), editReview,
        {
            onSuccess: () => {
                mutate(apiPaths.showReviews(review.show_id.toString()));
                mutate(apiPaths.show(review.show_id.toString()));
            },
            onError: (err) => {
                setError('root', {message:err.message});
            }
        }
    );

    const [starRatingValue, setStarRatingValue] = useState(review.rating);
    const {register, handleSubmit, reset, setValue, setError, getValues,
        formState:{
            isSubmitting,
            errors,
        }
    } = useForm<IReviewFormInputs>({
        defaultValues:{
            comment: review.comment,
            rating: review.rating,
            show_id: review.show_id
        }
    });

    const resetForm = ()=>{
        setStarRatingValue(0);
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

        const newReview: IReviewFormInputs = {
            show_id: review.show_id,
            comment: data.comment,
            rating: data.rating,
        };

        if(newReview.comment != review.comment || newReview.rating != review.rating){
            await trigger(newReview);
        }
        onFinishEdit();
        resetForm();
    } 

    const starRatingChange = (value: number | undefined, temporary: boolean) => {
        if(value){
            setStarRatingValue(value);
            if(!temporary){                
                setValue('rating', value);
            }
        }else{
            setStarRatingValue(getValues('rating'));
        }
    }

    return (

        <Flex 
            as={"form"}
            onSubmit={handleSubmit(formSubmitHandler)}
            backgroundColor={"purple"} 
            rounded={20} 
            flexDirection={"column"} 
            gap={3} 
            padding={5}>
            <Flex 
                height={10} 
                alignItems={"center"} 
                gap={3}>
                <Image 
                    rounded={20} 
                    height={"100%"} 
                    objectFit={"cover"} 
                    alt="user image" 
                    src={review.user.image_url || "https://fakeimg.pl/100x100?text=:)"}
                    ></Image>
                <Text>{review.user.email}</Text>
            </Flex>
            
            <FormControl isInvalid={errors.comment && errors.comment.message != ""}> 
                <Textarea
                    {...register('comment')}
                    backgroundColor={"white"}
                    color={"purple"}
                    placeholder='Add comment'
                    defaultValue={review.comment}
                    required
                />
                <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
            </FormControl>
            <Text>{starRatingValue} / 5</Text>
            <StarRating
                value={starRatingValue}
                onChange={starRatingChange}
                label="Rating:"
            />
                <Flex gap={3}>
                    <Button
                        isLoading={isSubmitting}
                        loadingText="Editing"  
                        type="submit"
                    >Edit</Button>
                    <Button
                        onClick={() => onFinishEdit()}
                    >Cancel</Button>
                </Flex>
        </Flex>
    );
}