'use client';
import { ShowDetails } from "@/components/features/shows/ShowDetails/ShowDetails";
import styles from "../page.module.css";
import { IShow } from "@/typings/Show.type";
import { Flex, Heading } from "@chakra-ui/react";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import { useCallback, useState } from "react";
import { SidebarNavigation } from "@/components/shared/SidebarNavigation/SidebarNavigation";
import { ShowCard } from "@/components/shared/shows/ShowCard/ShowCard";

import useSWR from 'swr';
import { getAllShows } from "@/fetchers/show";

export default function Home() {
  const { data, error, isLoading } = useSWR(`/shows/top-rated`, () => getAllShows());

	const shows = data?.shows || [] ;

	if (error) {
		return <div>Ups...something went wrong</div>;
	}

	if (isLoading || !data) {
		return <div>Loading....</div>;
	}
  return (
    <main className={styles.main}>
      <Flex flexDirection={[null,"column", "row"]}>
        <SidebarNavigation activeLink="/shows"></SidebarNavigation>
        <Flex 
          w={["100%", "100%", "100%"]} 
          gap={3} 
          flexDirection={"row"}
          flexWrap={"wrap"}
        >
          {
            shows.map((show, index) => 
              <ShowCard show={show} key={index}/>
            )
          }
        </Flex>
      </Flex>
    </main>

  );
}
