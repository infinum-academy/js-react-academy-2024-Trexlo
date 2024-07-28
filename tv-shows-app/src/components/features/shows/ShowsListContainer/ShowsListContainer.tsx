'use client';
import { Card, Flex, SimpleGrid, Skeleton, Spinner, Text } from "@chakra-ui/react";
import useSWR from 'swr';
import { ShowsList } from "@/components/shared/shows/ShowsList/ShowsList";
import { getShows } from "@/fetchers/show";
import { ShowCard } from "@/components/shared/shows/ShowCard/ShowCard";

interface IShowsListContainerProps{
  url: string;
}

export const ShowsListContainer = ({url}: IShowsListContainerProps) => {
  const { data, error, isLoading } = useSWR(url, getShows);

	const shows = data?.shows || [] ;

	if (error && error.message != "Not logged in") {
		return <Text color={"white"}>An error occurred</Text>;
	}

	if (isLoading || !data) {
		return (
      <SimpleGrid padding={"31px"} minChildWidth={['100%','100%','225px']} width={"100%"} spacing={"31px"} height={"100%"}>
        {      
          [...Array(20)].map((val, index) => {
            return  <Skeleton key={index} rounded={"cardRadius"}>
                      <Card variant={"smallCard"}></Card>
                    </Skeleton>
          })
        }
      </SimpleGrid>
    );
	}

  return (
    <ShowsList shows={shows}/>
  );
}