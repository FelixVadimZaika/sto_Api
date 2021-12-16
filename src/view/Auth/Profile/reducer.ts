import {
    ProfileActions,
    ProfileActionTypes,
    ProfileState
} from "./types";

const initialState: ProfileState = {
    profile: {
        id: 0,
        name: "",
        email:  "",
        emailVerifiedAt:  "",
        createdAt:  "",
        updatedAt:  "",
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