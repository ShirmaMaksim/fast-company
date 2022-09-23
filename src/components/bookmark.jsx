import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ active }) => {
    const getClasses = () => {
        let className = "bi bi-bookmark";
        return (className += active ? "-fill" : "");
    };

    return (
        <div>
            <i className={getClasses()}></i>
        </div>
    );
};

Bookmark.propTypes = {
    active: PropTypes.bool.isRequired
};

export default Bookmark;
