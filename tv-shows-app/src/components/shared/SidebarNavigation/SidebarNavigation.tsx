"use client"    
import { Box, Hide, Show, useMediaQuery } from "@chakra-ui/react"
import { Fragment, LegacyRef, useEffect, useRef } from "react";
import { SidebarNavigationDesktop } from "./layouts/SidebarNavigation.desktop";
import { SidebarNavigationMobile } from "./layouts/SidebarNavigation.mobile";

export const SidebarNavigation = () => {
    const ref = useRef<any>();

    useEffect(()=>{
      (ref.current as HTMLDivElement).style.opacity = "1"; 
    },[])

    return (
      <Box ref={ref} opacity={0}>
        <Hide above="md">
          <SidebarNavigationMobile />
        </Hide>
        <Show above="md">
          <SidebarNavigationDesktop />
        </Show>
      </Box>
    )
}