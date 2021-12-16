export enum RegisterActionTypes {
    REGISTER = "Register",
}

export interface IRegisterModel {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
}

export type RegisterServerError = {
    name: Array<string>,
    email: Array<string>,
    password: Array<string>,
    passwordConfirm: Array<string>
    error: string
};


export interface RegisterState {
    user: IRegisterModel,
}

export interface FetchRegisterAction {
    type: RegisterActionTypes.REGISTER,
    payload: IRegisterModel
}

export type RegisterAction = FetchRegisterAction;