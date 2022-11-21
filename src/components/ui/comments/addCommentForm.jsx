import React, { useState, useEffect } from "react";
import FormComponent, { SelectField, TextAreaField } from "../../common/form";
import api from "../../../api";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    });
    const arrayOfUsers = users && Object.keys(users).map(userId => ({
        name: users[userId].name,
        value: users[userId]._id
    }));
    return (
        <FormComponent
            onSubmit={ onSubmit }
        >
            <SelectField
                label="Выберите пользователя"
                name="userId"
                defaultOption="Выберите пользователя"
                options={ arrayOfUsers }
            />
            <TextAreaField
                label="Комментарий"
                name="content"
                rows={ 3 }
            />
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
            >
                Опубликовать
            </button>
        </FormComponent>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
