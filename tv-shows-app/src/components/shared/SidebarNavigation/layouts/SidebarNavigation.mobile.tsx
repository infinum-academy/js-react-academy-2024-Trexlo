"use client"    
import { navigationItems } from "@/app/data/navigation-items";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react"
import NextLink from 'next/link';
import { usePathname } from "next/navigation";

export const SidebarNavigationMobile = () => {
    const pathname = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (<>
      <Button colorScheme='blue' onClick={onOpen}>
        Open
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={"16px"} bg={"purple"}>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
                {
                  navigationItems.map((link, index) =>
                    <Button 
                      key={index} 
                      as={NextLink} 
                      href={link.url} 
                      variant={(pathname == link.url)?"navigationButton":"navigationButtonActive"}
                    >{link.content}</Button>
                  )
                }

          </DrawerBody>
          <DrawerFooter placeContent={"start"}>
            <Button 
                as={NextLink} href={'/logout'} 
                variant={"navigationButtonActive"}
              >Log out</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
    )
}