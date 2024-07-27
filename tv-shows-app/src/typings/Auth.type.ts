export interface IRegisterFormInputs {
    email: string;
    password: string;
    repeatPassword: string;
}
export interface ILogInFormInputs {
    email: string;
    password: string;
}
export interface IProfileInputs{
    image: string;
}
export interface IUser {
    email: string;
    id: string;
    image_url: string | null | undefined;
}
export interface IRegisterOrLogInHeaders {
    accessToken: string;
    client: string;
    tokenType: string;
    expiry: number;
    uid: string;
}
export interface IAuthUser{
    client: string;
    accessToken: string;
    expiry: string;
    uid: string;
}