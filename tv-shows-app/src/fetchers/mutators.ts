import { IRegisterFormInputs, IRegisterFormResponse } from "@/typings/Auth.type";

export async function mutator<ARGS, RESPONSE>(url:string, arg:ARGS){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    });
    if(!response.ok){
        throw new Error(`Failed to mutate on ${url}`);
    }

    return {headers: response.headers, data: response.json as RESPONSE};
}

export async function registerMutator(url:string, {arg}:{arg:IRegisterFormInputs}){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    });
    if(!response.ok){
        throw new Error(`Failed to mutate on ${url}`);
    }

    return {headers: response.headers, data: await response.json() as IRegisterFormResponse};
}