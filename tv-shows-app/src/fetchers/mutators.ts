import { ILogInFormInputs, IRegisterFormInputs, IRegisterOrLogInResponse } from "@/typings/Auth.type";

export async function mutator<ARGS, RESPONSE>(url:string, {arg}:{arg: ARGS}){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    });
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
    return {headers: response.headers, data: await response.json() as RESPONSE};
}

export async function registerMutator(url:string, {arg}:{arg:IRegisterFormInputs}){
    return mutator<IRegisterFormInputs, IRegisterOrLogInResponse>(url, {arg});
}

export async function loginMutator(url:string, {arg}:{arg:ILogInFormInputs}){
    return mutator<ILogInFormInputs, IRegisterOrLogInResponse>(url, {arg});
}
