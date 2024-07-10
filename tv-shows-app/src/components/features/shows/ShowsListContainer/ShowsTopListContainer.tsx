'use client';
import styles from "../../../../app/page.module.css";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { SidebarNavigation } from "@/components/shared/SidebarNavigation/SidebarNavigation";
import useSWR from 'swr';
import { ShowsList } from "@/components/shared/shows/ShowsList/ShowsList";
import { getTopShows } from "@/fetchers/show";

export const ShowsTopListContainer = () => {
  const { data, error, isLoading } = useSWR('/shows/top-rated', () => getTopShows());

	const shows = data?.shows || [] ;

	if (error) {
		return <Text>An error occurred</Text>;
	}

	if (isLoading || !data) {
		return (
      <main className={styles.main}>
        <Flex flexDirection={["column","column", "row"]}>
          <SidebarNavigation activeLink='/shows/top-rated'></SidebarNavigation>
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
        </Flex>
      </main>
    );
	}

  return (
    <main className={styles.main}>
      <Flex flexDirection={["column","column", "row"]}>
        <SidebarNavigation activeLink="/shows/top-rated"></SidebarNavigation>
        <ShowsList shows={shows}/>
      </Flex>
    </main>

  );
}