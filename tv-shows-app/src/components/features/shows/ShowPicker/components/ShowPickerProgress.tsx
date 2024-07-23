import { Progress } from '@chakra-ui/react';
import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';

export const ShowPickerProgress = () => {
	const { currentStep, maxSteps } = useContext(ShowPickerContext);
    
	const progress = (currentStep / maxSteps) * 100;
	return <Progress value={progress} />;
};
