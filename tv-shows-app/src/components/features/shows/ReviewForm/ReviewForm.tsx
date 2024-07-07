import { IReview } from "@/typings/Review.type";
import { Button, Flex, FormControl, FormErrorMessage, Input, Textarea } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { StarRating } from "../StarRating/StarRating";

interface IReviewFormProps{
    addShowReview : (review: IReview) => void
}

export const ReviewForm = ({addShowReview }: IReviewFormProps) => { 

    const [starRatingValue, setStarRatingValue] = useState(0);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const resetForm = ()=>{
        setComment("");
        setRating(0);
        setStarRatingValue(0);
    }

    const formSubmitHandler = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setErrorMessage(((!comment)?"Comment cannot be empty. ":"") + ((!rating)?"Rating cannot be empty. ":""));
        if(!comment || !rating){
            return;
        }

        const newReview: IReview = {
            avatar: "https://fakeimg.pl/100x100/d4d4d4/000000?text=:-))))",
            email: "mail@mail.com",
            comment,
            rating,
        };

        addShowReview (newReview);
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
        <form  onSubmit={formSubmitHandler}>
            <FormControl isInvalid={errorMessage != ""}> 
                <Flex flexDirection={"column"} gap={5}>
                    <Textarea
                        value={comment}
                        onChange={(event)=>{setComment(event.target.value)}}
                        backgroundColor={"white"}
                        placeholder='Add comment'
                        required
                    />
                    <StarRating
                        value={starRatingValue}
                        onChange={starRatingChange}
                        label="Rating:"
                    />
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                    <Button width={["100%","100%","fit-content"]} rounded={20} type="submit">Post</Button>
                </Flex>
            </FormControl>
        </form>
    );
}