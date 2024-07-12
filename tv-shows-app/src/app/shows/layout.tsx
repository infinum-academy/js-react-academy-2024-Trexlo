import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
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
      {children}
    </>
  );
}
