'use client';
import { Flex, Spinner, Text } from "@chakra-ui/react";
import useSWR from 'swr';
import { ShowsList } from "@/components/shared/shows/ShowsList/ShowsList";
import { getShows } from "@/fetchers/show";
import { apiPaths } from "@/app/data/api-paths";

export const ShowsAllListContainer = () => {
  const { data, error, isLoading } = useSWR(apiPaths.allShows, getShows);

	const shows = data?.shows || [] ;

	if (error) {
		return <Text>An error occurred</Text>;
	}

	if (isLoading || !data) {
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

  return (
        <ShowsList shows={shows}/>
  );
}