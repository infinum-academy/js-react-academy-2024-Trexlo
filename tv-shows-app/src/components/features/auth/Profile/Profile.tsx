'use client'
import { apiPaths } from "@/app/data/api-paths";
import { getUser } from "@/fetchers/show";
import { IUser } from "@/typings/Auth.type";
import { Avatar, Box, Flex, Image, Spinner, Text } from "@chakra-ui/react"
import useSWR from "swr";


export const Profile = () => {
    
    const { data, error, isLoading } = useSWR(apiPaths.user, getUser);

    const user = data?.user ?? {} as IUser;

    if (error) {
        return <Text>An error occurred</Text>;
    }

    if(isLoading || !user){

        return (
            <Flex justifyItems={"center"} width={"100%"}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                margin={"auto"}
            />
            </Flex>
        );

    }

    return (
        <Flex 
            w={"100%"}
            h={"100vh"}
            justifyContent={["start", "start", "center"]}
            alignItems={"center"}
            direction={"column"}
        >
            <Text color={"white"} textStyle={"button"}>EMAIL</Text>
            <Text color={"white"} textStyle={"subtitle.regular"}>{user.email}</Text>
            {!user.image_url &&
                <Flex 
                mt={"39px"}
                justifyContent={"center"}
                alignItems={"center"}
                aspectRatio={[1,1,6/4]}
                width={["90%","90%","600px"]}
                rounded={20}
                bg={"purple"}
                border={"2px dashed"}
                borderColor={"darkPurple"}
                direction={"column"}
                >
                    <Image src="/images/imagePlaceholder.svg"/>
                    <Text 
                    color={"lightPurple"} 
                    textStyle={"title.bold"}
                    textAlign={"center"}
                    >Drop your<br/>photo here</Text>
                </Flex>
            }
            {user.image_url &&
                <Avatar src={user.image_url}/>
            }
        </Flex>
    )
}