import { Dispatch } from "react";
import axios, { AxiosError } from "axios";

import http from "../../../http_common";
import {
    IRegisterModel,
    RegisterAction,
    RegisterActionTypes,
    RegisterServerError
} from "./types";

export const RegisterUser = (data: IRegisterModel, file: File) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try {
            var formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("password_confirmation", data.passwordConfirm);
            formData.append("file", file);

            const response = await http.post<IRegisterModel>("api/auth/register", formData);

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