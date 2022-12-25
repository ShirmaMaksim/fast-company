import React from "react";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";
import _ from "lodash";
import { useComments } from "../../../hooks/useComments";

const Comments = () => {
    const { comments, createComment, removeComment } = useComments();
    const handleRemoveComment = (id) => {
        removeComment(id);
    };
    const handleSubmit = (data) => {
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments(prevState => ([...prevState, data])));
        createComment(data);
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
