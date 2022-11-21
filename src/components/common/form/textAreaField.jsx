import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ name, label, rows, value, onChange, error, ...rest }) => {
    const getClasses = error ? " is-invalid" : "";
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4 ">
            <label htmlFor={ name }>{ label }</label>
            <div className="has-validation">
                <textarea
                    placeholder="Leave a comment here"
                    rows={ rows }
                    id={ name }
                    name={ name }
                    value={ value }
                    onChange={ handleChange }
                    className={ `form-control ${getClasses}` }
                    {...rest}
                />
                {error && <div className="invalid-feedback">{ error }</div>}
            </div>
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    rows: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default React.memo(TextAreaField);
