import React from "react";
import { RadioField, SelectField, TextField, MultySelectField } from "../../common/form/fields";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import FormComponent from "../../common/form";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = ({ userId }) => {
    const history = useHistory();

    const { currentUser, updateUser } = useAuth();
    const { professions, isLoading: professionsLoading } = useProfessions();
    const { qualities, isLoading: qualitiesLoading } = useQualities();

    const handleSubmit = (data) => {
        updateUser({
            ...currentUser,
            ...data,
            qualities: data.qualities.map(qual => qual.value)
        });
        history.push(`/users/${currentUser._id}`);
    };

    const getCurrentUserQualities = () => {
        const currentUserQualities = qualities.filter(
            item => currentUser.qualities.find(
                qual => item._id === qual
            ));
        return currentUserQualities;
    };

    if (currentUser._id === userId) {
        return (
            <div className="container">
                <div className="row">
                    <div className=".col-md-6 .offset-md-3 shadow p-4">
                        { !professionsLoading && !qualitiesLoading
                            ? (
                                <FormComponent
                                    onSubmit={ handleSubmit }
                                    defaultData={{
                                        name: currentUser.name,
                                        email: currentUser.email,
                                        profession: currentUser.profession,
                                        sex: currentUser.sex,
                                        qualities: getCurrentUserQualities().map(qual => ({ label: qual.name, value: qual._id }))
                                    }}
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
                                        options={ professions.map(prof => ({ label: prof.name, value: prof._id })) }
                                    />
                                    <RadioField
                                        label="Пол"
                                        name="sex"
                                        options={[
                                            { name: "Male", value: "male" },
                                            { name: "Female", value: "female" },
                                            { name: "Other", value: "other" }
                                        ]}
                                    />
                                    <MultySelectField
                                        label="Качества"
                                        name="qualities"
                                        options={ qualities.map(qual => ({ label: qual.name, value: qual._id })) }
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
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <h1>This page is`t found.</h1>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default React.memo(EditUserPage);
