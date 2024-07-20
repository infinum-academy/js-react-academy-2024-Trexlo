import { IShow } from "@/typings/Show.type";
import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Stack } from '@chakra-ui/react'
import { Heading, Image, Text } from "@chakra-ui/react";

interface IShowDetailsProps{
    show:IShow;
}

export const ShowDetails = ({show}: IShowDetailsProps,) =>{
    return (
        <Card variant={["detailsCardMobile","detailsCardMobile","detailsCard"]}>
            <CardHeader>
                <Image alt="Show image" height={"100%"} width={"100%"} objectFit={"cover"} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
            </CardHeader>
            <CardBody>
                <Flex alignItems={"start"} gap={"5px"} flexDirection={"column"}>
                    <Text>{show.title}</Text>
                    <Flex textStyle={"subtitle.regular"} alignItems={"center"} gap={"4px"}>
                        <StarIcon/>
                        <Text>{(show.average_rating && (show.average_rating.toFixed(1) + " / 5")) || "No ratings"}</Text>
                    </Flex>    
                </Flex>
                <Text textStyle={"smallCaption.regular"}>{show.description}</Text>
            </CardBody>
        </Card>
    );
}