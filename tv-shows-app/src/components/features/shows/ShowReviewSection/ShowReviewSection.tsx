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
    
    useEffect(()=>{
        setReviews(loadReviewsFromLocalStorage);
    }, []);

    useEffect(()=>{
        updateRating(reviews.reduce((sum, r)=> r.rating + sum, 0)/reviews.length)
    }, [reviews])

    const saveReviewsToLocalStorage = (reviews:IReview[])=>{
        if(reviews.length != 0){
            localStorage.setItem('reviews', JSON.stringify(reviews));
        }else {
            localStorage.removeItem('reviews');
        }
    };

    const removeReview = (review:IReview) => {
        const newReviews = reviews.filter(r => r != review);    
        setReviews(newReviews); 
        saveReviewsToLocalStorage(newReviews);
    }

    const addReview = (review:IReview) => {
        const newReviews = [review, ...reviews];
        setReviews(newReviews);     
        saveReviewsToLocalStorage(newReviews);
    }

    return (
        <Flex flexDir={"column"} gap={10}>
            <ReviewForm addShowReview ={addReview}></ReviewForm>
            <ReviewList reviews={reviews} removeReview = {removeReview}></ReviewList>
        </Flex>
    );
}