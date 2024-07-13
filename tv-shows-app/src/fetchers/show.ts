import { apiPaths } from '@/app/data/api-paths';
import { fetcher } from '@/fetchers/fetcher';
import { IShow } from '@/typings/Show.type';

interface IShowListsResponse {
	shows: Array<IShow>;
}

function getUserData(){
	const client = sessionStorage.getItem('client');
	const accessToken = sessionStorage.getItem('access-token');
	const uid = sessionStorage.getItem('uid');
	if(!client || !accessToken || !uid) throw new Error("Not logged in");
	return {
		client,
		accessToken,
		uid,
	}
}

export function getAllShows() {
	const user = getUserData();
	return fetcher<IShowListsResponse>(apiPaths.allShows, {
		headers:{
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function getTopShows() {
	const user = getUserData();
	return fetcher<IShowListsResponse>(apiPaths.topShows, {
		headers:{
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function getShow(id: string) {
	const user = getUserData();
	return fetcher<{show: IShow}>(apiPaths.show(id), {
		headers:{
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}