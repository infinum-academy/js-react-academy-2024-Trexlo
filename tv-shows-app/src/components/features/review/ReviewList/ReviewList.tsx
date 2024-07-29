import { IReview } from "@/typings/Review.type";
import { Flex } from "@chakra-ui/react";
import { ReviewItem } from "../ReviewItem/ReviewItem";

interface IReviewListProps{
    reviews: IReview[];
}

export const ReviewList = ({reviews}: IReviewListProps) => {
    return (
        <Flex flexDirection={"column"} gap={"24px"} color={"white"}>
            {reviews.map((review, index) =>
                <ReviewItem
                    key={index}
                    review={review}
                />
            )}
        </Flex>
    );
}