"use client"    
import { navigationItems } from "@/app/data/navigation-items";
import { Button, Flex, Heading } from "@chakra-ui/react"
import NextLink from 'next/link';
import { usePathname } from "next/navigation";

export const SidebarNavigationDesktop = () => {
    const pathname = usePathname();
    
    return (
            <Flex 
                  alignItems={"left"} 
                  justifyContent={"center"} 
                  minW={"fit-content"} 
                  w={["100%", "100%", "30vh"]} 
                  h={["100px","100px","100vh"]} 
                  position={"sticky"}
                  top={0}
                  color={"white"} 
                  zIndex={2} 
                  bgColor={"darkPurple"} 
                  gap={3} 
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
                      variant={(pathname == link.url)?"navigationButtonActive":"navigationButton"}
                    >{link.content}</Button>
                  )
                }
              <Button 
                mt={"auto"} 
                as={NextLink} href={'/logout'} 
                variant={"navigationButton"}
              >Log out</Button>
            </Flex>
    )
}