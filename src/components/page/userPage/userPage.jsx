import React from "react";
import PropTypes from "prop-types";
import Comments from "../../ui/comments/comments";
import { UserCard, QualitiesCard, MeetingsCard } from "../../ui/cards";
import { useUser } from "../../../hooks/useUsers";
import CommentsProvider from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);
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
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
