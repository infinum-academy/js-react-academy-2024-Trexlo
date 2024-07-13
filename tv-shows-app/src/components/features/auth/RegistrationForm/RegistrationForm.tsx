'use client'
import { apiPaths } from "@/app/data/api-paths";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { registerMutator } from "@/fetchers/mutators";
import { IRegisterFormInputs } from "@/typings/Auth.type";
import { EmailIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import NextLink from "next/link";
import { useRouter } from "next/navigation";


export const RegistrationForm = () => {
    const {register, handleSubmit,
        formState:{
            isSubmitting
        }
    } = useForm<IRegisterFormInputs>();
    const router = useRouter();
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const {trigger} = useSWRMutation(apiPaths.registration, registerMutator, {
        onSuccess: (data)=>{
            router.push('/login');
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
      <Flex
        color={"white"}
        as={"form"}
        alignItems={"center"}
        flexDir={"column"}
        padding={5}
        gap={3}
        onSubmit={handleSubmit(onRegister)}
      >
        <FormControl
          as={Flex}
          flexDir={"column"}
          alignItems={"center"}
          gap={5}
          isInvalid={error != ""}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="white" />
            </InputLeftElement>
            <Input
              type="email"
              isRequired={true}
              {...register("email")}
              placeholder="Email"
              _placeholder={{ color: "inherit" }}
            />
          </InputGroup>
          <FormControl isInvalid={passwordError != ""}>
            <InputGroup flexDir={"column"}>
              <PasswordInput
                type="password"
                isRequired={true}
                isInvalid={passwordError != ""}
                {...register("password")}
                placeholder="Password"
                _placeholder={{ color: "inherit" }}
              />
              <FormHelperText marginTop={0} mb={2} color={"whitesmoke"}>At least 8 characters</FormHelperText>
            </InputGroup>
            <InputGroup>
              <PasswordInput
                type="password"
                isRequired={true}
                isInvalid={passwordError != ""}
                {...register("repeatPassword")}
                placeholder="Confirm password"
                _placeholder={{ color: "inherit" }}
              />
            </InputGroup>
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>
          <FormErrorMessage>{error}</FormErrorMessage>
          <Button
            w={"50%"}
            isLoading={isSubmitting}
            loadingText="Signing up"
            type="submit"
          >SIGN UP</Button>
        </FormControl>
        <Text>Already have an account? <Text as={NextLink} href={"/login"} fontWeight={"bold"}>Log in</Text></Text>
      </Flex>
    );
}