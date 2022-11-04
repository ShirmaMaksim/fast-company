import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultySelectField from "../../common/form/multySelectField";
import api from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { convertObjToArr } from "../../../utils/convertObjectToArray";

const ChangeUserPage = ({ userId }) => {
    const history = useHistory();
    const handleSaveHistory = () => {
        history.replace(`/userspage/${userId}`);
    };

    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();

    const handleChange = ({ name, value }) => {
        const valueToSet = name === "qualities"
            ? value.map(qualitie => (convertObjToArr(qualities, "name", "value", "color")).find(value => value.value === qualitie.value))
            : (name === "profession"
                ? convertObjToArr(professions, "name", "value").find(profession => profession.value === value)
                : value);
        setData(prevState => ({
            ...prevState,
            [name]: valueToSet || "Not Assigned"
        }));
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        api.users.update(userId, data);
    };

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(data => setProfessions(Object.assign(data)));
        api.qualities
            .fetchAll()
            .then(data => setQualities(Object.assign(data)));
    }, []);

    useEffect(() => {
        api.users.update(userId, data);
    }, [data]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className=".col-md-6 .offset-md-3 shadow p-4">
                    <form onSubmit={ handleSumbit }>
                        <TextField
                            label="Имя"
                            name="name"
                            value={ data.name }
                            onChange={ handleChange }
                        />
                        <TextField
                            label="email"
                            name="email"
                            value={ data.email }
                            onChange={ handleChange }
                        />
                        <SelectField
                            label="Выберите вашу профессию"
                            value={ data.profession._id }
                            name="profession"
                            onChange={ handleChange }
                            defaultOption="Выберите профессию..."
                            options={ professions }
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
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            onClick={ handleSaveHistory }
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

ChangeUserPage.propTypes = {
    userId: PropTypes.string
};

export default ChangeUserPage;
