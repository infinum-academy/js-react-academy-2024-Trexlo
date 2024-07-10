import { Button, Flex, Heading } from "@chakra-ui/react"
import NextLink from 'next/link';

interface ISidebarNavigationProps {
    activeLink: string;
}

export const SidebarNavigation = ({activeLink}: ISidebarNavigationProps) => {
    const links: ISidebarElement[] = [
        {
          content:"All shows",
          url:"/shows"
        },
        {
          content:"Top rated",
          url:"/shows/top-rated"
        },
        {
          content:"My profile",
          url:"/account"
        },
    ];

    return (
        <Flex alignItems={"stretch"} justifyContent={"center"} minW={"fit-content"} w={["100%", "100%", "30vh"]} h={["100px","100px","100vh"]} position={"relative"}>
            <Flex alignItems={"center"} h={["100px","100px","100vh"]} zIndex={2} bgColor={"#1f004d"} gap={3} position={"fixed"} padding={5} flexDirection={["row","row","column"]}>
              <Heading 
                display={["none","none", "block"]}
                size={"md"} 
                color={"white"} 
              >TV shows APP</Heading>
                {
                  links.map((link, index) =>
                    <Button key={index} as={NextLink} href={link.url} variant={(activeLink == link.url)?"solid":"link"}>{link.content}</Button>
                  )
                }
              <Button ml={["auto","auto","initial"]} mt={["initial","initial","auto"]} as={NextLink} href={'/logout'} variant={"link"}>Log out</Button>
            </Flex>
        </Flex>
    )
}