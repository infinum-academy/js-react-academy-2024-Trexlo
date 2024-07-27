import { fetcher } from '@/fetchers/fetcher';
import { IAuthUser, IProfileInputs, IUser } from '@/typings/Auth.type';
import { IReview, IReviewFormInputs } from '@/typings/Review.type';
import { IShow } from '@/typings/Show.type';
import { mutator } from './mutators';

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

export function getUser(url: string){
	const user = getUserData();
	return fetcher<{user: IUser}>(url, {
		headers:{
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function setUserImage(url: string, {arg}:{arg:IProfileInputs}){
	const user = getUserData();
    return mutator<IProfileInputs, IReview>(url, {arg}, {
		method:"PUT",
		headers:{
			"Content-Type": "multipart/form-data",
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		},
		body:arg.image,
	});
}

export function getShows(url: string) {
	const user = getUserData();
	return fetcher<IShowListsResponse>(url, {
		headers:{
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function getShow(url: string) {
	const user = getUserData();
	return fetcher<{show: IShow}>(url, {
		headers:{
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function getReviews(url: string) {
	const user = getUserData();
	return fetcher<{reviews: IReview[], meta:any}>(url, {
		headers:{
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function createReview(url: string, {arg}:{arg:IReviewFormInputs}){
	const user = getUserData();
    return mutator<IReviewFormInputs, IReview>(url, {arg}, {
		headers:{
			'Content-type': 'application/json',
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function deleteReview(url: string){
	const user = getUserData();
    return mutator<undefined, undefined>(url, {arg:undefined}, {
		method: 'DELETE',
		headers:{
			'Content-type': 'application/json',
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}

export function editReview(url: string, {arg}:{arg:IReviewFormInputs}){
	const user = getUserData();
    return mutator<IReviewFormInputs, IReview>(url, {arg},  {
		method: 'PATCH',
		headers:{
			'Content-type': 'application/json',
			'client': user.client,
			'access-token': user.accessToken,
			'uid': user.uid,
		}
	});
}