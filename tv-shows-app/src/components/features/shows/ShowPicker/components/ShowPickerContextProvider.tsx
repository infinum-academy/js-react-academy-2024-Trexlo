import { apiPaths } from "@/app/data/api-paths";
import { getShows } from "@/fetchers/show";
import { IShow } from "@/typings/Show.type";
import { createContext, ReactNode, useState } from "react";
import useSWR from "swr";

interface IShowPickerContext {
	currentStep: number;
	setCurrentStep: (step: number) => void;
    showsList: Array<IShow>;
    pickedShows: Array<IShow>;
	setPickedShows: (shows: Array<IShow>) => void;
    maxSteps: number;
}

export const ShowPickerContext = createContext<IShowPickerContext>({} as IShowPickerContext);

interface IShowPickerContextProviderProps {
	children: ReactNode;
}

export const ShowPickerContextProvider = ({ children }: IShowPickerContextProviderProps) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [pickedShows, setPickedShows] = useState<Array<IShow>>([]);
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
                setPickedShows,
                maxSteps:4,
			}}
		>
			{children}
		</ShowPickerContext.Provider>
	);
};