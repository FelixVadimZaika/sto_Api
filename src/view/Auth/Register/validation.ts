import * as Yup from 'yup';

export const validationFields = () => {
    return Yup.object({
        name: Yup.string()
            .required("Enter the name."),

        email: Yup.string()
            .email('Invalid Email.')
            .required("Enter the mail."),

        password: Yup.string()
            .required('Enter the password.'),
            //.min(5, 'Password must contain at least 5 characters.')
            //.matches(/[a-zA-Z]/, 'The password must contain Latin characters.'),

        passwordConfirm: Yup.string()
            .required('Enter the password.')
            //.oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
};