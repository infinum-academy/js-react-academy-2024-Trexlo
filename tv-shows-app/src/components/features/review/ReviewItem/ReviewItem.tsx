import { IReview } from "@/typings/Review.type";
import { Button, Flex, Image, Text } from "@chakra-ui/react";

interface IReviewProps {
    review: IReview;
    removeReview: (review: IReview)=>void;
}



export const ReviewItem = ({review, removeReview}: IReviewProps) => {

    const onClickHandler = () => {
        removeReview(review);
    }

    return (
        <Flex backgroundColor={"purple.900"} rounded={20} flexDirection={"column"} gap={3} padding={5}>
            <Flex height={10} alignItems={"center"} gap={3}>
                <Image rounded={20} height={"100%"} objectFit={"cover"} alt="user image" src={review.avatar || "https://fakeimg.pl/100x100?text=:)"}></Image>
                <Text>{review.email}</Text>
            </Flex>
            <Text>{review.comment}</Text>
            <Text>{review.rating} / 5</Text>
            <Button w={["100%", "100%", "fit-content"]} backgroundColor={"white"} color={"indigo"} onClick={onClickHandler}>Delete</Button>
        </Flex>
    );
}