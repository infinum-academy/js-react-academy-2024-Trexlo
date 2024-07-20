"use client"    
import { navigationItems } from "@/app/data/navigation-items";
import { Button, Flex, Heading, Hide, Show } from "@chakra-ui/react"
import NextLink from 'next/link';
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { SidebarNavigationDesktop } from "./layouts/SidebarNavigation.desktop";
import { SidebarNavigationMobile } from "./layouts/SidebarNavigation.mobile";

export const SidebarNavigation = () => {
    const pathname = usePathname();
    
    return (
      <Fragment>
        <Hide above="md">
          <SidebarNavigationMobile />
        </Hide>
        <Show above="md">
          <SidebarNavigationDesktop />
        </Show>
      </Fragment>
    )
}