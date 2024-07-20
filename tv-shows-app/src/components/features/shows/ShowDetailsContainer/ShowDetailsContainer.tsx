'use client';
import { ShowDetails } from "@/components/features/shows/ShowDetails/ShowDetails";
import { IShow } from "@/typings/Show.type";
import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import { useCallback, useState } from "react";
import useSWR from 'swr';
import { getShow } from "@/fetchers/show";
import { useParams } from "next/navigation";

export const ShowDetailsContainer = () => {
    const params = useParams();
    const { data, error, isLoading } = useSWR(`/shows/${params.id}`, () => getShow(params.id as string));

    const show = data?.show ?? {} as IShow;
    const [showDetails, setShowDetails] = useState(show);
    
    const updateRating = useCallback((rating:number) => {
        setShowDetails((prevDetails) => ({
        ...prevDetails,
        averageRating: rating,
        }));
    }, []); 

    if (error) {
        return <Text>An error occurred</Text>;
    }
  
    return (
        <Flex 
            w={["100%", "100%", "65vw"]} 
            gap={3} 
            flexDirection={"column"}
            >
            <Skeleton isLoaded={!isLoading}>
                <ShowDetails show = {show}></ShowDetails>
            </Skeleton>
            <Heading 
                size={"md"} 
                color={"white"} 
                marginTop={3}
            >Reviews</Heading>
            <Skeleton isLoaded={!isLoading}>
                <ShowReviewSection updateRating={updateRating}></ShowReviewSection>
            </Skeleton>
        </Flex>
  );
}
