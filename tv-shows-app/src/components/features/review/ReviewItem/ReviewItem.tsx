import { IReview } from "@/typings/Review.type";
import { Avatar, Button, Flex, Image, Menu, MenuButton, MenuDivider, MenuList, Text } from "@chakra-ui/react";
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
                gap={3} 
                alignItems={"center"} 
                padding={5}
            >
                <Flex 
                    height={"fit-content"} 
                    alignItems={["start","start","center"]} 
                    gap={3}
                    flexDirection={["column","column","row"]} 
                    width={"100%"}
                >
                    <Flex 
                        minW={"350px"}
                        h={"100%"}
                        alignItems={"center"} 
                        flexDirection={["row"]}
                        gap={3}
                    >
                        <Avatar 
                            objectFit={"cover"} 
                            src={review.user.image_url || "https://fakeimg.pl/100x100?text=:)"}
                        />
                        <Flex flexDirection={"column"}>
                            <Text textStyle={"smallCaption.bold"} wordBreak={"break-all"}>{review.user.email}</Text>
                            <Flex alignItems={"center"} gap={2}>
                                <Text>{review.rating} / 5</Text>
                                <StarRating label={undefined} onChange={()=>{}} onBlur={()=>{}} value={review.rating} />
                            </Flex>
                        </Flex>
                    </Flex>
                    <Text flexGrow={1} >{review.comment}</Text>
                </Flex>
                {   (review.user.email == user?.uid)
                    &&
                    <Menu size={"sm"}>
                        <MenuButton w={"24px"} h={"24px"}>
                            <Image src="/images/more.svg"/>
                        </MenuButton>
                        <MenuList rounded={"cardRadius"} >
                            <Button
                                onClick={() => setIsEditing(true)}
                            >Edit</Button>
                            <MenuDivider width={"100%"}/>
                            <DeleteReviewItemButton reviewId={review.id} showId={review.show_id.toString()} />
                        </MenuList>
                    </Menu>
                }
            </Flex>
        }
        </>
    );
}