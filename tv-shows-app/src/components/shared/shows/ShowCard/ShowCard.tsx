import { IShow } from "@/typings/Show.type";
import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import NextLink from 'next/link';
interface IShowCardProps {
    show: IShow
}

export const ShowCard = ({show}: IShowCardProps) => {

    return(
        <Card as={NextLink} href={`/shows/${show.id}`} width={300} overflow={"hidden"} rounded={20} backgroundColor={"white"} color={"indigo"}>
            <Image alt="Show image" src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
            <CardBody>
                <Stack mt='0' spacing='2'>
                    <Heading size={"md"}>{show.title}</Heading>
                    <Flex gap={1} alignItems={"center"}><StarIcon color={"indigo"}/><Text>{(show.average_rating && (show.average_rating.toFixed(1) + " / 5")) || "No ratings"}</Text></Flex>
                </Stack>
            </CardBody>
        </Card>
    )
}