import * as Yup from 'yup';

export const validationFields = () => {
    return Yup.object({
        email: Yup.string()
            .email('Invalid Email.')
            .required("Enter the mail."),

        password: Yup.string()
            .required('Enter the password.')
            .min(5, 'Password must contain at least 5 characters.')
            .matches(/[a-zA-Z]/, 'The password must contain Latin characters.'),
    });
};