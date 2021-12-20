import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider, FormikHelpers } from 'formik';

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { validationFields } from '../validation';
import { IProductModel, ProductServerError } from "../types";

import InputGroup from "../../../components/InputGroup";

const EditProduct: React.FC = () => {
    const { GetProduct, EditProduct } = useActions();

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<string>("");

    const { currentProduct } = useTypedSelector((store) => store.product);

    const navigator = useNavigate();

    const initialValues: IProductModel = {
        id: currentProduct.id,
        name: currentProduct.name,
        detail: currentProduct.detail
    }

    useEffect(() => {
        async function getProduct() {
            const params = new URLSearchParams(window.location.search);
            let id = params.get("id");

            await GetProduct(id);
        }
        getProduct();
    }, []);

    const onHandleSubmit = async (values: IProductModel, { setFieldError }: FormikHelpers<IProductModel>) => {
        try {
            setIsSubmit(true);

            await EditProduct(values);

            setIsSubmit(false);
            navigator("/products/list");
        } catch (ex) {
            const serverErrors = ex as ProductServerError;

            Object.entries(serverErrors).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    let message = "";
                    value.forEach((item) => {
                        message += `${item} `;
                    });
                    setFieldError(key, message);
                }
            });

            if (serverErrors.error) {
                setInvalid(serverErrors.error);
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationFields,
        onSubmit: onHandleSubmit
    });

    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <>
            <FormikProvider value={formik} >
                <Form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-7">
                            <div className="card mb-3">
                                <div className="card-header">General</div>
                                <div className="card-body">
                                    {invalid && <div className="alert alert-danger">{invalid}</div>}
                                    <InputGroup
                                        label="Name"
                                        field="name"
                                        type="text"
                                        error={errors.name}
                                        touched={touched.name}
                                        onChange={handleChange} />
                                    <InputGroup
                                        label="Detail"
                                        field="detail"
                                        type="text"
                                        error={errors.detail}
                                        touched={touched.detail}
                                        onChange={handleChange} />
                                    <div className="col-12">
                                        <a type="submit" className="btn btn-secondary" href="/products/list">Back</a>
                                        <button type="submit" className="btn btn-primary float-right" disabled={isSubmit}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </>
    );
};

export default EditProduct;