import {chakra, Box, Flex, FormLabel, HStack, Radio, RadioGroup, useRadio, useRadioGroup, UseRadioProps } from "@chakra-ui/react"

import { StarIcon } from '@chakra-ui/icons'
import { UseFormRegister } from "react-hook-form";
import { IReviewFormInputs } from "../ReviewForm/ReviewForm";

interface IStarRatingProps {
    register: UseFormRegister<IReviewFormInputs>;
    label: string | undefined;
    onChange: (value: number | undefined, temporary: boolean)=>void;
    value: number;
}

export const StarRating = ({label, onChange, value, register}: IStarRatingProps) => {

    const changeValue = (val: number) => {
        onChange(val, false);
    }

    const onHoverHandler = (val: number, hovering:boolean)=>{
        if(hovering){
            onChange(val, true);
        }else {
            onChange(undefined, true);
        }
    }

    return (
        <Flex alignItems={"center"} gap={1}>
            {
                label &&
                <RadioGroup>
                    <HStack>
                    <FormLabel margin={0} color={"white"}>{label}</FormLabel>
                    {[1,2,3,4,5].map((number, index) => {
                        return (
                          <StarIcon
                            as={chakra.input}
                            type="radio"
                            {...register("rating")}
                            key={number}
                            value={number.toString()}
                            cursor="pointer"
                            color={
                                value >= (number) ? "yellow" : "white"
                            }
                            _checked={{
                                color:"yellow"
                            }}
                            onClick={() => {
                                changeValue((number));
                            }}
                            onMouseEnter={() => {
                                onHoverHandler((number), true);
                                
                            }}
                            onMouseLeave={() => {
                                onHoverHandler((number), false);
                            }}
                          ></StarIcon>
                        );
                    })}
                    </HStack> 
                </RadioGroup>
            }
            {
                !label && value && 
                <>
                    {[1,2,3,4,5].map(starValue => 
                        <StarIcon key={starValue} color={(value>=starValue)?"yellow":"white"}></StarIcon>
                    )}
                </>
            }
        </Flex>
    )
}

interface StarRadioProps extends UseRadioProps {
    currentValue: number;
    changeValue: (value:number)=>void;
    onHoverHandler: (val: number, hovering:boolean)=>void;
}

const StarRadioButton = (props: StarRadioProps) => {

  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      {props.value && (
        <StarIcon
            {...checkbox}
            cursor="pointer"
            color={
                props.currentValue >= parseInt(props.value) ? "yellow" : "white"
            }
            _checked={{
                color:"yellow"
            }}
            onMouseEnter={() => {
                if (props.value) {
                    props.onHoverHandler(parseInt(props.value), true);
                }
            }}
            onMouseLeave={() => {
                if (props.value) {
                    props.onHoverHandler(parseInt(props.value), false);
                }
            }}
        />
      )}
    </Box>
  );
};