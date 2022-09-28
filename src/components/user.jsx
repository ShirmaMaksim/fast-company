import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualitie";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    bookmark,
    onDeleteUser,
    onToggleBookMark
}) => {
    return (
        <tr>
            <th scope="row">{name}</th>
            <td>
                <Qualities qualities={qualities} />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings.toString()}</td>
            <td>{rate.toString()} / 5</td>
            <td>
                <button onClick={() => onToggleBookMark(_id)}>
                    <Bookmark active={bookmark} />
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDeleteUser(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
