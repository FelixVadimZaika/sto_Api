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
    const [imageCropper, setImageCropper] = useState<Cropper>();
    const [imageSelected, setImageSelected] = useState<string>("https://cdn.picpng.com/icon/upload-files-icon-66764.png")

    const selectImage = (path: string) => {
        if (!imageCropper) {
            const image = document.getElementById("image");
            const cropper = new Cropper(image as HTMLImageElement, {
                aspectRatio: 1 / 1,
                viewMode: 1,
                dragMode: 'move',
            });
            cropper.replace(path);
            setImageCropper(cropper);
        } else {
            imageCropper.replace(path);
        }

        const modalEle = modalRef.current;
        const bsModal = new Modal(modalEle as unknown as Element, {
            backdrop: "static",
            keyboard: false,
        });
        bsModal.show();
    }

    const rotateImg = () => {
        imageCropper?.rotate(90);
    };

    const saveImage = async function () {
        const image = imageCropper?.getCroppedCanvas().toDataURL() as string;
        await setImageSelected(image);
    }

    const handleChangeImage = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList || fileList.length == 0) return;

        await selectImage(URL.createObjectURL(fileList[0]));
    }

    const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
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

            if (imageCropper) {
                const blob = b64toBlob(imageSelected, 'image/png');
                var file = new File([blob], "image");
                await RegisterUser(values, file);
            }

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
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                    {invalid && <div className="alert alert-danger">{invalid}</div>}
                    <div className="form-group text-center mb-3">
                        <label className="form-label" htmlFor="image">
                            <img src={imageSelected} className="rounded-circle" width="200px" />
                        </label>
                        <input className="form-control" type="file" name="Image" id="Image" onChange={handleChangeImage} />
                    </div>
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
                                <img id="image" src={imageSelected} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={rotateImg}>Rotate</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveImage}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;