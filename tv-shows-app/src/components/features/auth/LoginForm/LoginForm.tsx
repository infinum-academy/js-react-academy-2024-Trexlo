'use client'
import { apiPaths } from "@/app/data/api-paths";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { loginMutator } from "@/fetchers/mutators";
import { ILogInFormInputs } from "@/typings/Auth.type";
import { EmailIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import NextLink from "next/link";
import { useUser } from "@/hooks/useUser";


export const LoginForm = () => {
    const {register, handleSubmit, setError,
        formState:{ 
            isSubmitting,
            errors
        }
    } = useForm<ILogInFormInputs>();
    const [user, setUser] = useUser();
    const router = useRouter();
    const {trigger} = useSWRMutation(apiPaths.login, loginMutator, {
        onSuccess: (data)=>{

            const client = data.headers.get('client');
            const accessToken = data.headers.get('access-token');
            const uid = data.headers.get('uid');
            const expiry = data.headers.get('expiry');

            if(client && accessToken && uid && expiry){
              setUser({
                accessToken: accessToken,
                client: client,
                uid: uid,
                expiry: expiry
              });
              router.replace('/shows');
            }else{
              setError("root",{type:"validate", message: "User data not complete."});
            }
        },
        onError(err, key, config) {
            setError("root", {type:"validate", message: err.message});
        },
        throwOnError: false
    });
    const onLogin = async (data: ILogInFormInputs) => {
        await trigger(data);
    };

    return (
      <Flex
        color={"white"}
        as={"form"}
        width={"100%"}
        height={"100%"}
        padding={5}
        flexDir={"column"}
        onSubmit={handleSubmit(onLogin)}
      >
        <FormControl
          alignItems={"center"}
          as={Flex}
          flexDir={"column"}
          gap={5}
          isInvalid={errors.root && errors.root.message != ""}
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
          <PasswordInput
            isRequired={true}
            {...register("password")}
            placeholder="Password"
            _placeholder={{ color: "inherit" }}
          />
          <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
          <Button
            w={"50%"}
            isLoading={isSubmitting}
            loadingText="Logging in"
            type="submit"
          >LOG IN</Button>
          <Text>{"Don't"} have an account? <Text as={NextLink} href={"/register"} fontWeight={"bold"}>Register</Text></Text>
        </FormControl>
      </Flex>
    );
}