'use client';
import { ShowDetails } from "@/components/features/shows/ShowDetails/ShowDetails";
import styles from "./page.module.css";
import { IShow } from "@/typings/Show.type";
import { Flex, Heading } from "@chakra-ui/react";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import { useCallback, useState } from "react";



export default function Home() {
  const mockShowDetails: IShow = {
    average_rating: undefined,
    description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    image_url: "https://e1.pxfuel.com/desktop-wallpaper/31/210/desktop-wallpaper-8-breaking-bad-heisenberg.jpg",
    title: "Breaking Bad",
    id:"0",
    no_of_reviews:0
  }
  
  const [showDetails, setShowDetails] = useState(mockShowDetails);

  const updateRating = useCallback((rating:number) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      averageRating: rating,
    }));
  }, []); 

  return (
    <main className={styles.main}>
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
        <ShowDetails show = {showDetails}></ShowDetails>
        <Heading 
          size={"md"} 
          color={"white"} 
          marginTop={3}
        >Reviews</Heading>
        <ShowReviewSection updateRating={updateRating}></ShowReviewSection>
      </Flex>
    </main>
  );
}
