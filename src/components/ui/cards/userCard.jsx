import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UserCard = ({ user }) => {
    const { currentUser } = useAuth();
    const { isLoading: professionsLoading, professions } = useProfessions();
    return (
        <div className="card mb-3">
            <div className="card-body">
                { currentUser._id === user._id && <Link to={ `${currentUser._id}/edit` }>
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                        <i className="bi bi-gear"></i>
                    </button>
                </Link>}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={ user.image }
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        height="150"
                    />
                    <div className="mt-3">
                        <h4>{ user.name }</h4>
                        <p className="text-secondary mb-1">
                            { professions && !professionsLoading
                                ? professions.find(prof => prof._id === user.profession).name
                                : "Loading..."
                            }
                        </p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                            <span className="ms-2">{ user.rate }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
