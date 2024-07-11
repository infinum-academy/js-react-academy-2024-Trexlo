"use client"    
import { navigationItems } from "@/app/data/navigation-items";
import { Button, Flex, Heading } from "@chakra-ui/react"
import NextLink from 'next/link';
import { usePathname } from "next/navigation";

export const SidebarNavigation = () => {
    const pathname = usePathname();
    
    return (
        <Flex alignItems={"stretch"} 
              justifyContent={"center"} 
              minW={"fit-content"} 
              w={["100%", "100%", "30vh"]} 
              h={["100px","100px","100vh"]} 
              position={"relative"}
            >
            <Flex color={"white"} 
                  alignItems={"center"} 
                  h={["100px","100px","100vh"]} 
                  zIndex={2} bgColor={"#1f004d"} 
                  gap={3} 
                  position={"fixed"} 
                  padding={5} 
                  flexDirection={["row","row","column"]}>
              <Heading 
                display={["none","none", "block"]}
                size={"md"}  
              >TV shows APP</Heading>
                {
                  navigationItems.map((link, index) =>
                    <Button 
                      key={index} 
                      as={NextLink} 
                      href={link.url} 
                      variant={(pathname == link.url)?"solid":"link"}
                    >{link.content}</Button>
                  )
                }
              <Button 
                ml={["auto","auto","initial"]} 
                mt={["initial","initial","auto"]} 
                as={NextLink} href={'/logout'} 
                variant={"link"}
              >Log out</Button>
            </Flex>
        </Flex>
    )
}