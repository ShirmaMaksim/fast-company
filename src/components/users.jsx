import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "../components/searchStatus";
const Users = ({ users, onDeleteUser, onToggleBookMark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = item => {
        setSelectedProf(item);
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
    const filteredUsers = selectedProf
        ? users.filter(user => Object.keys(user.profession).every(key => user.profession[key] === selectedProf[key]))
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
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
                { count !== 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Проффессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { userCrop.map((user) => (
                                <User
                                    key={user._id}
                                    {...user}
                                    onDeleteUser={onDeleteUser}
                                    onToggleBookMark={onToggleBookMark}
                                />
                            )) }
                        </tbody>
                    </table>
                ) }
                { filteredUsers.length > pageSize &&
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                }
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteUser: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default Users;
