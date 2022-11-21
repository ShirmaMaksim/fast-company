import React, { useState, useEffect } from "react";
import { TextField, RadioField, SelectField, MultySelectField, CheckBoxField } from "../common/form/fields";
import api from "../../api";
import FormComponent from "../common/form";

const RegisterForm = () => {
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(data => setProfessions(Object.assign(data)));
        api.qualities
            .fetchAll()
            .then(data => setQualities(Object.assign(data)));
    }, []);

    const handleSubmit = (data) => {
        console.log(data);
        // Обратотка Data и добавление её в local.storage
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
                options={ professions }
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
                options={ qualities }
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
                Сохранить
            </button>
        </FormComponent>
    );
};

export default RegisterForm;
