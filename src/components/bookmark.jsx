import React from "react";

const Bookmark = ({ active }) => {

    const getClasses = () => {
        let className = "bi bi-bookmark";
        return className += active ? "-fill" : "";
    }

    return (
        <div>
            <i className={ getClasses() }></i>
        </div>
    )
};

export default Bookmark;