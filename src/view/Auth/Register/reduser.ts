import { RegisterAction, RegisterActionTypes, RegisterState } from './types';

const initialState: RegisterState = {
    user: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    }
}

export const regiserReducer = (state = initialState, action: RegisterAction) => {
    switch (action.type) {
        case RegisterActionTypes.REGISTER: {
            return {
                ...state,
                user: action.payload
            }
        }
        default:
            return state;
    }
}