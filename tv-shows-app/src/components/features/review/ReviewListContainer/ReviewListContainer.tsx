'use client';
import { IReview } from "@/typings/Review.type";
import { ReviewList } from "../ReviewList/ReviewList";
import { useEffect, useState } from "react";

export const ReviewListContainer = () =>{

    
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

    return (
        <ReviewList reviews={reviews} removeReview = {removeReview}></ReviewList>
    );
}