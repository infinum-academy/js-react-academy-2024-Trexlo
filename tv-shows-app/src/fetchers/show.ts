import { apiPaths } from '@/app/data/api-paths';
import { fetcher } from '@/fetchers/fetcher';
import { IAuthUser } from '@/typings/Auth.type';
import { IShow } from '@/typings/Show.type';

interface IShowListsResponse {
	shows: Array<IShow>;
}

function getUserData(){
	const userString = sessionStorage.getItem('user'); 
	if(!userString) throw new Error("Not logged in");
	const user = JSON.parse(userString) as IAuthUser;
	return {
		client: user.client,
		accessToken: user.accessToken,
		uid: user.uid,
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