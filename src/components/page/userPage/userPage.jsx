import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { Link } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        setUser();
        api.users
            .getById(userId)
            .then(data => setUser(Object.assign(data)));
    }, [userId]);

    if (user) {
        return (
            <>
                <h1>{ user.name }</h1>
                <h3>Профессия: { user.profession.name }</h3>
                <div>
                    { user.qualities.map(qualitiy => (
                        <span key={qualitiy._id} className={`badge bg-${qualitiy.color} mx-1`}>
                            { qualitiy.name }
                        </span>
                    )) }
                </div>
                <h3>Завершено встреч: { user.completedMeetings }</h3>
                <h3>Рейтинг: { user.rate }</h3>
                <Link to={ `${userId}/edit` }>
                    <button>Изменить</button>
                </Link>
            </>
        );
    }
    return (
        <div>Loading...</div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
