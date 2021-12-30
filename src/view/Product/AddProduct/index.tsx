import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider, FormikHelpers } from 'formik';

import { useActions } from "../../../hooks/useActions";
import { validationFields } from '../validation';
import { IAddProductModel, ProductServerError } from "../types";

import InputGroup from "../../../components/InputGroup";

const AddProduct: React.FC = () => {
    const { AddProduct } = useActions();

    const [file, setFile] = useState<File>()

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<string>("");
    const navigator = useNavigate();

    const initialValues: IAddProductModel = {
        name: '',
        detail: '',
    };

    const onHandleSubmit = async (values: IAddProductModel, { setFieldError }: FormikHelpers<IAddProductModel>) => {
        try {
            setIsSubmit(true);

            if (file)
                await AddProduct(values, file);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        setFile(e.target.files![0]);

        if (file)
            setFile(file[0]);

        return;
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationFields,
        onSubmit: onHandleSubmit
    });

    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <>
            <FormikProvider value={formik}  >
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
                                        <button type="submit" className="btn btn-primary float-right" disabled={isSubmit}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="card mb-3">
                                <div className="card-header">Image</div>
                                <div className="card-body text-center">
                                    <label className="mb-3" htmlFor="file">
                                        <img
                                            className="img-fluid"
                                            style={{ height: "300px" }}
                                            src="https://cdn-icons.flaticon.com/png/512/4131/premium/4131658.png?token=exp=1640017646~hmac=ec57439c77064ed3a9e3ee7b5fa62958" />
                                    </label >
                                    <input className="form-control" id="file" name="file" type="file" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </>
    );
};

export default AddProduct;