'use client';
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { ReviewPaginationContext } from "./components/ReviewPaginationContext";

interface IShowReviewSectionProps{
    showId: string;
}

function loading(){
    return (
      <Flex
        justifyItems={"center"}
        flexDirection={"column"}
        width={"100%"}
        gap={"24px"}
      >
        {[...Array(5)].map((val, index) => (
          <Skeleton
            key={index}
            rounded={20}
            gap={3}
            w={"100%"}
            height={"100px"}
            alignItems={"center"}
            padding={["24px", "24px", "30px 40px"]}
          ></Skeleton>
        ))}
      </Flex>
    );
}

export const ShowReviewSection = ({showId}:IShowReviewSectionProps) =>{
    if(!showId) return loading();
	const { currentPage, reviews, setCurrentPage, error, isLoading, pagination } = useContext(ReviewPaginationContext);
    
	if (error) {
		return <Text>An error occurred</Text>;
	}


    return (
        <Flex flexDir={"column"} gap={"61px"}>
            <ReviewForm showId={parseInt(showId)}></ReviewForm>
            {
                (isLoading || !reviews || !pagination) && loading()
                
            }
            {
                !(isLoading || !reviews || !pagination) && <ReviewList reviews={reviews}></ReviewList>
            }
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