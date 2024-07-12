'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IAuthRedirectProps {
    to: string;
    condition: 'isLoggedIn' | 'isLoggedOut';
}

export const AuthRedirect = ({to, condition}: IAuthRedirectProps) =>{
    const router = useRouter();
    
    const client = sessionStorage.getItem('client');
    const expiry = sessionStorage.getItem('expiry');

    useEffect(() => {
        if(expiry && ((new Date().getTime() / 1000) > parseInt(expiry)) && condition === 'isLoggedOut'){
            router.push('/logout');
        }
        if(!client && condition === 'isLoggedOut'){
            router.push(to);
        }
        if(client && condition === 'isLoggedIn'){
            router.push(to);
        }
    }, [router, condition, to, expiry, client]);

    return null;
}