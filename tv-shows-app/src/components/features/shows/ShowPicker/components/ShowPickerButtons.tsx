import { Flex, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';

interface IShowPickerButtonProps{
    onClose: ()=>void;
}

export const ShowPickerButtons = ({onClose}: IShowPickerButtonProps) => {
	const { currentStep, setCurrentStep, maxSteps } = useContext(ShowPickerContext);
	return (
		<Flex width="100%" justifyContent="space-between">
            {
                currentStep != maxSteps
                && 
                <>
                    <Button onClick={() => setCurrentStep(currentStep > 0 ? (currentStep - 1) : currentStep)}>Previous</Button>
                    <Button onClick={() => setCurrentStep(currentStep < maxSteps ? (currentStep + 1) : currentStep)}>Next</Button>
                </> 
            }
            {
                currentStep == maxSteps
                && 
                <>
                    <Button w={"100%"} onClick={()=>{onClose(); setCurrentStep(0);}}>Close</Button>
                </> 
            }
		</Flex>
	);
};
