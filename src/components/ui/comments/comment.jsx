import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ comment, onRemove }) => {
    const { getUserById } = useUser();
    const commentator = getUserById(comment.userId);
    const { currentUser } = useAuth();
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={ commentator.image }
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        { commentator ? commentator.name : "Loading..." }
                                        <span className="small">
                                            {" "}- { displayDate(comment.created_at) }
                                        </span>
                                    </p>
                                    { currentUser._id === comment.userId && (
                                        <button className="btn btn-sm text-primary d-flex align-items-center" onClick={ () => onRemove(comment._id) }>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{ comment.content }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    onRemove: PropTypes.func
};

export default Comment;
