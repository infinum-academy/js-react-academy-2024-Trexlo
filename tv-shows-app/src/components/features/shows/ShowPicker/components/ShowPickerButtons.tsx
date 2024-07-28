import { Flex, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';

interface IShowPickerButtonProps{
    onClose: ()=>void;
}

export const ShowPickerButtons = ({onClose}: IShowPickerButtonProps) => {
	const {
        currentStep,
        setCurrentStep,
        maxSteps,
        currentRound,
        pickedShows,
        setCurrentRound,
        setMaxSteps,
        maxRounds,
        setMaxRounds,
        setPickedShows,
    } = useContext(ShowPickerContext);
    
	return (
		<Flex width="100%" justifyContent="space-between">
            {
                currentStep != maxSteps
                && 
                <>
                    <Button                        
                        variant={"modalButtonSecondary"}
                        isDisabled={!currentRound && !currentStep}
                        onClick={() => {
                            if(currentStep > 0){
                                setCurrentStep(currentStep - 1);
                            }else if(currentRound > 0){
                                setMaxSteps(maxSteps*2)
                                setCurrentRound(currentRound-1)
                            };
                        }
                    }>Previous</Button>
                    <Button                         
                        variant={"modalButtonSecondary"}
                        isDisabled={
                            currentStep == maxSteps-1 && 
                            (pickedShows[currentRound].findIndex(s=> s == undefined)!=-1 || pickedShows[currentRound].length!=maxSteps)
                        }
                        onClick={() => setCurrentStep(currentStep < maxSteps ? (currentStep + 1) : currentStep)}
                    >Next</Button>
                </> 
            }
            {
                currentStep == maxSteps && currentRound != maxRounds
                && 
                <>
                    <Button 
                        variant={"modalButtonSecondary"} 
                        onClick={() => setCurrentStep(currentStep > 0 ? (currentStep - 1) : currentStep)}
                    >Previous</Button>
                    <Button 
                        variant={"modalButtonSecondary"}
                        w={"100%"} 
                        onClick={()=>{
                            setMaxSteps(maxSteps/2); 
                            setCurrentStep(0); 
                            setCurrentRound(currentRound+1);
                        }}
                    >Next Round</Button>
                </> 
            }
            {
                currentStep == maxSteps && currentRound == maxRounds
                && 
                <>
                    <Button 
                        variant={"modalButtonSecondary"}
                        w={"100%"} 
                        onClick={()=>{
                            onClose(); 
                            setCurrentStep(0); 
                            setCurrentRound(0); 
                            setMaxSteps(4); 
                            setMaxRounds(2);
                            setPickedShows([[],[],[],[]])
                        }}
                    >Close</Button>
                </> 
            }
		</Flex>
	);
};
