import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import UsersList from "../components/usersList";
import UserPage from "../components/userPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [user, setUser] = useState();

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const handleToggleBookMark = (id) => {
        setUsers((prevState) =>
            prevState.map((item) => {
                if (item._id === id) {
                    return { ...item, bookmark: !item.bookmark };
                }
                return item;
            })
        );
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handleSort = item => {
        setSortBy(item);
    };

    const handleClearFilter = () => {
        setSelectedProf();
    };

    useEffect(() => {
        api.users
            .fetchAll()
            .then(data => setUsers(data));
    }, []);

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(data => setProfessions(Object.assign(data)));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        setUser();
        api.users
            .getById(userId)
            .then(data => setUser(Object.assign(data)));
    }, [userId]);

    return (
        <>
            { userId
                ? (user ? <UserPage user={ user } /> : <h1>Loading...</h1>)
                : (users && professions && <UsersList
                    currentPage={ currentPage }
                    professions={ professions }
                    selectedProf={ selectedProf }
                    sortBy={ sortBy }
                    users={ users }
                    onDelete={ handleDelete }
                    onToggleBookMark={ handleToggleBookMark }
                    onPageChange={ handlePageChange }
                    onProfessionSelect={ handleProfessionSelect }
                    onSort={ handleSort }
                    onClearFilter={ handleClearFilter }
                />) }
        </>
    );
};

export default Users;
