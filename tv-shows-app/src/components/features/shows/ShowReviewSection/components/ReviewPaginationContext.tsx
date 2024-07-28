import { apiPaths } from "@/app/data/api-paths";
import { getReviews, getShows } from "@/fetchers/show";
import { IPagination, IReview } from "@/typings/Review.type";
import { IShow } from "@/typings/Show.type";
import Error from "next/error";
import { createContext, ReactNode, useState } from "react";
import useSWR from "swr";

interface IReviewPaginationContext {
	currentPage: number;
	setCurrentPage: (step: number) => void;
	pagination: IPagination,
	reviews: Array<IReview>,
	error: Error,
	isLoading: boolean,
}

export const ReviewPaginationContext = createContext<IReviewPaginationContext>({} as IReviewPaginationContext);

interface IReviewPaginationContextProviderProps {
	children: ReactNode;
	showId: string
}

export const ReviewPaginationContextProvider = ({ children, showId }: IReviewPaginationContextProviderProps) => {
	if(!showId) return null;
	const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading } = useSWR(apiPaths.showReviews(showId, currentPage, 5), getReviews);

	const pagination = data?.meta.pagination || {} as IPagination;

	return (
		<ReviewPaginationContext.Provider
			value={{
				reviews: data?.reviews || [],
				currentPage,
				setCurrentPage,
				pagination,
				error,
				isLoading,
			}}
		>
			{children}
		</ReviewPaginationContext.Provider>
	);
};