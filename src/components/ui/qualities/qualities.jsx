import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ qualitiesId }) => {
    const { qualities, isLoading } = useQualities();
    const sortedQualities = [];
    qualitiesId.forEach(id => {
        qualities.forEach(qualitiy => {
            if (qualitiy._id === id) {
                sortedQualities.push(qualitiy);
            }
        });
    });
    if (!isLoading) {
        return (
            <>
                { sortedQualities.map((quality) => (
                    <Quality key={ quality._id } quality={ quality } />
                )) }
            </>
        );
    }
    return "Loading...";
};

Qualities.propTypes = {
    qualitiesId: PropTypes.arrayOf(PropTypes.string)
};

export default Qualities;
