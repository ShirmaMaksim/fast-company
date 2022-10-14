import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ user }) => {
    const history = useHistory();

    const handleSaveHistory = () => {
        history.push("/userspage");
    };

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
                <button onClick={ handleSaveHistory }>Все пользователи</button>
            </>
        );
    }
    return (
        <h1>User wasn`t found</h1>
    );
};

UserPage.propTypes = {
    user: PropTypes.object
};

export default UserPage;
