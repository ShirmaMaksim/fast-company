import React from "react";
import { TextField, CheckBoxField } from "../common/form/fields";
import FormComponent from "../common/form";

const LoginForm = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <FormComponent onSubmit={ handleSubmit }>
            <TextField
                label="email"
                name="email"
            />
            <TextField
                label="password"
                type="password"
                name="password"
            />
            <CheckBoxField
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </FormComponent>
    );
};

export default LoginForm;
