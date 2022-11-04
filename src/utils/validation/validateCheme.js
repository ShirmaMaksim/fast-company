import * as yup from "yup";

export const validateScheme = yup.object().shape({
    password: yup
        .string()
        .required("Пароль обязателен для заполнения")
        .matches(/(?=.*[A-Z])/, "Пароль должен содержать хотя-бы одну заглавную букву")
        .matches(/(?=.*[!@#$%&^*])/, "Пароль должен содержать один из специальных символов !@#$%&^*")
        .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
    email: yup
        .string()
        .required("Электронная почта обязательна для заполнения")
        .email("Email введён некорректно")
});

/**
    const validate = () => {
        validateScheme.validate(data)
            .then(() => setErrors({}))
            .catch((error) => setErrors({ [error.path]: error.message }));
        return Object.keys(errors).length === 0;
    };
 */
