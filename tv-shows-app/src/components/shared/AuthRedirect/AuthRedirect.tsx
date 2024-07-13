'use client'
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IAuthRedirectProps {
    to: string;
    condition: 'isLoggedIn' | 'isLoggedOut';
}

export const AuthRedirect = ({to, condition}: IAuthRedirectProps) =>{
    const router = useRouter();
    
    const [user, setUser] = useUser();

    useEffect(() => {
        if(user && user.expiry && ((new Date().getTime() / 1000) > parseInt(user.expiry)) && condition === 'isLoggedOut'){
            router.push('/logout');
        }
        if(!user && condition === 'isLoggedOut'){
            router.push(to);
        }
        if(user && condition === 'isLoggedIn'){
            router.push(to);
        }
    }, [router, condition, to, user]);

    return null;
}