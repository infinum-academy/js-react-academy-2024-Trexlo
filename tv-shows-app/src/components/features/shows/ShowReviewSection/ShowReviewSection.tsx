'use client';
import { IReview } from "@/typings/Review.type";
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { useCallback, useEffect, useState } from "react";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Flex } from "@chakra-ui/react";

interface IShowReviewSectionProps{
    updateRating: (rating:number) => void;
}
    
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

export const ShowReviewSection = ({updateRating}:IShowReviewSectionProps) =>{

    const [reviews, setReviews] = useState(mockReviews);

    const loadReviewsFromLocalStorage = ():IReview[] => {
        const reviewsString = localStorage.getItem('reviews');
        if(!reviewsString){
            return [];
        }
        return JSON.parse(reviewsString) as IReview[];
    }

    useEffect(()=>{
        setReviews(loadReviewsFromLocalStorage);
    }, []);

    const saveReviewsToLocalStorage = (reviews:IReview[])=>{
        localStorage.setItem('reviews', JSON.stringify(reviews));
    };

    const removeReview = (review:IReview) => {
        const newReviews = reviews.filter(r => r != review);    
        setReviews(newReviews); 
        updateRating(reviews.reduce((sum, r)=> r.rating + sum, 0)/reviews.length);
        saveReviewsToLocalStorage(newReviews);
    }

    const addReview = (review:IReview) => {
        const newReviews = [review, ...reviews];
        setReviews(newReviews);     
        updateRating(reviews.reduce((sum, r)=> r.rating + sum, 0)/reviews.length);
        saveReviewsToLocalStorage(newReviews);
    }

    return (
        <Flex flexDir={"column"} gap={10}>
            <ReviewForm addReview={addReview}></ReviewForm>
            <ReviewList reviews={reviews} removeReview = {removeReview}></ReviewList>
        </Flex>
    );
}