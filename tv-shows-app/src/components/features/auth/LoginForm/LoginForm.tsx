'use client'
import { apiPaths } from "@/app/data/api-paths";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { loginMutator } from "@/fetchers/mutators";
import { ILogInFormInputs } from "@/typings/Auth.type";
import { EmailIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import NextLink from "next/link";


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
        <Flex color={"white"} as={"form"} width={"100%"} height={"100%"} padding={5} flexDir={"column"} onSubmit={handleSubmit(onRegister)}>
            <FormControl alignItems={"center"} as={Flex} flexDir={"column"} gap={5} isInvalid={error!=""} >
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='white' />
                    </InputLeftElement>
                    <Input type='email' isRequired={true} {...register('email')} placeholder='Email' _placeholder={{ color: 'inherit' }} />
                </InputGroup>
                <PasswordInput isRequired={true} {...register('password')} placeholder='Password' _placeholder={{ color: 'inherit' }} />
                <FormErrorMessage>{error}</FormErrorMessage>
                <Button w={"50%"} isLoading={isSubmitting} loadingText="Logging in" type="submit">LOG IN</Button>
                <Text>{"Don't"} have an account? <Text as={NextLink} href={"/register"} fontWeight={"bold"} >Register</Text></Text>
            </FormControl>
        </Flex>
    )
}