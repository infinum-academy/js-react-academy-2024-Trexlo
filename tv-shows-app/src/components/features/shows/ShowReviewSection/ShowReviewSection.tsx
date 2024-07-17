'use client';
import { IReview, IReviewFormInputs } from "@/typings/Review.type";
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { useEffect, useState } from "react";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { getReviews } from "@/fetchers/show";
import { apiPaths } from "@/app/data/api-paths";
import useSWRMutation from "swr/mutation";

interface IShowReviewSectionProps{
    updateRating: (rating:number) => void;
    showId: string;
}

function loading(){
    return (
        <Flex justifyItems={"center"} width={"100%"}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            margin={"auto"}
          />
        </Flex>
      );
}

export const ShowReviewSection = ({updateRating, showId}:IShowReviewSectionProps) =>{
    // const [reviews, setReviews] = useState([] as IReview[]);

    // const loadReviewsFromLocalStorage = () => {
    //     const reviewsString = localStorage.getItem('reviews');
    //     if(!reviewsString){
    //         return [];
    //     }
    //     return JSON.parse(reviewsString) as IReview[];
    // }

    // const calculateAverageReviews = (reviews: IReview[]) => {
    //     return reviews.reduce((sum, r)=> r.rating + sum, 0)/reviews.length
    // }

    // useEffect(()=>{
    //     const loadedReviews = loadReviewsFromLocalStorage();
    //     setReviews(loadedReviews);
    //     updateRating(calculateAverageReviews(loadedReviews));
    // }, [updateRating]);

    // const saveReviewsToLocalStorage = (reviews:IReview[])=>{
    //     if(reviews.length != 0){
    //         localStorage.setItem('reviews', JSON.stringify(reviews));
    //     }else {
    //         localStorage.removeItem('reviews');
    //     }
    // };

    // const handleReviews = (review: IReviewFormInputs, action: 'add' | 'remove') => {
    //     let newReviews:IReview[] = [];
        
    //     if(action == 'add'){
    //         newReviews = [review, ...reviews];
    //     }
    //     if(action == 'remove'){
    //         newReviews = reviews.filter(r => r != review);    
    //     }

    //     setReviews(newReviews);     
    //     updateRating(calculateAverageReviews(newReviews));
    //     saveReviewsToLocalStorage(newReviews);
    // }

	
    // const handleReviews = (review: IReviewFormInputs, action: 'add' | 'remove') => {
        
    //     if(action == 'add'){
    //         newReviews = [review, ...reviews];
    //     }
    //     if(action == 'remove'){
    //         newReviews = reviews.filter(r => r != review);    
    //     }
    // }

    if(!showId) return loading();
    const { data, error, isLoading } = useSWR(apiPaths.showReviews(showId), getReviews);

	const shows = data?.reviews || [] ;
    console.log(data);
    
	if (error) {
		return <Text>An error occurred</Text>;
	}

	if (isLoading || !data) {
        return loading();
	}
    return (
        <Flex flexDir={"column"} gap={10}>
            <ReviewForm addShowReview={()=>{}} showId={parseInt(showId)}></ReviewForm>
            <ReviewList reviews={data.reviews} removeReview={()=>{}}></ReviewList>
        </Flex>
    );
}