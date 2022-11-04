import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validation/validator";
import { validatorConfig } from "../../utils/validation/validatorConfig";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSumbit = (e) => {
        e.preventDefault();
        const isValide = validate();
        if (!isValide) return;
        console.log(data);
    };

    return (
        <form onSubmit={ handleSumbit }>
            <TextField
                label="email"
                name="email"
                value={ data.email }
                onChange={ handleChange }
                error={ errors.email }
            />
            <TextField
                label="password"
                type="password"
                name="password"
                value={ data.password }
                onChange={ handleChange }
                error={ errors.password }
            />
            <CheckBoxField
                name="stayOn"
                value={ data.stayOn }
                onChange={ handleChange }
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                disabled={ !isValid }
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
