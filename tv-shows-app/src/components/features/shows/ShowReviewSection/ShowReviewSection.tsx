'use client';
import { IReview } from "@/typings/Review.type";
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { useEffect, useState } from "react";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Flex } from "@chakra-ui/react";

interface IShowReviewSectionProps{
    updateRating: (rating:number) => void;
}

export const ShowReviewSection = ({updateRating}:IShowReviewSectionProps) =>{
    const [reviews, setReviews] = useState([] as IReview[]);

    const loadReviewsFromLocalStorage = () => {
        const reviewsString = localStorage.getItem('reviews');
        if(!reviewsString){
            return [];
        }
        return JSON.parse(reviewsString) as IReview[];
    }

    const calculateAverageReviews = (reviews: IReview[]) => {
        return reviews.reduce((sum, r)=> r.rating + sum, 0)/reviews.length
    }

    useEffect(()=>{
        const loadedReviews = loadReviewsFromLocalStorage();
        setReviews(loadedReviews);
        updateRating(calculateAverageReviews(loadedReviews));
    }, [updateRating]);

    const saveReviewsToLocalStorage = (reviews:IReview[])=>{
        if(reviews.length != 0){
            localStorage.setItem('reviews', JSON.stringify(reviews));
        }else {
            localStorage.removeItem('reviews');
        }
    };

    const handleReviews = (review: IReview, action: 'add' | 'remove') => {
        let newReviews:IReview[] = [];
        
        if(action == 'add'){
            newReviews = [review, ...reviews];
        }
        if(action == 'remove'){
            newReviews = reviews.filter(r => r != review);    
        }

        setReviews(newReviews);     
        updateRating(calculateAverageReviews(newReviews));
        saveReviewsToLocalStorage(newReviews);
    }

    return (
        <Flex flexDir={"column"} gap={10}>
            <ReviewForm addShowReview={handleReviews}></ReviewForm>
            <ReviewList reviews={reviews} removeReview={handleReviews}></ReviewList>
        </Flex>
    );
}