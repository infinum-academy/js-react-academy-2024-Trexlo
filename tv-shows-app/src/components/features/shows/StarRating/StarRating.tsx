import { Box, Flex, FormLabel, HStack, RadioGroup, useRadio, useRadioGroup, UseRadioProps } from "@chakra-ui/react"

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
        register('rating', {value: val});
    }

    const onHoverHandler = (val: number, hovering:boolean)=>{
        if(hovering){
            onChange(val, true);
        }else {
            onChange(undefined, true);
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
                    value={value.toString()}  
                    onFocus={() => changeValue(value || 1)}
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
                            currentValue={value}
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