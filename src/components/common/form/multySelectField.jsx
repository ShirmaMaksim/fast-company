import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { convertObjToArr } from "../../../utils/convertObjectToArray";

const MultySelectField = ({ label, name, onChange, options, defaultValue }) => {
    const optionsArray = convertObjToArr(options, "label", "value");

    const handleChange = value => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">
                { label }
            </label>
            <Select
                closeMenuOnSelect={ false }
                isMulti
                defaultValue={ defaultValue }
                options={ optionsArray }
                className="basic-multi-select"
                classNamePrefix="select"
                name={ name }
                onChange={ handleChange }
            />
        </div>
    );
};

MultySelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultValue: PropTypes.array
};

export default MultySelectField;
