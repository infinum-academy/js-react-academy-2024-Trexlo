import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { SidebarNavigation } from "@/components/shared/SidebarNavigation/SidebarNavigation";
import { Flex } from "@chakra-ui/react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthRedirect condition="isLoggedOut" to="/login"/>
      <Flex flexDirection={["column","column", "row"]} minH={"100vh"}>
        <SidebarNavigation/>
        {children}
      </Flex>
    </>
  );
}
