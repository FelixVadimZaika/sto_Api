import {
    ProductActions,
    ProductsActionTypes,
    ProductsState,
} from './types';

const initialState: ProductsState = {
    currentProduct: {
        id: 0,
        name: "",
        detail: "",
        image: ""
    },
    products: [],
    last_page: 0,
}

export const productsReducer = (state = initialState, action: ProductActions) => {
    switch (action.type) {
        case ProductsActionTypes.GET_PRODUCT:
            return {
                ...state,
                currentProduct: {
                    id: action.payload.data.id,
                    name: action.payload.data.name,
                    detail: action.payload.data.detail,
                    image: action.payload.data.image,
                }
            };
        case ProductsActionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.data,
                last_page: action.payload.last_page
            };
        case ProductsActionTypes.ADD_PRODUCT:
            return {
                ...state,
                ...action.payload
            };
        case ProductsActionTypes.EDIT_PRODUCT:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}