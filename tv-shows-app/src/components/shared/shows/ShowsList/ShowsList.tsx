import { IShow } from "@/typings/Show.type"
import { Flex } from "@chakra-ui/react";
import { ShowCard } from "../ShowCard/ShowCard";

interface IShowsListProps {
    shows: IShow[];
}

export const ShowsList = ({shows}: IShowsListProps) => {

    return(
        <Flex>
            {
                shows.map((show, index) => 
                    <ShowCard key={index} show={show}></ShowCard>
                )
            }
        </Flex>
            
    )
}