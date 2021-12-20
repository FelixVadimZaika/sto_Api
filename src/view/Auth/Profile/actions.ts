import { Dispatch } from "react";
import http from "../../../http_common";

import {
    ProfileActions,
    IProfileModel,
    ProfileActionTypes
} from "./types";

export const GethUser = () => {
    return async (dispatch: Dispatch<ProfileActions>) => {
        try {
            let response = await http.get<IProfileModel>("api/auth/user-profile");
            const data = response.data;
            
            dispatch({
                type: ProfileActionTypes.GET_PROFILE,
                payload: { name: data.name, email: data.email },
            });

            return Promise.resolve(response);
        } catch (ex) {
            console.log("Problem fetch");
            return Promise.reject();
        }
    };
};