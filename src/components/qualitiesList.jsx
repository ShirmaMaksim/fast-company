import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            { qualities.map((qual) => (
                <Quality key={ qual._id } qual={ qual } />
            )) }
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default QualitiesList;
