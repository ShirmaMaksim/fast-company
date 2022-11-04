import React from "react";
import PropTypes from "prop-types";
import { convertObjToArr } from "../../../utils/convertObjectToArray";

const TextField = ({ label, name, value, onChange, defaultOption, options, error }) => {
    // const optionsArray = !Array.isArray(options) && typeof options === "object"
    //     ? Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName]._id }))
    //     : options;
    const optionsArray = convertObjToArr(options, "name", "value");
    const getClasses = error ? " is-invalid" : "";
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label className="form-label" htmlFor={ name }>
                { label }
            </label>
            <select
                className={`form-select ${getClasses}`}
                id={ name }
                name={ name }
                value={ value }
                onChange={ handleChange }
            >
                <option disabled value="">{ defaultOption }</option>
                { optionsArray &&
                    optionsArray.map(option => (
                        <option
                            key={ option.value }
                            value={ option.value }
                            name={ option.name }
                        >
                            { option.name }
                        </option>
                    )) }
            </select>
            { error && <div className="invalid-feedback">{ error }</div> }
        </div>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};

export default TextField;
