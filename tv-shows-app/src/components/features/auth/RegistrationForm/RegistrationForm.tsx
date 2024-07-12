'use client'
import { apiPaths } from "@/app/data/api-paths";
import { mutator, registerMutator } from "@/fetchers/mutators";
import { IRegisterFormInputs, IRegisterFormResponse } from "@/typings/Auth.type";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";



export const RegistrationForm = () => {
    const {register, handleSubmit} = useForm<IRegisterFormInputs>();
    const {trigger} = useSWRMutation(apiPaths.registration, registerMutator, {
        onSuccess: (data)=>{
            console.log(data);
        }
    });
    const [error, setError] = useState("");
    const onRegister = async (data: IRegisterFormInputs) => {
        if(data.password != data.repeatPassword){
            setError("Passwords do not match");
            return;
        }
        await trigger(data);
    };

    return (
        <Flex color={"white"} as={"form"} flexDir={"column"} onSubmit={handleSubmit(onRegister)}>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='white' />
                </InputLeftElement>
                <Input type='email' isRequired={true} {...register('email')} placeholder='Email' />
            </InputGroup>
            <FormControl isInvalid={error!=""}>
                <InputGroup flexDir={"column"}>
                    <InputLeftElement pointerEvents='none'>
                        <LockIcon color='white' />
                    </InputLeftElement>
                    <Input type='password' isRequired={true} {...register('password')} placeholder='Password' />
                    <FormHelperText>At least 8 characters</FormHelperText>
                </InputGroup>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <LockIcon color='white' />
                    </InputLeftElement>
                    <Input type='password' isRequired={true} {...register('repeatPassword')} placeholder='Confirm password' />
                </InputGroup>
                <FormErrorMessage>{error}</FormErrorMessage>
                <Button type="submit">SIGN UP</Button>
            </FormControl>
        </Flex>
    )
}