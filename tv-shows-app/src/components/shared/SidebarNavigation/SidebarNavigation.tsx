"use client"    
import { Hide, Show } from "@chakra-ui/react"
import { Fragment } from "react";
import { SidebarNavigationDesktop } from "./layouts/SidebarNavigation.desktop";
import { SidebarNavigationMobile } from "./layouts/SidebarNavigation.mobile";

export const SidebarNavigation = () => {
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