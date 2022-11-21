import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
    return comments.map(comment => (
        <Comment key={ comment._id } comment={ comment } onRemove={ onRemove } />
    ));
};

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    onRemove: PropTypes.func
};

export default CommentsList;
