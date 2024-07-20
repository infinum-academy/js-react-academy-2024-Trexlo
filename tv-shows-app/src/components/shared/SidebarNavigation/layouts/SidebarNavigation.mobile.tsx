"use client"    
import { navigationItems } from "@/app/data/navigation-items";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Icon, IconButton, Image, useDisclosure } from "@chakra-ui/react"
import NextLink from 'next/link';
import { usePathname } from "next/navigation";
import Logo from "../../../../assets/icons/logo.svg";
import { HamburgerIcon } from "@chakra-ui/icons";
export const SidebarNavigationMobile = () => {
    const pathname = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();

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