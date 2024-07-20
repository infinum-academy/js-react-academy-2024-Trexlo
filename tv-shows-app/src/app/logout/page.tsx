'use client';
import { useUser } from "@/hooks/useUser";
import { redirect, RedirectType } from "next/navigation";

export default function LogOut() {
  const [user, setUser] = useUser();
  setUser(undefined)
  redirect('/login', RedirectType.replace);
}
