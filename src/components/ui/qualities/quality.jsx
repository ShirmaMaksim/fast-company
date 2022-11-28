import React from "react";
import PropTypes from "prop-types";

const Quality = ({ quality }) => {
    return (
        <span
            className={`badge bg-${quality.color} mx-1`}
            key={ quality._id }
        >
            { quality.name }
        </span>
    );
};

Quality.propTypes = {
    quality: PropTypes.object
};

export default Quality;
