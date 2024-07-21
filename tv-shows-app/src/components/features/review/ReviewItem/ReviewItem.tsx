import { IReview } from "@/typings/Review.type";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { StarRating } from "../../shows/StarRating/StarRating";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { EditReviewForm } from "../../shows/EditReviewForm/EditReviewForm";
import { DeleteReviewItemButton } from "../DeleteReviewItemButton/DeleteReviewItemButton";

interface IReviewProps {
    review: IReview;
}

export const ReviewItem = ({review}: IReviewProps) => {
    const [user] = useUser();
    const [isEditing, setIsEditing] = useState<Boolean>(false);

    return (
        <>
        {
        isEditing && 
        <EditReviewForm onFinishEdit={()=>setIsEditing(false)} review={review} />
        }
        {
            !isEditing && 
            <Flex 
                backgroundColor={"purple"} 
                rounded={20} 
                flexDirection={"column"} 
                gap={3} 
                padding={5}
            >
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
                    />
                    <Text>{review.user.email}</Text>
                </Flex>
                <Text>{review.comment}</Text>
                <Text>{review.rating} / 5</Text>
                <StarRating label={undefined} onChange={()=>{}} value={review.rating} />
                {(review.user.email == user?.uid)
                    &&
                    <Flex gap={3}>
                        <DeleteReviewItemButton reviewId={review.id} showId={review.show_id.toString()} />
                        <Button
                            w={["100%", "100%", "fit-content"]}
                            backgroundColor={"white"}
                            color={"purple"}
                            rounded={20}
                            onClick={() => setIsEditing(true)}
                        >Edit</Button>
                </Flex>
            }
            </Flex>
        }
        </>
    );
}