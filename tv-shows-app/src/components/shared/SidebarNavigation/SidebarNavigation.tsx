import { Button, Flex } from "@chakra-ui/react"
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
      ]
    return (
        <Flex alignItems={"center"} gap={3} w={["100%", "100%", "auto"]} h={["100px","100px","100vh"]} position={"relative"} padding={5} flexDirection={["row","row","column"]} height={"100%"}>
            {
                links.map((link, index) =>
                    <Button key={index} as={NextLink} href={link.url} variant={(activeLink == link.url)?"solid":"link"}>{link.content}</Button>
                )
            }
            <Button ml={["auto","auto","initial"]} mt={["initial","initial","auto"]} as={NextLink} href={'/logout'} variant={"link"}>Log out</Button>
        </Flex>
    )
}