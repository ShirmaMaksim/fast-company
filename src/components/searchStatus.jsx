import React from "react";

const SearchStatus = ({ number }) => {

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };

    const getClasses = () =>  {
        let className = "fs-4 badge bg-"
        return className += number === 0 ? "danger" : "primary"
    };

    return (
        <div>
            <span className={ getClasses() }>{ number } { renderPhrase(number) } с тобой сегодня</span>
        </div>
    );
};

export default SearchStatus;