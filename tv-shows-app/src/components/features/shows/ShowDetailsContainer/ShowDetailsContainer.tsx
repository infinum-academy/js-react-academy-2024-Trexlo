'use client';
import { ShowDetails } from "@/components/features/shows/ShowDetails/ShowDetails";
import { IShow } from "@/typings/Show.type";
import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import useSWR from 'swr';
import { getShow } from "@/fetchers/show";
import { useParams } from "next/navigation";
import { apiPaths } from "@/app/data/api-paths";
import { ReviewPaginationContextProvider } from "../ShowReviewSection/components/ReviewPaginationContext";

export const ShowDetailsContainer = () => {
    const params = useParams();
    const { data, error, isLoading } = useSWR(apiPaths.show(params.id as string), getShow);

    const show = data?.show ?? {} as IShow;

    if (error) {
        return <Text>An error occurred</Text>;
    }
  
    return (
        <Flex 
            w={["95%", "95%", "100%"]}
            padding={["0", "0", "31px"]} 
            margin={"auto"}
            ml={["auto", "auto", "auto", "125px"]}
            gap={3} 
            flexDirection={"column"}
            >
            <Skeleton isLoaded={!isLoading}>
                <ShowDetails show = {show}></ShowDetails>
            </Skeleton>
            <Flex marginTop={"86px"} direction={"row"}>
                <Text
                    textStyle={"title.regular"}
                    width={"175px"}
                    color={"white"} 
                >Reviews</Text>
                <Skeleton isLoaded={!isLoading} flexGrow={1}>
                    <ReviewPaginationContextProvider showId={show.id}>
                        <ShowReviewSection showId={show.id}></ShowReviewSection>
                    </ReviewPaginationContextProvider>
                </Skeleton>     
            </Flex>
        </Flex>
  );
}
