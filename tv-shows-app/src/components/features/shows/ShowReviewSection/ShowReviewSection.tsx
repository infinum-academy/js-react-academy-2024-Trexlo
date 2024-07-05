'use client';
import { IReview } from "@/typings/Review.type";
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { useEffect, useState } from "react";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Flex } from "@chakra-ui/react";

export const ShowReviewSection = () =>{

    
    var mockReviews: IReview[]=[
        {
            avatar: "https://fakeimg.pl/100x100?text=:)",
            comment: "Some comment",
            email: "email@email.com",
            rating: 3
        },
        {
            avatar: "https://fakeimg.pl/30x30?text=:)",
            comment: "Some comment 2 ",
            email: "email@email.com",
            rating: 1
        },
        {
            avatar: "https://fakeimg.pl/50x50?text=:)",
            comment: "Some comment 5",
            email: "email@email.com",
            rating: 5
        }
    ]
    
    const [reviews, setReviews] = useState(mockReviews);
    
    const removeReview = (review:IReview) => {
        const newReviews = reviews.filter(r => r != review);    
        setReviews(newReviews); 
    }

    const addReview = (review:IReview) => {
        setReviews([review, ...reviews]);     
    }

    return (
        <Flex flexDir={"column"}>
            <ReviewForm addReview={addReview}></ReviewForm>
            <ReviewList reviews={reviews} removeReview = {removeReview}></ReviewList>
        </Flex>
    );
}