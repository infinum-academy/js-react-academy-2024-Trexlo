export interface IRegisterFormInputs {
    email: string;
    password: string;
    repeatPassword: string;
}
export interface IRegisterFormResponse {
    email: string;
    id: string;
    image_url: string | null | undefined;
}
export interface IRegisterFormHeaders {
    accessToken: string;
    client: string;
    tokenType: string;
    expiry: number;
    uid: string;
    
}