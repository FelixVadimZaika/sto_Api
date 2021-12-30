export enum ProductsActionTypes {
    GET_PRODUCT = "GET_PRODUCT",
    GET_PRODUCTS = "GET_PRODUCTS",
    ADD_PRODUCT = "ADD_PRODUCT",
    EDIT_PRODUCT = "EDIT_PRODUCT",
    DELETE_PRODUCT = "DELETE_PRODUCT",
}

export interface IProductModel {
    id: number;
    name: string;
    detail: string;
    image: string;
}

export interface IAddProductModel {
    name: string;
    detail: string;
}

export interface IGetProductModel {
    data: IProductModel;
}

export interface IProductsModel {
    data: Array<IProductModel>;
    last_page: number;
}

export interface IProductSearch {
    page?: null | number | string,
    id?: null | number | string,
    name?: null | string,
    detail?: null | string
}

export interface ProductServerError {
    status: number,
    error: string
}

export interface ProductsState {
    currentProduct: IProductModel,
    products: Array<IProductModel>,
    last_page: number
}

export interface GetProductAction {
    type: ProductsActionTypes.GET_PRODUCT,
    payload: IGetProductModel
}

export interface GetProductsAction {
    type: ProductsActionTypes.GET_PRODUCTS,
    payload: IProductsModel
}

export interface AddProductAction {
    type: ProductsActionTypes.ADD_PRODUCT,
    payload: IAddProductModel
}

export interface EditProductAction {
    type: ProductsActionTypes.EDIT_PRODUCT,
    payload: IProductModel
}

export type ProductActions = GetProductAction | GetProductsAction | AddProductAction | EditProductAction;