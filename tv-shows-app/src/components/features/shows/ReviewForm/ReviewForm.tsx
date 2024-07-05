import { IReview } from "@/typings/Review.type";
import { Button, Flex, FormControl, Input, Textarea } from "@chakra-ui/react";
import { FormEvent } from "react";

interface IReviewFormProps{
    addShowReview : (review: IReview) => void
}

export const ReviewForm = ({addShowReview }: IReviewFormProps) => { 
    const formSubmitHandler = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const commentInput = document.getElementById('comment-input') as HTMLInputElement;
        const ratingInput = document.getElementById('rating-input') as HTMLInputElement;

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

    return (
        <form  onSubmit={formSubmitHandler}>
            <FormControl> 
                <Flex flexDirection={"column"} gap={5}>
                    <Textarea id="comment-input" backgroundColor={"white"} placeholder='Add comment' required></Textarea>
                    <Input width={["100%","100%","200px"]} id="rating-input" backgroundColor={"white"} placeholder='Add rating' type="number" min={1} max={5} required></Input>
                    <Button width={["100%","100%","fit-content"]} type="submit">Post</Button>
                </Flex>
            </FormControl>
        </form>
    );
}