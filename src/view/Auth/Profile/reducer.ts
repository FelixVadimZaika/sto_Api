import {
    ProfileActions,
    ProfileActionTypes,
    ProfileState
} from "./types";

const initialState: ProfileState = {
    profile: {
        name: "",
        email:  "",
    }    
}

export const profileReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type) {
        case ProfileActionTypes.GET_PROFILE:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}