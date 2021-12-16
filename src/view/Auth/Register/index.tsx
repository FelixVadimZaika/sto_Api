import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider, FormikHelpers } from 'formik';

import { useActions } from "../../../hooks/useActions";
import { validationFields } from './validation';
import { IRegisterModel, RegisterServerError } from "./types";

import InputGroup from "../../../components/InputGroup";

const Register: React.FC = () => {
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
        </>
    )
}

export default Register;