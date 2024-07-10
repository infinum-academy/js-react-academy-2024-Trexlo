import { IShow } from "@/typings/Show.type"
import { Flex } from "@chakra-ui/react";
import { ShowCard } from "../ShowCard/ShowCard";

interface IShowsListProps {
    shows: IShow[];
}

export const ShowsList = ({shows}: IShowsListProps) => {

    return(
        <Flex          
            w={["100%", "100%", "100%"]} 
            gap={3} 
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent={["center","center","left"]}
            padding={3}
        >
            {
                shows.map((show, index) => 
                    <ShowCard key={index} show={show}></ShowCard>
                )
            }
        </Flex>
            
    )
}