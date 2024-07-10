import { IShow } from "@/typings/Show.type";
import { Card, CardBody, Stack } from '@chakra-ui/react'
import { Heading, Image, Text } from "@chakra-ui/react";


interface IShowDetailsProps{
    show:IShow;
}

export const ShowDetails = ({show}: IShowDetailsProps,) =>{
    return (
        <Card overflow={"hidden"} rounded={20} backgroundColor={"white"} color={"indigo"}>
            <Image alt="Show image" h={400} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
            <CardBody>
                <Stack mt='4' spacing='4'>
                    <Heading size={"md"}>{show.title}</Heading>
                    <Text>{show.description}</Text>
                    <Text>{(show.average_rating && (show.average_rating.toFixed(1) + " / 5")) || "No ratings"}</Text>
                </Stack>
            </CardBody>
        </Card>
    );
}