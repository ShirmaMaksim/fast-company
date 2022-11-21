export const validatorConfig = {
    name: {
        isRequired: {
            message: "Имя обязательна для заполнения"
        }
    },
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
    },
    profession: {
        isRequired: {
            message: "Обязательно выберите вашу профессию"
        }
    },
    qualities: {
        isRequired: {
            message: "Обязательно для заполнения"
        }
    },
    licence: {
        isRequired: {
            message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
        }
    },
    content: {
        isRequired: {
            message: "Комментарий не может быть пустым"
        }
    }
};
