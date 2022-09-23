import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <span
                    className={`badge bg-${quality.color} mx-1`}
                    key={quality._id}
                >
                    {quality.name}
                </span>
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Qualities;
