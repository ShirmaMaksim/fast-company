import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { convertObjToArr } from "../../../utils/convertObjectToArray";

const MultySelectField = ({ label, name, onChange, options, value, error }) => {
    const optionsArray = convertObjToArr(options, "label", "value");

    const handleChange = (value) => {
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
                value={ value }
                options={ optionsArray }
                className="basic-multi-select"
                classNamePrefix="select"
                name={ name }
                onChange={ handleChange }
            />
            { error && <p className="text-danger" style={{ "font-size": "14px" }}>{ error }</p> }
        </div>
    );
};

MultySelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    error: PropTypes.string
};

export default React.memo(MultySelectField);
