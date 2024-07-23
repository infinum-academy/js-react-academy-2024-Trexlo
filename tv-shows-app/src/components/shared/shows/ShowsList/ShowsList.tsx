import { IShow } from "@/typings/Show.type"
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ShowCard } from "../ShowCard/ShowCard";

interface IShowsListProps {
    shows: IShow[];
}

export const ShowsList = ({shows}: IShowsListProps) => {

    return(
        <SimpleGrid padding={3} minChildWidth={['100%','100%','225px']} width={"100%"} spacing={3}>
            {
                shows.map((show, index) => 
                    <ShowCard key={index} show={show}></ShowCard>
                )
            }
        </SimpleGrid>
    )
}