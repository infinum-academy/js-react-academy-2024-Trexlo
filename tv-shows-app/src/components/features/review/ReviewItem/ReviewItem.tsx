import { IReview } from "@/typings/Review.type";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { StarRating } from "../../shows/StarRating/StarRating";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { apiPaths } from "@/app/data/api-paths";
import { deleteReview } from "@/fetchers/show";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
interface IReviewProps {
    review: IReview;
    removeReview: (review: IReview, action:'add' | 'remove') => void;
}

export const ReviewItem = ({review, removeReview}: IReviewProps) => {

    const [user, setUser] = useUser();

    const { trigger } = useSWRMutation(apiPaths.review(review.id), deleteReview,
        {
            onSuccess: () => {
                mutate(apiPaths.showReviews(review.show_id.toString()));
                mutate(apiPaths.show(review.show_id.toString()));
            }
        }
    );

    const onDelete = async () => {
       await trigger();
    }

    

    return (
            <Flex 
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
            <Text>{review.comment}</Text>
            <Text>{review.rating} / 5</Text>
            <StarRating label={undefined} onChange={()=>{}} value={review.rating}></StarRating>
            {(review.user.email == user?.uid)
                &&
                <Flex gap={3}>
                    <Button
                        w={["100%", "100%", "fit-content"]}
                        backgroundColor={"white"}
                        color={"indigo"}
                        rounded={20}
                        onClick={() => onDelete()}
                    >Remove</Button>
                </Flex>
            }
        </Flex>
    );
}