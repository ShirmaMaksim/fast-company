import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    if (!isLoading) {
        const profession = getProfession(id);
        return <p>{ profession.name }</p>;
    }
    return "Loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
