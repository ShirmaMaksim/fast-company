import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";
import _ from "lodash";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then(data => setComments(data));
    }, [userId]);
    const handleRemoveComment = (id) => {
        api.comments.remove(id).then(id => {
            setComments(comments.filter(comment => comment._id !== id));
        });
    };
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments(prevState => ([...prevState, data])));
    };
    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <h1 className="m-2">New comment</h1>
                <div className="card-body ">
                    <AddCommentForm onSubmit={ handleSubmit } />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList
                        comments={ sortedComments }
                        onRemove={ handleRemoveComment }
                    />
                </div>
            </div>
        </>
    );
};

export default Comments;
