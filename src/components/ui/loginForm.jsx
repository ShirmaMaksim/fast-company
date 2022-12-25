import React from "react";
import { TextField } from "../common/form/fields";
import FormComponent from "../common/form";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();
    const { signIn } = useAuth();

    const handleSubmit = async(data) => {
        const newData = {
            email: data.email,
            password: data.password
        };
        try {
            await signIn(newData);
            history.push(history.location.state ? history.location.state.from.pathname : "/");
        } catch (error) {
            toast.error(error.email);
        }
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
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
            >
                Sign In
            </button>
        </FormComponent>
    );
};

export default LoginForm;
