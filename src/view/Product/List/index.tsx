import qs from "qs";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import {
    IProductSearch,
    ProductServerError
} from "../types";

const ProductsList: React.FC = () => {

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [detail, setDetail] = useState<string>("");


    const [invalid, setInvalid] = useState<string>("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const { GetProducts, DeleteProduct } = useActions();
    const { products, last_page } = useTypedSelector((store) => store.product);

    let [search, setSearch] = useState<IProductSearch>({
        page: searchParams.get("page"),
        id: searchParams.get("id"),
        name: searchParams.get("name"),
        detail: searchParams.get("detail"),
    });

    const buttons = [];
    for (var i = 1; i <= last_page; i++) {
        buttons.push(i);
    }

    useEffect(() => {
        async function getProducts() {
            await GetProducts(search);
        }
        getProducts();
    }, [search]);

    const onDeleteProduct = async (id: number) => {
        try {
            await DeleteProduct(id);
            GetProducts(search)
        } catch (ex) {
            const serverErrors = ex as ProductServerError;

            if (serverErrors.error) {
                setInvalid(serverErrors.error);
            }
        }
    }

    const onGetId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.value;
        setId(id);
    }

    const onGetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setName(name);
    }

    const onGetDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const detail = e.target.value;
        setDetail(detail);
    }

    const data: IProductSearch = { ...search, id, name, detail };

    return (
        <>
            <h1>Product</h1>
            <div className="row">
                <div className="col-9">
                    <div className="card mt-3">
                        <div className="card-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: "5%" }}>Id</th>
                                        <th scope="col" style={{ width: "30%" }}>Name</th>
                                        <th scope="col" style={{ width: "50%" }}>Details</th>
                                        <th scope="col" style={{ width: "15%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <th className="align-middle" scope="row">{item.id}</th>
                                                <td className="align-middle">{item.name}</td>
                                                <td className="align-middle">{item.detail}</td>
                                                <td className="align-middle">
                                                    <ul className="nav">
                                                        <li className="nav-item">
                                                            <Link className="nav-link p-1" to={"/products/edit-product?id=" + item.id}>
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="nav-link p-1" to="#" onClick={() => onDeleteProduct(item.id)}>
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="text-end">
                                {buttons.map((item, key) => {
                                    const data: IProductSearch = { ...search, page: item };
                                    return (
                                        <Link
                                            onClick={() => { setSearch(data); }}
                                            key={key}
                                            to={"?" + qs.stringify(data)}
                                            className="btn btn-primary mx-1">
                                            {item}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card mt-3">
                        <div className="card-body">
                            <Link className="btn btn-primary w-100" to="/products/add-product">Add Product</Link>
                        </div>
                        <div className="card-body">
                            <div className="form-group mb-3">
                                <label htmlFor="id" className="form-label">Id</label>
                                <input type="text" name="id" className="form-control" id="id" onChange={onGetId} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" id="name" onChange={onGetName} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="detail" className="form-label">Detail</label>
                                <input type="text" name="detail" className="form-control" id="detail" onChange={onGetDetail} />
                            </div>
                            <Link
                                onClick={() => { setSearch(data); }}
                                to={"?" + qs.stringify(data)}
                                className="btn btn-primary mx-1">
                                Search
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsList;