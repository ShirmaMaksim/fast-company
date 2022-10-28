import React from "react";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import _ from "lodash";
import SearchString from "./searchString";

const UsersList = ({
    currentPage,
    professions,
    selectedProf,
    sortBy,
    users,
    searchStringValue,
    onDelete,
    onToggleBookMark,
    onPageChange,
    onProfessionSelect,
    onSort,
    onClearFilter,
    onSearchStringChange
}) => {
    const pageSize = 4;

    if (users) {
        const filteredUsers = searchStringValue
            ? (users.filter(user => user.name.includes(searchStringValue)))
            : (selectedProf ? users.filter(user => Object.keys(user.profession).every(key => user.profession[key] === selectedProf[key])) : users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        return (
            <div className="d-flex">
                { professions &&
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={ selectedProf }
                            items={ professions }
                            onItemSelect={ onProfessionSelect }
                        />
                        <button className="btn btn-secondary m-2" onClick={ onClearFilter }>Очистить</button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <SearchStatus number={count} />
                    <SearchString value={ searchStringValue } onChange={ onSearchStringChange } />
                    { count !== 0 &&
                        <UsersTable
                            users={ userCrop }
                            onSort={ onSort }
                            selectedSort={ sortBy }
                            onDelete={ onDelete }
                            onToggleBookMark={ onToggleBookMark }
                        />
                    }
                    { filteredUsers.length > pageSize &&
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={ count }
                                pageSize={ pageSize }
                                currentPage={ currentPage }
                                onPageChange={ onPageChange }
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
    return (
        <div>loading...</div>
    );
};

UsersList.propTypes = {
    currentPage: PropTypes.number.isRequired,
    professions: PropTypes.object.isRequired,
    selectedProf: PropTypes.object,
    sortBy: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchStringValue: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onProfessionSelect: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    onSearchStringChange: PropTypes.func
};

export default UsersList;
