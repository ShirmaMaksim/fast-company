import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import _ from "lodash";
import Profession from "./profession";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={ `users/${user._id}` }>
                    { user.name }
                </Link>
            )
        },
        qualities: { name: "Качества", component: (user) => (<Qualities qualitiesId={ user.qualities } />) },
        professions: { name: "Проффессия", component: (user) => (<Profession id={ user.profession } />) },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <button onClick={ () => onToggleBookMark(user._id) }>
                    <Bookmark />
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
