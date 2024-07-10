'use client';
import styles from "../../../../app/page.module.css";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { SidebarNavigation } from "@/components/shared/SidebarNavigation/SidebarNavigation";
import useSWR from 'swr';
import { ShowsList } from "@/components/shared/shows/ShowsList/ShowsList";
import { getAllShows } from "@/fetchers/show";

export const ShowsAllListContainer = () => {
  const { data, error, isLoading } = useSWR('/shows', () => getAllShows());

	const shows = data?.shows || [] ;

	if (error) {
		return <Text>An error occurred</Text>;
	}

	if (isLoading || !data) {
		return (
      <main className={styles.main}>
        <Flex flexDirection={["column","column", "row"]}>
          <SidebarNavigation activeLink='/shows'></SidebarNavigation>
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
        <SidebarNavigation activeLink="/shows"></SidebarNavigation>
        <ShowsList shows={shows}/>
      </Flex>
    </main>

  );
}