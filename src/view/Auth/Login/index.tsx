import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider, FormikHelpers } from 'formik';

import { useActions } from "../../../hooks/useActions";
import { validationFields } from './validation';
import { ILoginModel, LoginServerError } from "./types";

import InputGroup from "../../../components/InputGroup";

const Login: React.FC = () => {
    const { LoginUser } = useActions();

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<string>("");
    const navigator = useNavigate();

    const initialValues: ILoginModel = {
        email: '',
        password: ''
    };

    const onHandleSubmit = async (values: ILoginModel, { setFieldError }: FormikHelpers<ILoginModel>) => {
        try {
            setIsSubmit(true);

            await LoginUser(values);

            setIsSubmit(false);
            navigator("/");
        } catch (ex) {
            const serverErrors = ex as LoginServerError;

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
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationFields,
        onSubmit: onHandleSubmit
    });

    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <>
            <h1>Login</h1>
            <FormikProvider value={formik} >
                <Form onSubmit={handleSubmit}>
                    {invalid && <div className="alert alert-danger">{invalid}</div>}
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
                    <button 
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmit}>
                        Login
                    </button>
                </Form>
            </FormikProvider>
        </>
    )
}

export default Login;