import { Dispatch } from "react";
import http from "../../http_common";
import { ProductActions, IProductsModel, ProductsActionTypes } from "./types";

export const fetchProducts = () => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            let response = await http.get<IProductsModel>("api/products");
            const { data } = response.data;
            dispatch({
                type: ProductsActionTypes.FETCH_PRODUCTS,
                payload: data,
            });
            return Promise.resolve(data);
        } catch (ex) {
            console.log("Problem fetch");
            return Promise.reject();
        }
    };
};