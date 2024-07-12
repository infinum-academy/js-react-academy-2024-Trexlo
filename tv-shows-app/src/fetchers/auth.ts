import { IRegisterFormInputs } from "@/typings/Auth.type";
import { mutator } from "./mutators";
import { apiPaths } from "@/app/data/api-paths";

export function registerUser(args: IRegisterFormInputs){
    // return mutator<IRegisterFormInputs, IRegisterFormResponse>(apiPaths.registration, args);
}