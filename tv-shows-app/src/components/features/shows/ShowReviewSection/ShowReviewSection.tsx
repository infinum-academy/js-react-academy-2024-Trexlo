'use client';
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Button, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { getReviews } from "@/fetchers/show";
import { apiPaths } from "@/app/data/api-paths";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { IPagination } from "@/typings/Review.type";
import { ReviewPaginationContext } from "./components/ReviewPaginationContext";

const numberOfReviews = 5;

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
	const { currentPage, reviews, setCurrentPage, error, isLoading, pagination } = useContext(ReviewPaginationContext);
    
	if (error) {
		return <Text>An error occurred</Text>;
	}

	if (isLoading || !reviews || !pagination) {
        return loading();
	}

    return (
        <Flex flexDir={"column"} gap={"61px"}>
            <ReviewForm showId={parseInt(showId)}></ReviewForm>
            <ReviewList reviews={reviews}></ReviewList>
            <Flex 
                alignItems={"center"} 
                justifyContent={"center"} 
                color={"white"} 
                flexDir={"row"}
                gap={"6px"}
                mb={"30px"}
                mt={"-36px"}
            >
                {pagination.page > 1 && 
                    <ChevronLeftIcon 
                        w={"24px"} 
                        h={"24px"} 
                        aria-label="previous page" 
                        onClick={()=>setCurrentPage(currentPage-1)}
                    />
                }
                <Text>{pagination.page} of {pagination.pages}</Text>
                {pagination.page < pagination.pages &&
                    <ChevronRightIcon 
                        w={"24px"} 
                        h={"24px"} 
                        aria-label="next page" 
                        onClick={()=>setCurrentPage(currentPage+1)}
                    />}
            </Flex>
        </Flex>
    );
}