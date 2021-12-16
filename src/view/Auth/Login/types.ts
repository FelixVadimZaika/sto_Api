export enum AuthActionTypes {
    LOGIN = "LOGIN",
}

export interface ILoginModel {
    email: string,
    password: string
}

export interface ILoginResponse {
    access_token: string,
    expires_in: string
}

export type LoginServerError = {
    email: Array<string>,
    password: Array<string>,
    error: string
};

export interface IUser {
    email: string,
    image: string
}

export interface AuthState {
    user: IUser,
    isAuth: boolean,
}

export interface LoginAction {
    type: AuthActionTypes.LOGIN,
    payload: IUser
}

export type AuthAction = LoginAction;