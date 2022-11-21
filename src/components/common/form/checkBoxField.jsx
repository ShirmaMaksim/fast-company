import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        // eslint-disable-next-line
        onChange({ name: name, value: !value });
    };
    const getClasses = error ? " is-invalid" : "";
    return (
        <div className="form-check mb-4">
            <input
                className={ "form-check-input" + getClasses }
                type="checkbox"
                value=""
                id={ name }
                onChange={ handleChange }
                checked={ value }
            />
            <label className="form-check-label" htmlFor={ name }>
                { children }
            </label>
            { error && <div className="invalid-feedback">{ error }</div> }
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
};

export default React.memo(CheckBoxField);
