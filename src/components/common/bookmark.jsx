import React from "react";

const Bookmark = () => {
    const getClasses = () => {
        const active = false;
        let className = "bi bi-bookmark";
        return (className += active ? "-fill" : "");
    };

    return (
        <div>
            <i className={ getClasses() }></i>
        </div>
    );
};

export default Bookmark;
