import { Flex, Icon, Text } from "@chakra-ui/react"

import { StarIcon } from '@chakra-ui/icons'
import { useState } from "react";

interface IStarRatingProps {
    label: string | undefined;
    onChange: (value: number)=>void;
    value: number | undefined;
}

export const StarRating = ({label, onChange, value}: IStarRatingProps) => {
    const [oldValue, setOldValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const changeValue = (val: number) => {
        setCurrentValue(val);
        setOldValue(val);
        onChange(val);
    }
    const onHoverHandler = (val: number, hovering:boolean)=>{
        if(hovering){
            setCurrentValue(val);
        }else {
            setCurrentValue(oldValue);
        }
    }
    return (
        <Flex alignItems={"center"} gap={1}>
            {
                label && 
                <>
                    <Text color={"white"}>{label}</Text>
                    <StarIcon color={(currentValue>=1)?"yellow":"white"} onClick={()=>{changeValue(1)}} onMouseEnter={()=>{onHoverHandler(1,true)}} onMouseLeave={()=>{onHoverHandler(1,false)}}></StarIcon>
                    <StarIcon color={(currentValue>=2)?"yellow":"white"} onClick={()=>{changeValue(2)}} onMouseEnter={()=>{onHoverHandler(2,true)}} onMouseLeave={()=>{onHoverHandler(2,false)}}></StarIcon>
                    <StarIcon color={(currentValue>=3)?"yellow":"white"} onClick={()=>{changeValue(3)}} onMouseEnter={()=>{onHoverHandler(3,true)}} onMouseLeave={()=>{onHoverHandler(3,false)}}></StarIcon>
                    <StarIcon color={(currentValue>=4)?"yellow":"white"} onClick={()=>{changeValue(4)}} onMouseEnter={()=>{onHoverHandler(4,true)}} onMouseLeave={()=>{onHoverHandler(4,false)}}></StarIcon>
                    <StarIcon color={(currentValue>=5)?"yellow":"white"} onClick={()=>{changeValue(5)}} onMouseEnter={()=>{onHoverHandler(5,true)}} onMouseLeave={()=>{onHoverHandler(5,false)}}></StarIcon>
                </>
            }
            {
                !label && value && 
                <>
                    <StarIcon color={(value>=1)?"yellow":"white"}></StarIcon>
                    <StarIcon color={(value>=2)?"yellow":"white"}></StarIcon>
                    <StarIcon color={(value>=3)?"yellow":"white"}></StarIcon>
                    <StarIcon color={(value>=4)?"yellow":"white"}></StarIcon>
                    <StarIcon color={(value>=5)?"yellow":"white"}></StarIcon>
                </>
            }
        </Flex>
    )
}