import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Comments from "../../ui/comments/comments";
import { UserCard, QualitiesCard, MeetingsCard } from "../../ui/cards";

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
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={ user } />
                        <QualitiesCard qualities={ user.qualities } />
                        <MeetingsCard completedMeetings={ user.completedMeetings } />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
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
