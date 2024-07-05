import { IShow } from "@/typings/Show.type";
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import { Flex, Heading, Image, Text } from "@chakra-ui/react";


interface IShowDetailsProps{
    show:IShow;
}

export const ShowDetails = ({show}: IShowDetailsProps) =>{
    return (
        <Card overflow={"hidden"} rounded={20} backgroundColor={"white"} color={"indigo"}>
            <Image alt="Show image" src={show.imageUrl || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
            <CardBody>
                <Stack mt='6' spacing='4'>
                    <Heading size={"lg"}>{show.title}</Heading>
                    <Text>{show.description}</Text>
                    <Text>{(show.averageRating && (show.averageRating.toFixed(1) + " / 5")) || "No ratings"}</Text>
                </Stack>
            </CardBody>
        </Card>
    );
}