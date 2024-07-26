'use client'
import { apiPaths } from "@/app/data/api-paths";
import { getUser, setUserImage } from "@/fetchers/show";
import { IProfileInputs, IUser } from "@/typings/Auth.type";
import { Button, Card, CardFooter, CardHeader, Flex, Image, Input, Spinner, Text} from "@chakra-ui/react"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

export const Profile = () => {
    
    const { data, error, isLoading } = useSWR(apiPaths.user, getUser);
    const [isEditing, setIsEditing] = useState("unknown");
    const [image, setImage] = useState("");

    const {handleSubmit, setError, control,
    } = useForm<IProfileInputs>();
     const {trigger} = useSWRMutation(apiPaths.registration, setUserImage, {
        onSuccess: (data)=>{
            console.log(data);      
            mutate(apiPaths.user)
        },
        onError(err, key, config) {
            setError("root", {type:"validate", message: err.message});
        },
        throwOnError: false
    });
    const onImageUpload = async (data: IProfileInputs) => {
        //await trigger(data);
        setIsEditing("false");
    };
    const user = data?.user ?? {} as IUser;
    if (error) {
        return <Text>An error occurred</Text>;
    }

    if(isLoading || !user){
        return (
            <Flex justifyItems={"center"} width={"100%"}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                margin={"auto"}
            />
            </Flex>
        );

    }
    
    return (
        <Card variant={"profileCard"}>
            <CardHeader>
                <Text color={"white"} textStyle={"button"}>EMAIL</Text>
                <Text color={"white"} textStyle={"subtitle.regular"}>{user.email}</Text>
            </CardHeader>
            {((isEditing == "unknown" && !user.image_url) || isEditing == "true") &&
            <CardFooter 
                position={"relative"}
            >
                <Image src={image || "/images/imagePlaceholder.svg"}/>
                {!image && <Text 
                color={"lightPurple"} 
                textStyle={"title.bold"}
                textAlign={"center"}
                >Drop your<br/>photo here</Text>}
                <Controller
                    control={control}
                    name={"image"}
                    render={({ field: { value, onChange, ...field } }) => {
                       return <Input
                                opacity={0} 
                                position={"absolute"} 
                                zIndex={1}  
                                type="file" 
                                onChange={async (e)=>{
                                    if (e.target.files && e.target.files[0]) {
                                        setImage(URL.createObjectURL(e.target.files[0]));
                                    }
                                }} height={"100%"}/>
                            }} 
                />
                {image && <Button zIndex={2} mt={5} onClick={handleSubmit(onImageUpload)} type="submit">Submit</Button>}
            </CardFooter>
            }
            {user.image_url && isEditing!="true" &&
            <CardFooter>
                <Image rounded={"full"} src={user.image_url || "/images/imagePlaceholder.svg"}/>
                <Button mt={5} onClick={()=> setIsEditing("true")}>Upload image</Button>
            </CardFooter>

            }
        </Card>
    )
}