import React, { useState, useEffect } from "react";
import { RadioField, SelectField, TextField, MultySelectField } from "../../common/form/fields";
import api from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import FormComponent from "../../common/form";

const EditUserPage = ({ userId }) => {
    const history = useHistory();
    const [data, setData] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        api.users
            .getById(userId)
            .then((data) =>
                setData(() => ({
                    name: data.name,
                    email: data.email,
                    profession: data.profession._id,
                    sex: data.sex,
                    qualities: data.qualities.map(qualy => ({ label: qualy.name, value: qualy._id }))
                }))
            );
        api.professions
            .fetchAll()
            .then(data => setProfessions(Object.assign(data)));
        api.qualities
            .fetchAll()
            .then(data => setQualities(Object.assign(data)));
    }, [userId]);

    const getProfessionsById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesArray.push(qualities[qualy]);
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (data) => {
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionsById(profession),
                qualities: getQualities(qualities)
            })
            .then(data => history.push(`/users/${data._id}`));
    };

    useEffect(() => {
        if (Object.keys(data).length > 0) setIsLoading(false);
    }, [data]);

    return (
        <>
            { !isLoading && professions && qualities
                ? (
                    <FormComponent
                        onSubmit={ handleSubmit }
                        defaultData={ data }
                    >
                        <TextField
                            label="Имя"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            label="email"
                            name="email"
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
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </FormComponent>
                ) : (
                    <h3>Loading...</h3>
                )
            }
        </>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default React.memo(EditUserPage);
