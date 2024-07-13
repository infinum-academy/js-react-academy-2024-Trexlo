import { IAuthUser } from "@/typings/Auth.type";
import { useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(() => {
        const client = sessionStorage.getItem("client");
        const accessToken = sessionStorage.getItem("access-token");
        const uid = sessionStorage.getItem("uid");
        const expiry = sessionStorage.getItem("expiry");
        if(client && accessToken && uid && expiry){
            return {
                accessToken,
                client,
                expiry,
                uid
            }
        }else{
            return undefined;
        }
    });
    
    const setUserValue = (userValues:IAuthUser | undefined) => {
        if(!userValues){
            sessionStorage.removeItem('client');
            sessionStorage.removeItem('access-token');
            sessionStorage.removeItem('uid');
            sessionStorage.removeItem('expiry');
        }else{
            sessionStorage.setItem("client", userValues.client)
            sessionStorage.setItem("access-token", userValues.accessToken)
            sessionStorage.setItem("uid", userValues.uid)
            sessionStorage.setItem("expiry", userValues.expiry)
        }
        setUser(userValues);
    }

    return [user, setUserValue] as const;
}