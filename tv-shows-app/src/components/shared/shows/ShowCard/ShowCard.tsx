import { IShow } from "@/typings/Show.type";
import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import NextLink from 'next/link';
interface IShowCardProps {
    show: IShow
}

export const ShowCard = ({show}: IShowCardProps) => {

    return(
        <Card as={NextLink} href={`/shows/${show.id}`} variant={{base: "smallCardMobile", sm:"smallCardMobile", md:"smallCard"}}>
            <CardHeader>
                <Image alt="Show image" height={"100%"} width={"100%"} objectFit={"cover"} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
            </CardHeader>
            <CardBody>
                <Text>{show.title}</Text>
                <Flex textStyle={"smallCaption.regular"} alignItems={"center"} gap={"4px"}>
                    <StarIcon/>
                    <Text>{(show.average_rating && (show.average_rating.toFixed(1) + " / 5")) || "No ratings"}</Text>
                </Flex>
             </CardBody>
        </Card>
    )
}