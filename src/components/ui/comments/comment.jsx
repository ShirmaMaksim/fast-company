import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { displayDate } from "../../../utils/displayDate";

const Comment = ({ comment, onRemove }) => {
    const [isLoading, setIsLoading] = useState();
    const [commentator, setCommentator] = useState();
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(comment.userId).then(data => {
            setCommentator(data);
            setIsLoading(false);
        });
    }, [comment]);
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                { isLoading ? (
                    "Loading..."
                ) : (
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
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
                                        <button className="btn btn-sm text-primary d-flex align-items-center" onClick={ () => onRemove(comment._id) }>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{ comment.content }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    onRemove: PropTypes.func
};

export default Comment;
