import { apiPaths } from "@/app/data/api-paths";
import { getShows } from "@/fetchers/show";
import { IShow } from "@/typings/Show.type";
import { createContext, ReactNode, useState } from "react";
import useSWR from "swr";

interface IShowPickerContext {
	currentStep: number;
	setCurrentStep: (step: number) => void;
    showsList: Array<IShow>;
    pickedShows: Array<Array<IShow>>;
	setPickedShows: (shows: Array<Array<IShow>>) => void;
	currentRound: number;
	setCurrentRound: (step: number) => void;
    maxSteps: number;
	setMaxSteps: (step: number) => void;
    maxRounds: number;
	setMaxRounds: (step: number) => void;
}

export const ShowPickerContext = createContext<IShowPickerContext>({} as IShowPickerContext);

interface IShowPickerContextProviderProps {
	children: ReactNode;
}

export const ShowPickerContextProvider = ({ children }: IShowPickerContextProviderProps) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [maxSteps, setMaxSteps] = useState(4);
	const [maxRounds, setMaxRounds] = useState(2);
	const [currentRound, setCurrentRound] = useState(0);
	const [pickedShows, setPickedShows] = useState<Array<Array<IShow>>>([[],[],[],[]]);
	const { data } = useSWR(apiPaths.allShows, getShows);

    var showsList = data?.shows ?? [];

    showsList = showsList.toSorted((a, b) => (a.average_rating || 0) - (b.average_rating || 0));

	return (
		<ShowPickerContext.Provider
			value={{
                currentStep,
                setCurrentStep,
				showsList,
				pickedShows,
				currentRound,
				setCurrentRound,
                setPickedShows,
                maxSteps,
				setMaxSteps,
                maxRounds,
				setMaxRounds
			}}
		>
			{children}
		</ShowPickerContext.Provider>
	);
};