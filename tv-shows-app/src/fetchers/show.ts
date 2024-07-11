import { fetcher } from '@/fetchers/fetcher';
import { IShow } from '@/typings/Show.type';

interface IShowListsResponse {
	shows: Array<IShow>;
}

export function getAllShows() {
	return fetcher<IShowListsResponse>('/api/shows');
}

export function getTopShows() {
	return fetcher<IShowListsResponse>('/api/shows/top-rated');
}

export function getShow(id: string) {
	return fetcher<IShow>(`/api/shows/${id}`);
}