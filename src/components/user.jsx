import React from "react";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
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
                <QualitiesList qualities={ qualities } />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings.toString()}</td>
            <td>{rate.toString()} / 5</td>
            <td>
                <Bookmark
                    active={ bookmark }
                    onClick={() => onToggleBookMark(_id)}
                />
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
