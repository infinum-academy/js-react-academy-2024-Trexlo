'use client';
import { redirect } from "next/navigation";

export default function LogOut() {
  sessionStorage.removeItem('client');
  sessionStorage.removeItem('access-token');
  sessionStorage.removeItem('uid');
  redirect('/login');
}
