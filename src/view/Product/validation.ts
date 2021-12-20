import * as Yup from 'yup';

export const validationFields = () => {
    return Yup.object({
        name: Yup.string()
            .required("Enter the name."),

        detail: Yup.string()
            .required("Enter the detail."),
    });
};