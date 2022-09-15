import React from "react";

const Qualities = ({ qualities }) => {
    return (
        <>
            {qualities.map(quality => <span className={`badge bg-${quality.color} mx-1`} key={quality._id}>{ quality.name }</span>)}
        </>

    )
};

export default Qualities;