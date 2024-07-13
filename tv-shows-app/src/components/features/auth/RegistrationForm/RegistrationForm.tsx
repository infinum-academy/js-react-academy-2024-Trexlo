'use client'
import { apiPaths } from "@/app/data/api-paths";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { mutator, registerMutator } from "@/fetchers/mutators";
import { IRegisterFormInputs } from "@/typings/Auth.type";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";



export const RegistrationForm = () => {
    const {register, handleSubmit,
        formState:{
            isSubmitting
        }
    } = useForm<IRegisterFormInputs>();
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const {trigger} = useSWRMutation(apiPaths.registration, registerMutator, {
        onSuccess: (data)=>{
            console.log(data);
        },
        onError(err, key, config) {
            setError(err.message);
        },
    });
    const onRegister = async (data: IRegisterFormInputs) => {
        if(data.password.length<8){
            setPasswordError("Password must have at least 8 characters");
            return;
        }
        if(data.password != data.repeatPassword){
            setPasswordError("Passwords do not match");
            return;
        }
        setPasswordError("");
        await trigger(data);
    };

    return (
        <Flex color={"white"} as={"form"} flexDir={"column"} onSubmit={handleSubmit(onRegister)}>
            <FormControl isInvalid={error!="" }>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='white' />
                    </InputLeftElement>
                    <Input type='email' isRequired={true} {...register('email')} placeholder='Email' />
                </InputGroup>
                <FormControl isInvalid={passwordError!="" }>
                    <InputGroup flexDir={"column"}>
                        <PasswordInput type='password' isRequired={true} isInvalid={passwordError!=""}  {...register('password')} placeholder='Password' />
                        <FormHelperText>At least 8 characters</FormHelperText>
                    </InputGroup>
                    <InputGroup>
                        <PasswordInput type='password' isRequired={true} isInvalid={passwordError!=""}  {...register('repeatPassword')} placeholder='Confirm password' />
                    </InputGroup>
                    <FormErrorMessage>{passwordError}</FormErrorMessage>
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
                <Button isLoading={isSubmitting} loadingText="Signing up" type="submit">SIGN UP</Button>
            </FormControl>
        </Flex>
    )
}