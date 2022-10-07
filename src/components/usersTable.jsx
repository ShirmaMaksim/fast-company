import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя", active: false },
        qualities: {
            name: "Качества",
            component: (user) => (
                <QualitiesList qualities={ user.qualities } />
            ),
            active: false
        },
        professions: { path: "profession.name", name: "Проффессия", active: false },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз", active: false },
        rate: { path: "rate", name: "Оценка", active: false },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <button onClick={ () => onToggleBookMark(user._id) }>
                    <Bookmark
                        active={ user.bookmark }
                    />
                </button>
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={ () => onDelete(user._id) }
                >
                    Delete
                </button>
            )
        }
    };

    return (
        <Table
            onSort={ onSort }
            selectedSort={ selectedSort }
            columns={ columns }
            data={ users }
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
