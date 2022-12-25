import React from "react";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const Qualities = () => {
    const { currentUser } = useAuth();
    const { qualities, isLoading } = useQualities();
    const sortedQualities = [];
    currentUser.qualities.forEach(id => {
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

export default Qualities;
