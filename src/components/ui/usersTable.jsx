import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import _ from "lodash";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            active: false,
            component: (user) => (
                <Link to={ `users/${user._id}` }>
                    { user.name }
                </Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => (
                <Qualities qualities={ user.qualities } />
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

    const handleRenderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };

    return (
        <Table
            onSort={ onSort }
            selectedSort={ selectedSort }
            columns={ columns }
            data={ users }
            onRenderContent={ handleRenderContent }
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
