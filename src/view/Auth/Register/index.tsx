import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect, useRef } from 'react';
import { Modal } from "bootstrap";
import Cropper from 'cropperjs';
import { useFormik, Form, FormikProvider, FormikHelpers } from 'formik';


import { useActions } from "../../../hooks/useActions";
import { validationFields } from './validation';
import { IRegisterModel, RegisterServerError } from "./types";

import InputGroup from "../../../components/InputGroup";

const Register: React.FC = () => {
    const modalRef = useRef(null);
    let cropper: Cropper;

    const selectImage = () => {
        const modalEle = modalRef.current;
        const bsModal = new Modal(modalEle as unknown as Element, {
            backdrop: "static",
            keyboard: false,
        });
        bsModal.show();

        const image = document.getElementById("image");
        cropper = new Cropper(image as any, {
            aspectRatio: 16 / 9,
            crop() {},
        });
    }

    const { RegisterUser } = useActions();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<string>("");
    const navigator = useNavigate();

    const initialValues: IRegisterModel = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };

    const onHandlerSubmit = async (values: IRegisterModel, { setFieldError }: FormikHelpers<IRegisterModel>) => {
        try {
            setIsSubmit(true);

            await RegisterUser(values);

            setIsSubmit(false);
            navigator("/login");

        } catch (ex) {
            const serverErrors = ex as RegisterServerError;

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

            setIsSubmit(false);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationFields,
        onSubmit: onHandlerSubmit
    });

    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <>
            <h1>Register</h1>
            <FormikProvider value={formik} >
                <Form onSubmit={handleSubmit}>
                    <button className="btn btn-primary" onClick={selectImage}>Select photo</button>
                    {invalid && <div className="alert alert-danger">{invalid}</div>}
                    <InputGroup
                        label="Name"
                        field="name"
                        type="text"
                        error={errors.name}
                        touched={touched.name}
                        onChange={handleChange} />
                    <InputGroup
                        label="Email"
                        field="email"
                        type="email"
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange} />
                    <InputGroup
                        label="Password"
                        field="password"
                        type="password"
                        error={errors.password}
                        touched={touched.password}
                        onChange={handleChange} />
                    <InputGroup
                        label="Confirm Password"
                        field="passwordConfirm"
                        type="password"
                        error={errors.passwordConfirm}
                        touched={touched.passwordConfirm}
                        onChange={handleChange} />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmit}>
                        Registration
                    </button>
                </Form>
            </FormikProvider>

            <div className="modal" ref={modalRef} tabIndex={-1}>
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <img id="image" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                cropper.rotate(90);
                            }}>
                                rotate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;