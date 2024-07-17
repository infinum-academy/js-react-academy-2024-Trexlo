'use client';
import { ShowDetails } from "@/components/features/shows/ShowDetails/ShowDetails";
import { IShow } from "@/typings/Show.type";
import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import useSWR from 'swr';
import { getShow } from "@/fetchers/show";
import { useParams } from "next/navigation";
import { apiPaths } from "@/app/data/api-paths";

export const ShowDetailsContainer = () => {
    const params = useParams();
    const { data, error, isLoading } = useSWR(apiPaths.show(params.id as string), getShow);

	const show = (data) ? data.show : {} as IShow;

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
                <ShowReviewSection showId={show.id}></ShowReviewSection>
            </Skeleton>
        </Flex>
  );
}
