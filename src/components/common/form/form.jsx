import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validation/validator";
import { validatorConfig } from "../../../utils/validation/validatorConfig";

const FormComponent = ({ children, onSubmit, defaultData }) => {
    const [data, setData] = useState(defaultData
        ? { ...defaultData }
        : {}
    );
    const [errors, setErrors] = useState({});

    const validate = useCallback((data) => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [validatorConfig, setErrors]);
    const isValid = Object.keys(data).length === (children.length - 1) &&
        Object.keys(errors).length === 0;

    const handleChange = useCallback(({ name, value }) => {
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, [setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData(defaultData
            ? { ...defaultData }
            : {});
        setErrors({});
    };

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate(data);
        }
    }, [data]);

    const clonedElements = React.Children.map(children, (child) => {
        const childType = typeof child.type;
        let config = {};
        if (childType === "object") {
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name]
            };
        }
        if (childType === "string") {
            if (child.type === "button") {
                if (child.props.type === "submit" || child.props.type === undefined) {
                    config = {
                        ...child.props,
                        disabled: !isValid,
                        onClick: handleSubmit
                    };
                }
            }
        }
        return React.cloneElement(child, config);
    });
    return (
        <form>
            { clonedElements }
        </form>
    );
};

FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onSubmit: PropTypes.func,
    defaultData: PropTypes.object
};

export default FormComponent;
