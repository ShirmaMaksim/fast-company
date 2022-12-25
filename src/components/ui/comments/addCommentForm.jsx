import React, { useState } from "react";
import FormComponent, { TextAreaField } from "../../common/form";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState();

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <FormComponent
            onSubmit={ onSubmit }
        >
            <TextAreaField
                onChange={handleChange}
                label="Комментарий"
                name="content"
                rows={ 3 }
                value={ data?.content || "" }
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
