'use client';
import { ShowDetails } from "@/components/features/shows/ShowDetails/ShowDetails";
import styles from "../../page.module.css";
import { IShow } from "@/typings/Show.type";
import { Flex, Heading } from "@chakra-ui/react";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import { useCallback, useState } from "react";
import useSWR from 'swr';
import { getShow } from "@/fetchers/show";
import { useParams } from "next/navigation";
import { SidebarNavigation } from "@/components/shared/SidebarNavigation/SidebarNavigation";

export default function Home() {
  const params = useParams();
  const { data, error, isLoading } = useSWR(`/shows/${params.id}`, () => getShow(params.id as string));

	const show = data || {} as IShow;
  const [showDetails, setShowDetails] = useState(show);

  const updateRating = useCallback((rating:number) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      averageRating: rating,
    }));
  }, []); 

	if (error) {
		return <div>Ups...something went wrong</div>;
	}

	if (isLoading || !data || data == {} as IShow) {
		return <div>Loading....</div>;
	}


  return (
    <main className={styles.main}>
      <Flex flexDirection={["column","column", "row"]}>
      <SidebarNavigation activeLink="/shows"></SidebarNavigation>
      <Flex 
        w={["100%", "100%", "65%"]} 
        gap={3} 
        flexDirection={"column"}
      >
        <Heading 
          size={"md"} 
          color={"white"} 
          marginTop={3}
        >TV shows APP</Heading>
        <ShowDetails show = {show}></ShowDetails>
        <Heading 
          size={"md"} 
          color={"white"} 
          marginTop={3}
        >Reviews</Heading>
        <ShowReviewSection updateRating={updateRating}></ShowReviewSection>
      </Flex>
      </Flex>
    </main>

  );
}
