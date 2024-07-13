'use client'
import { apiPaths } from "@/app/data/api-paths";
import { loginMutator, mutator, registerMutator } from "@/fetchers/mutators";
import { ILogInFormInputs, IRegisterFormInputs } from "@/typings/Auth.type";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";



export const LoginForm = () => {
    const {register, handleSubmit, 
        formState:{ 
            isSubmitting
        }
    } = useForm<ILogInFormInputs>();
    const router = useRouter();
    const {trigger} = useSWRMutation(apiPaths.login, loginMutator, {
        onSuccess: (data)=>{
            const client = data.headers.get('client');
            if(client){
                sessionStorage.setItem('client', client);
            }
            const accessToken = data.headers.get('access-token');
            if(accessToken){
                sessionStorage.setItem('access-token', accessToken);
            }
            const uid = data.headers.get('uid');
            if(uid){
                sessionStorage.setItem('uid', uid);
            }
            const expiry = data.headers.get('expiry');
            if(expiry){
                sessionStorage.setItem('expiry', expiry);
            }
            router.push('/shows');
        },
        onError(err, key, config) {
            setError(err.message);
        },
    });
    const [error, setError] = useState("");
    const onRegister = async (data: ILogInFormInputs) => {
        await trigger(data);
    };

    return (
        <Flex color={"white"} as={"form"} flexDir={"column"} onSubmit={handleSubmit(onRegister)}>
            <FormControl isInvalid={error!=""}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='white' />
                    </InputLeftElement>
                    <Input type='email' isRequired={true} {...register('email')} placeholder='Email' />
                </InputGroup>
                <InputGroup flexDir={"column"}>
                    <InputLeftElement pointerEvents='none'>
                        <LockIcon color='white' />
                    </InputLeftElement>
                    <Input type='password' isRequired={true} {...register('password')} placeholder='Password' />
                </InputGroup>
                <FormErrorMessage>{error}</FormErrorMessage>
                <Button isLoading={isSubmitting} loadingText="Logging in" type="submit">LOG IN</Button>
            </FormControl>
        </Flex>
    )
}