import { Dispatch } from "react";

import http from "../../http_common";

import {
    IGetProductModel,
    IProductModel,
    IProductsModel,
    IAddProductModel,
    IProductSearch,
    ProductActions,
    ProductsActionTypes,
} from "./types";

export const GetProduct = (idProduct: string | null) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            let response = await http.get<IGetProductModel>(`api/products/${idProduct}`);
            const { data } = response.data;
            
            dispatch({
                type: ProductsActionTypes.GET_PRODUCT,
                payload: {data: data},
            });

            return Promise.resolve();
        }
        catch (ex) {
            console.log("Problem get");
            return Promise.reject(ex)
        }
    }
}

export const GetProducts = (search: IProductSearch) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            let response = await http.get<IProductsModel>("api/products", { params: search });
            const { data, last_page } = response.data;

            dispatch({
                type: ProductsActionTypes.GET_PRODUCTS,
                payload: {
                    data: data,
                    last_page: last_page
                },
            });

            return Promise.resolve();
        } catch (ex) {
            console.log("Problem get");
            return Promise.reject();
        }
    };
};

export const AddProduct = (data: IAddProductModel, file: File) => {
    return async () => {
        try {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("detail", data.detail);
            formData.append("file", file);

            await http.post("api/products", formData);

            return Promise.resolve();
        } catch (ex) {
            console.log("Problem add product");
            return Promise.reject();
        }
    }
}

export const EditProduct = (data: IProductModel) => {
    return async () => {
        try {
            await http.put<IProductModel>(`api/products/${data.id}`, data);
            return Promise.resolve();
        } catch (ex) {
            console.log("Problem edit product");
            return Promise.reject();
        }
    }
}

export const DeleteProduct = (id: number) => {
    return async () => {
        try {
            await http.delete(`api/products/${id}`);
            return Promise.resolve();
        } catch (ex) {
            console.log("Problem delete product");
            return Promise.reject();
        }
    }
}