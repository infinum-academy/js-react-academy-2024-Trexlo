import { IUser } from "./Auth.type";

export interface IReview {
    id: string;
    show_id: number;
    rating: number;
    comment: string;
    user: IUser;
}
export interface IReviewFormInputs{
    comment: string;
    rating: number;
    show_id: number;
}