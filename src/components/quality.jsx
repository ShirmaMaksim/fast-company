import React from "react";
import PropTypes from "prop-types";

const Quality = ({ qual }) => {
    return (
        <span
            className={`badge bg-${qual.color} mx-1`}
            key={ qual._id }
        >
            { qual.name }
        </span>
    );
};

Quality.propTypes = {
    qual: PropTypes.object.isRequired
};

export default Quality;
