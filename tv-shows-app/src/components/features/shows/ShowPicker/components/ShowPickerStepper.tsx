import { Progress } from '@chakra-ui/react';
import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';
import { ShowsList } from '@/components/shared/shows/ShowsList/ShowsList';
import { ShowPickerStep } from './ShowPickerStep';
import { ShowPickerResult } from './ShowPickerResult';

export const ShowPickerStepper = () => {
	const { currentStep, maxSteps } = useContext(ShowPickerContext);
    
	if(currentStep == maxSteps){
		return <ShowPickerResult />
	}else{
		return <ShowPickerStep />;
	}
};
