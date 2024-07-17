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
    const [rating, setRating] = useState(review.rating);
    const {register, handleSubmit, reset, setValue, setError,
        formState:{
            isSubmitting,
            errors
        }
    } = useForm<IReviewFormInputs>();

    const resetForm = ()=>{
        setStarRatingValue(0);
        setRating(0);
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

        const newReview: IReviewFormInputs = {
            show_id: review.show_id,
            comment: data.comment,
            rating: data.rating,
        };

        await trigger(newReview);
        onFinishEdit();
        resetForm();
    } 

    const starRatingChange = (value: number | undefined, temporary: boolean) => {
        if(value){
            setStarRatingValue(value);
            if(!temporary){                
                setRating(value);
                setValue('rating', value);
            }
        }else{
            setStarRatingValue(rating);
        }
    }

    return (

        <Flex 
            as={"form"}
            onSubmit={handleSubmit(formSubmitHandler)}
            backgroundColor={"purple.900"} 
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
                    color={"indigo"}
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
                        w={["100%", "100%", "fit-content"]}
                        backgroundColor={"white"}
                        color={"indigo"}
                        rounded={20}
                        isLoading={isSubmitting}
                        loadingText="Editing"  
                        type="submit"
                    >Edit</Button>
                    <Button
                        w={["100%", "100%", "fit-content"]}
                        backgroundColor={"white"}
                        color={"indigo"}
                        rounded={20}
                        onClick={() => onFinishEdit()}
                    >Cancel</Button>
                </Flex>
            
        </Flex>


        // <form  onSubmit={handleSubmit(formSubmitHandler)}>
        //     <FormControl isInvalid={errors.root && errors.root.message != ""}> 
        //     <Flex flexDirection={"column"} gap={5}>
        //         <FormControl isInvalid={errors.comment && errors.comment.message != ""}> 
        //             <Textarea
        //                 {...register('comment')}
        //                 backgroundColor={"white"}
        //                 placeholder='Add comment'
        //                 required
        //             />
        //             <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
        //         </FormControl>
        //         <FormControl isInvalid={errors.rating && errors.rating.message != ""}> 
        //             <StarRating
        //                 value={starRatingValue}
        //                 onChange={starRatingChange}
        //                 label="Rating:"
        //             />
        //             <FormErrorMessage>{errors.rating?.message}</FormErrorMessage>
        //         </FormControl>
        //             <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
        //             <Button width={["100%","100%","fit-content"]} isLoading={isSubmitting} loadingText="Submitting" rounded={20} type="submit">Post</Button>
        //         </Flex>
        //     </FormControl>
        // </form>
    );
}