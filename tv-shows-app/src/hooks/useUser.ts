import { IAuthUser } from "@/typings/Auth.type";
import { useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(() => {    
        if(typeof window !== "undefined"){
            const userString =sessionStorage.getItem('user');
            if(userString){
                const parsedUser = JSON.parse(userString) as IAuthUser;
                if(parsedUser.client && parsedUser.accessToken && parsedUser.uid && parsedUser.expiry){
                    return parsedUser;
                }
            }
        }
        return undefined;
    });
    
    const setUserValue = (userValues:IAuthUser | undefined) => {
        if(!userValues){
            sessionStorage.removeItem('user');
        }else{
            sessionStorage.setItem('user', JSON.stringify(userValues))
        }
        setUser(userValues);
    }

    return [user, setUserValue] as const;
}