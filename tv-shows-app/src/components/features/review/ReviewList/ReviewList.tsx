import { IReview } from "@/typings/Review.type";
import { Flex } from "@chakra-ui/react";
import { ReviewItem } from "../ReviewItem/ReviewItem";

interface IReviewListProps{
    reviews: IReview[];
    removeReview: (review: IReview)=>void
}

export const ReviewList = ({reviews ,removeReview}: IReviewListProps) => {

    return (
        <Flex flexDirection={"column"} gap={3} marginBottom={3} color={"white"}>
            {reviews.map((review, index) => <ReviewItem key={index} review={review} removeReview={removeReview}></ReviewItem>)}
        </Flex>
    );
}