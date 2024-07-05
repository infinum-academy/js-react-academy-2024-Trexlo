import { IReview } from "@/typings/Review.type";
import { Flex, Image, Text } from "@chakra-ui/react";

interface IReviewProps {
    review: IReview
}

export const ReviewItem = ({review}: IReviewProps) => {
    return (
        <Flex backgroundColor={"purple.900"} rounded={20} flexDirection={"column"} gap={3} padding={5}>
            <Flex height={10} alignItems={"center"} gap={3}>
                <Image rounded={20} height={"100%"} objectFit={"cover"} alt="user image" src={review.avatar || "https://fakeimg.pl/100x100?text=:)"}></Image>
                <Text>{review.email}</Text>
            </Flex>
            <Text>{review.comment}</Text>
            <Text>{review.rating} / 5</Text>
        </Flex>
    );
}