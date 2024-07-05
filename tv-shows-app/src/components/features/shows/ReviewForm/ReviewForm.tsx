import { IReview } from "@/typings/Review.type";
import { Button, Flex, FormControl, Input, Textarea } from "@chakra-ui/react";
import { FormEvent } from "react";
import { StarRating } from "../StarRating/StarRating";

interface IReviewFormProps{
    addShowReview : (review: IReview) => void
}

export const ReviewForm = ({addShowReview }: IReviewFormProps) => { 
    const commentInput = document.getElementById('comment-input') as HTMLInputElement;
    const ratingInput = document.getElementById('rating-input') as HTMLInputElement;
    const formSubmitHandler = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const comment = commentInput.value.trim();
        const rating = ratingInput.value;
        if(!comment || !rating){
            return;
        }
        const newReview: IReview = {
            avatar: "https://fakeimg.pl/30x30?text=:)",
            email: "mail@mail.com",
            comment: comment,
            rating: parseInt(rating),
        };
        addShowReview (newReview);
    } 

    const starRatingChange = (value: number) => {
        ratingInput.value = value.toString();
    }

    return (
        <form  onSubmit={formSubmitHandler}>
            <FormControl> 
                <Flex flexDirection={"column"} gap={5}>
                    <Textarea id="comment-input" backgroundColor={"white"} placeholder='Add comment' required></Textarea>
                    <Input hidden width={["100%","100%","200px"]} id="rating-input" backgroundColor={"white"} placeholder='Add rating' type="number" min={1} max={5} required></Input>
                    <StarRating label="Rating:" onChange={starRatingChange} value={undefined} ></StarRating>
                    <Button width={["100%","100%","fit-content"]} type="submit">Post</Button>
                </Flex>
            </FormControl>
        </form>
    );
}