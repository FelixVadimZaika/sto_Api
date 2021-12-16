import { ProductActions, ProductsActionTypes, ProductsState } from './types';

const initialState: ProductsState = {
    products: []
}

export const ProductsReducer = (state = initialState, action: ProductActions) => {
    switch (action.type) {

        case ProductsActionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}