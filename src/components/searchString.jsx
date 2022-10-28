import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ value, onChange }) => {
    return (
        <form action="" className="form-label">
            <label htmlFor="searchString"></label>
            <input
                type="text"
                id="searchString"
                name="searchString"
                value={ value }
                onChange={ onChange }
                className="form-control"
                placeholder="Поиск..."
            />
        </form>
    );
};

SearchString.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchString;
