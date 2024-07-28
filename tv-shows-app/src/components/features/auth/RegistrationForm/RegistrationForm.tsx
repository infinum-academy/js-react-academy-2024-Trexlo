'use client'
import { apiPaths } from "@/app/data/api-paths";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { registerMutator } from "@/fetchers/mutators";
import { IRegisterFormInputs } from "@/typings/Auth.type";
import { EmailIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export const RegistrationForm = () => {
    const {register, handleSubmit, setError, clearErrors,
        formState:{
            isSubmitting,
            errors,
            isDirty,
        }
    } = useForm<IRegisterFormInputs>({
      defaultValues:{
        email:"",
        password:"",
        repeatPassword:"",
      }
    });
    const router = useRouter();
    
    const {trigger} = useSWRMutation(apiPaths.registration, registerMutator, {
        onSuccess: (data)=>{
            router.push('/login');
        },
        onError(err, key, config) {
            setError("root",{type: "validate", message: err.message});
        },
        throwOnError: false
    });

    const onRegister = async (data: IRegisterFormInputs) => {
        if(data.password.length<8){
            setError('password',{
              type: "validate",
              message: "Password must have at least 8 characters",
            });
            return;
        }
        if(data.password != data.repeatPassword){
            setError('repeatPassword',{
              type: "validate",
              message: "Passwords do not match",
            });
            return;
        }
        clearErrors(['password','repeatPassword']);
        await trigger(data);
    };

    return (
      <Flex
        mb={"auto"}
        color={"white"}
        as={"form"}
        width={"100%"}
        flexDir={"column"}
        onSubmit={handleSubmit(onRegister)}
      >
        <FormControl
          as={Flex}
          flexDir={"column"}
          alignItems={"center"}
          gap={["36px"]}
          isInvalid={errors.root && errors.root.message != ""}
        >
          <InputGroup variant={"authInput"}>
            <InputLeftElement pointerEvents="none">
              <EmailIcon/>
            </InputLeftElement>
            <Input
              type="email"
              isRequired={true}
              {...register("email")}
              placeholder="Email"
            />
          </InputGroup>
          <FormControl 
              as={Flex}
              flexDir={"column"}
              alignItems={"center"}
              isInvalid={
                  (errors.password && errors.password.message != "")
               || (errors.repeatPassword && errors.repeatPassword.message != "")
              }
              gap={"11px"}
          >
            <InputGroup variant={"authInput"} flexDir={"column"}>
              <PasswordInput
                type="password"
                isRequired={true}
                isInvalid={errors.password && errors.password.message != ""}
                {...register("password")}
                placeholder="Password"
              />
              <FormHelperText pl={4} color={"whitesmoke"}>At least 8 characters</FormHelperText>
            </InputGroup>
            <InputGroup variant={"authInput"}>
              <PasswordInput
                type="password"
                isRequired={true}
                isInvalid={errors.repeatPassword && errors.repeatPassword.message != ""}
                {...register("repeatPassword")}
                placeholder="Confirm password"
              />
            </InputGroup>
            <FormErrorMessage>{errors.password?.message} {errors.repeatPassword?.message}</FormErrorMessage>
          </FormControl>
          <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
          <Button
            isLoading={isSubmitting}
            loadingText="Signing up"  
            type="submit"
            isDisabled={!isDirty}
          >SIGN UP</Button>
          <Text>Already have an account? <Text as={NextLink} href={"/login"} fontWeight={"bold"}>Log in</Text></Text>
        </FormControl>
      </Flex>
    );
}