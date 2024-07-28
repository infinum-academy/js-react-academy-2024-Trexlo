import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { Flex, Heading, Image } from "@chakra-ui/react";
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
        height={["100vh", "100vh", "fit-content"]}
        margin={"auto"}
        flexDir={"column"}
        alignItems={"center"}
        color={"white"}
        background={"purple"}
        padding={"56px"}
        rounded={[0, 0, 20]}
        boxShadow={"0 0 9px 0 black"}
      > 
        <Heading mb={"57px"} mt={"auto"}>
          <Image src="/images/logo.svg"/>
        </Heading>
        {children}
      </Flex>
    </>
  );
}
