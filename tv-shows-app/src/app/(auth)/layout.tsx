import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { Flex, Heading } from "@chakra-ui/react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthRedirect condition="isLoggedIn" to="/shows"/>
      <Flex 
        width={["100%", "100%", "500px"]}
        margin={"auto"}
        flexDir={"column"}
        alignItems={"center"}
        color={"white"}
        background={"purple"}
        padding={"56px"}
        rounded={20}
      > 
        <Heading>TV Shows APP</Heading>
        {children}
      </Flex>
    </>
  );
}
