import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';
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
