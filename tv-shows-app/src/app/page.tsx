import { ShowDetails } from "@/components/features/shows/ShowDetails/ShowDetails";
import styles from "./page.module.css";
import { IShow } from "@/typings/Show.type";
import { Flex, Heading } from "@chakra-ui/react";

export default function Home() {
  const mockShowDetails: IShow = {
    averageRating: undefined,
    description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    imageUrl: "https://e1.pxfuel.com/desktop-wallpaper/31/210/desktop-wallpaper-8-breaking-bad-heisenberg.jpg",
    title: "Breaking Bad"
  }
  return (
    <main className={styles.main}>
      <Flex w={["100%", "100%", "65%"]} gap={3} flexDirection={"column"}>
        <Heading color={"white"} marginTop={3}>TV shows APP</Heading>
        <ShowDetails {...mockShowDetails}></ShowDetails>
      </Flex>
    </main>
  );
}
