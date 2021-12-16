import { combineReducers } from "redux";
import { authReducer } from "../../view/Auth/Login/reduser";
import { regiserReducer } from "../../view/Auth/Register/reduser";
import { profileReducer } from "../../view/Auth/Profile/reducer";
import { productsReducer } from "../../view/Product/reducer";

export const rootReducer = combineReducers({
    login: authReducer,
    regiser: regiserReducer,
    profile: profileReducer,
    product: productsReducer
});

export type RootState = ReturnType<typeof rootReducer>;