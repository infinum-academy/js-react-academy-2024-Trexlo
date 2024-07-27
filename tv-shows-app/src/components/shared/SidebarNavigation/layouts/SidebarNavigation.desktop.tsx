"use client"    
import { navigationItems } from "@/app/data/navigation-items";
import { useUser } from "@/hooks/useUser";
import { Button, Flex, Heading, Image } from "@chakra-ui/react"
import NextLink from 'next/link';
import { usePathname, useRouter } from "next/navigation";

export const SidebarNavigationDesktop = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useUser();    

    return (
            <Flex 
                  alignItems={"left"} 
                  justifyContent={"center"} 
                  minW={"fit-content"} 
                  w={["100%", "100%", "fit-content"]} 
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
                mb={10}
              >
                <Image src="/images/logo.svg"/>
              </Heading>
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
                variant={"navigationButton"}
                onClick={()=>{
                  setUser(undefined)
                  router.replace('/login');
                }}
              >Log out</Button>
            </Flex>
    )
}