import { IShow } from "@/typings/Show.type";
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import { Flex, Heading, Image, Text } from "@chakra-ui/react";

export const ShowDetails = (showData: IShow) =>{
    return (
        <Card overflow={"hidden"} rounded={20} backgroundColor={"white"} color={"indigo"}>
            <Image alt="Show image" src={showData.imageUrl || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
            <CardBody>
                <Stack mt='6' spacing='4'>
                    <Heading size={"lg"}>{showData.title}</Heading>
                    <Text>{showData.description}</Text>
                    <Text>{(showData.averageRating && (showData.averageRating + " / 5")) || "No ratings"}</Text>
                </Stack>
            </CardBody>
        </Card>
    );
}