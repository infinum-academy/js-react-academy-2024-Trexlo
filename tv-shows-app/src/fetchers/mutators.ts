import { ILogInFormInputs, IRegisterFormInputs, IUser } from "@/typings/Auth.type";

export async function mutator<ARGS, RESPONSE>(url:string, {arg}:{arg: ARGS}, init?: RequestInit){
    let data = {};
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
        ...init
    });
    const noContent = response.status === 204;
    if(!response.ok){
        const errorResponse = (await response.json())
        if(errorResponse){
            if(errorResponse.errors){
                throw new Error(errorResponse.errors.join('. '));
            }
            throw new Error("An error occurred.");
        }
        throw new Error(`Failed to mutate on ${url}`);
    }
    if (!noContent) {
        data = await response.json();
    }
    
    return {headers: response.headers, data: data as RESPONSE};
}

export function registerMutator(url:string, {arg}:{arg:IRegisterFormInputs}){
    return mutator<IRegisterFormInputs, IUser>(url, {arg});
}

export function loginMutator(url:string, {arg}:{arg:ILogInFormInputs}){
    return mutator<ILogInFormInputs, IUser>(url, {arg});
}