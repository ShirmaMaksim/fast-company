import React from "react";
import { TextField, RadioField, SelectField, MultySelectField, CheckBoxField } from "../common/form/fields";
import FormComponent from "../common/form";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const history = useHistory();
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const qualitiesList = qualities.map(quality => ({ label: quality.name, value: quality._id }));
    const professionsList = professions.map(profession => ({ label: profession.name, value: profession._id }));

    const { signUp } = useAuth();

    const handleSubmit = async(data) => {
        const newData = {
            ...data,
            qualities: data.qualities.map(quality => (quality.value))
        };
        try {
            await signUp(newData);
            history.push("/");
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
            <TextField
                label="Имя"
                name="name"
            />
            <SelectField
                label="Профессия"
                name="profession"
                options={ professionsList }
            />
            <RadioField
                label="Пол"
                name="sex"
                options={ [
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ] }
            />
            <MultySelectField
                label="Качества"
                name="qualities"
                options={ qualitiesList }
            />
            <CheckBoxField
                name="licence"
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
            >
                Sign Up
            </button>
        </FormComponent>
    );
};

export default RegisterForm;
