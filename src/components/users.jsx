import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "../components/searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = ({ users, onDelete, onToggleBookMark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handleSort = item => {
        setSortBy(item);
    };

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(data => setProfessions(Object.assign(data)));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const pageSize = 4;

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => Object.keys(user.profession).every(key => user.profession[key] === selectedProf[key]))
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                { professions &&
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={ selectedProf }
                            items={ professions }
                            onItemSelect={ handleProfessionSelect }
                        />
                        <button className="btn btn-secondary m-2" onClick={ clearFilter }>Очистить</button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <SearchStatus number={count} />
                    { count !== 0 &&
                        <UsersTable
                            users={ userCrop }
                            onSort={ handleSort }
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
                                onPageChange={ handlePageChange }
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

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default Users;
