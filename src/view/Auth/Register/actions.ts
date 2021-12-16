import { Dispatch } from "react";
import axios, { AxiosError } from "axios";

import http from "../../../http_common";
import {
    IRegisterModel,
    RegisterAction,
    RegisterActionTypes,
    RegisterServerError
} from "./types";

export const RegisterUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try {
            const response = await http.post<IRegisterModel>("api/auth/register", data);

            dispatch({
                type: RegisterActionTypes.REGISTER,
                payload: data,
            });

            console.log("End redux login", data);

            return Promise.resolve(response.data);
        } catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<RegisterServerError>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }

            return Promise.reject();
        }
    }
}