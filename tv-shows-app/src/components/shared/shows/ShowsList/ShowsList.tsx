import { IShow } from "@/typings/Show.type"
import { IconButton, SimpleGrid } from "@chakra-ui/react";
import { ShowCard } from "../ShowCard/ShowCard";
import { ArrowUpIcon } from "@chakra-ui/icons";

interface IShowsListProps {
    shows: IShow[];
}

export const ShowsList = ({shows}: IShowsListProps) => {

    return(
        <>
            <SimpleGrid padding={"31px"} minChildWidth={['100%','100%','225px']} width={"100%"} spacing={"31px"} height={"100%"}>
                {
                    shows.map((show, index) => 
                        <ShowCard key={index} show={show}></ShowCard>
                )
            }
            </SimpleGrid>
        </>
    )
}