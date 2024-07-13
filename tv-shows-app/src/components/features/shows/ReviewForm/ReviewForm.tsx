import { IReview } from "@/typings/Review.type";
import { Button, Flex, FormControl, FormErrorMessage, Input, Textarea } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import { useForm } from "react-hook-form";

interface IReviewFormProps{
    addShowReview : (review: IReview, action: 'add' | 'remove') => void
}
export interface IReviewFormInputs{
    comment: string;
    rating: number;
}

export const ReviewForm = ({addShowReview}: IReviewFormProps) => { 
    const [starRatingValue, setStarRatingValue] = useState(0);
    const [rating, setRating] = useState(0);
    const {register, handleSubmit, reset,
        formState:{
            isSubmitting
        }
    } = useForm<IReviewFormInputs>();
    const [errorMessage, setErrorMessage] = useState("");

    const resetForm = ()=>{
        setStarRatingValue(0);
        reset();
    }

    const formSubmitHandler = (data: IReviewFormInputs) => {
        setErrorMessage(
            ((!data.comment)?"Comment cannot be empty. ":"") +
            ((!data.rating)?"Rating cannot be empty. ":"")
        );

        if(!data.comment || !data.rating){
            return;
        }

        const newReview: IReview = {
            avatar: "https://fakeimg.pl/100x100/d4d4d4/000000?text=:-))))",
            email: "mail@mail.com",
            comment: data.comment,
            rating: data.rating,
        };

        addShowReview (newReview, 'add');
        resetForm();
    } 

    const starRatingChange = (value: number | undefined, temporary: boolean) => {
        if(value){
            setStarRatingValue(value);
            if(!temporary){
                setRating(value);
            }
        }else{
            setStarRatingValue(rating);
        }
    }

    return (
        <form  onSubmit={handleSubmit(formSubmitHandler)}>
            <FormControl isInvalid={errorMessage != ""}> 
                <Flex flexDirection={"column"} gap={5}>
                    <Textarea
                        {...register('comment')}
                        backgroundColor={"white"}
                        placeholder='Add comment'
                        required
                    />
                    <StarRating
                        register={register}
                        value={starRatingValue}
                        onChange={starRatingChange}
                        label="Rating:"
                    />
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                    <Button width={["100%","100%","fit-content"]} isLoading={isSubmitting} loadingText="Submitting" rounded={20} type="submit">Post</Button>
                </Flex>
            </FormControl>
        </form>
    );
}