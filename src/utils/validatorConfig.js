export const validatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Email введён некорректно"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        },
        isCapitalSymbol: {
            message: "Пароль должен содержать хотя-бы одну заглавную букву"
        },
        isContainDigit: {
            message: "Пароль должен содержать хотя-бы одно число"
        },
        min: {
            message: "Пароль должен состоять минимум из 8 символов",
            length: 8
        }
    }
};
