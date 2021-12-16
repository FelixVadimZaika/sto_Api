import { Dispatch } from "react";
import http from "../../../http_common";

import {
    ProfileActions,
    IProfileModel,
    ProfileActionTypes
} from "./types";

export const fetchUser = () => {
    return async (dispatch: Dispatch<ProfileActions>) => {
        try {
            let response = await http.get<IProfileModel>("api/auth/user-profile");

            dispatch({
                type: ProfileActionTypes.GET_PROFILE,
                payload: response.data,
            });

            return Promise.resolve(response);
        } catch (ex) {
            console.log("Problem fetch");
            return Promise.reject();
        }
    };
};

// export AuthUser = (token: string, dispatch: Dispatch<LoginAction>) => {
//     const user = jwt.decode(token) as IUser;
//     dispatch({
//         type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
//         payload: { name: user.name, email: user.email }
//     })
// }