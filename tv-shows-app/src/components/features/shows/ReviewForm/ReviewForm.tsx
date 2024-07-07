import { IReview } from "@/typings/Review.type";
import { Button, Flex, FormControl, Input, Textarea } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { StarRating } from "../StarRating/StarRating";

interface IReviewFormProps{
    addShowReview : (review: IReview) => void
}

export const ReviewForm = ({addShowReview }: IReviewFormProps) => { 

    const [starRatingValue, setStarRatingValue] = useState(0);


    const resetForm = ()=>{
        commentInput.value = "";
        ratingInput.value = "";
        setStarRatingValue(0);
    }

    const formSubmitHandler = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const comment = commentInput.value.trim();
        const rating = ratingInput.value;

        if(!comment || !rating){
            return;
        }

        const newReview: IReview = {
            avatar: "https://fakeimg.pl/100x100/d4d4d4/000000?text=:-))))",
            email: "mail@mail.com",
            comment: comment,
            rating,
        };

        addShowReview (newReview);
        resetForm();
    } 

    const starRatingChange = (value: number | undefined, temporary: boolean) => {
        if(value){
            setStarRatingValue(value);
            if(!temporary){
                ratingInput.value = value.toString();
            }
        }else{
            setStarRatingValue(parseInt(ratingInput.value));
        }

    }

    return (
        <form  onSubmit={formSubmitHandler}>
            <FormControl> 
                <Flex flexDirection={"column"} gap={5}>
                    <Textarea
                        value={comment}
                        onChange={(event)=>{setComment(event.target.value)}}
                        backgroundColor={"white"}
                        placeholder='Add comment'
                        onChange={(event)=>{setComment(event.target.value)}}
                        required
                    />
                    <StarRating label="Rating:" onChange={starRatingChange} value={starRatingValue} ></StarRating>
                    <Button width={["100%","100%","fit-content"]} rounded={20} type="submit">Post</Button>
                </Flex>
            </FormControl>
        </form>
    );
}