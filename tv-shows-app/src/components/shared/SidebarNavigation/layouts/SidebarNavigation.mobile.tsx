"use client"    
import { navigationItems } from "@/app/data/navigation-items";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Image, useDisclosure } from "@chakra-ui/react"
import NextLink from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useUser } from "@/hooks/useUser";
import { ShowPicker } from "@/components/features/shows/ShowPicker/ShowPicker";

export const SidebarNavigationMobile = () => {
    const pathname = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [user, setUser] = useUser();   

    return (<>

      <Flex 
        flexDirection={"row"} 
        justifyContent={"space-between"} 
        padding={"17px"}
        alignItems={"center"}
      >
        <Image src="/images/logo.svg"/>
        <HamburgerIcon
          w={"24px"}
          h={"24px"}
          color={"white"}
          aria-label='Menu'
          onClick={onOpen}
        />
      </Flex>

      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={"16px"} bg={"purple"}>
          <DrawerHeader>
            <DrawerCloseButton color={"white"}/>
          </DrawerHeader>
          <DrawerBody>
                {
                  navigationItems.map((link, index) =>
                    <Button 
                      key={index} 
                      as={NextLink} 
                      href={link.url} 
                      onClick={onClose}
                      variant={(pathname == link.url)?"navigationButton":"navigationButtonActive"}
                    >{link.content}</Button>
                  )
                }
                <ShowPicker />
          </DrawerBody>
          <DrawerFooter placeContent={"start"}>
            <Button 
                variant={"navigationButtonActive"}
                onClick={()=>{
                  setUser(undefined)
                  router.replace('/login');
                }}
              >Log out</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
    )
}