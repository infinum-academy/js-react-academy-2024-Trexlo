import { Box, Flex, FormLabel, HStack, RadioGroup, useRadio, useRadioGroup, UseRadioProps } from "@chakra-ui/react"

import { StarIcon } from '@chakra-ui/icons'
import { useState } from "react";

interface IStarRatingProps {
    label: string | undefined;
    onChange: (nextValue:string) => void;
    onBlur: () => void;
    value: number;
}

export const StarRating = ({label, onChange, value, onBlur}: IStarRatingProps) => {
    const [starRatingValue, setStarRatingValue] = useState(value);

    const changeValue = (val: number) => {
        onChange(val.toString());
    }

    const onHoverHandler = (val: number, hovering:boolean)=>{
        if(hovering){
            setStarRatingValue(val);
        }else {
            setStarRatingValue(0);
        }
    }
    
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: '0',
        onChange: (val) =>{changeValue(parseInt(val));},
    })
    
    const group = getRootProps()
    return (
        <Flex alignItems={"center"} gap={1}>
            {
                label &&
                <RadioGroup 
                    onBlur={onBlur}
                    value={value.toString()}  
                    onFocus={() => changeValue(value || 1)}
                    onChange={onChange}
                    >
                    <HStack>
                    <FormLabel margin={0} color={"white"}>{label}</FormLabel>
                    {[...Array(5)].map((_, index) => {
                        const radio = getRadioProps({ index })
                        return (
                          <StarRadioButton
                            key={index}
                            {...radio}
                            value={(index+1).toString()}
                            onHoverHandler={onHoverHandler}
                            changeValue={changeValue}
                            currentValue={starRatingValue || value}
                          />
                        );
                    })}
                    </HStack> 
                </RadioGroup>
            }
            {
                !label && value && 
                <>
                    {[1,2,3,4,5].map(starValue => 
                        <StarIcon key={starValue} color={(value>=starValue)?"white":"purple"}></StarIcon>
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