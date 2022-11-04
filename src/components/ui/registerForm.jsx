import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { validator } from "../../utils/validation/validator";
import { validatorConfig } from "../../utils/validation/validatorConfig";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
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
            <SelectField
                label="Выберите вашу профессию"
                value={ data.profession }
                name="profession"
                onChange={ handleChange }
                defaultOption="Выберите профессию..."
                options={ professions }
                error={ errors.profession }
            />
            <RadioField
                label="Выберите пол"
                value={ data.sex }
                name="sex"
                onChange={ handleChange }
                options={ [
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ] }
            />
            <MultySelectField
                label="Выберите ваши качества"
                options={ qualities }
                onChange={ handleChange }
                defaultValue={ data.qualities }
                name="qualities"
            />
            <CheckBoxField
                name="licence"
                value={ data.licence }
                onChange={ handleChange }
                error={ errors.licence }
            >
                Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
