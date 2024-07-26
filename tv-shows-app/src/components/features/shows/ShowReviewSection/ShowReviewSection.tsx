'use client';
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { getReviews } from "@/fetchers/show";
import { apiPaths } from "@/app/data/api-paths";

interface IShowReviewSectionProps{
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

export const ShowReviewSection = ({showId}:IShowReviewSectionProps) =>{
    if(!showId) return loading();
    
    const { data, error, isLoading } = useSWR(apiPaths.showReviews(showId), getReviews);

	const shows = data?.reviews || [] ;
    
	if (error) {
		return <Text>An error occurred</Text>;
	}

	if (isLoading || !data) {
        return loading();
	}

    return (
        <Flex flexDir={"column"} gap={"61px"}>
            <ReviewForm showId={parseInt(showId)}></ReviewForm>
            <ReviewList reviews={shows}></ReviewList>
        </Flex>
    );
}