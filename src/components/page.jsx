import React, { useState } from "react";
import api from '../api/index';
import Users from './users';
import SearchStatus from "./searchStatus";

const Page = () => {

    const [ users, setUsers ] = useState(api.users.fetchAll());

    const handleDeleteUser = (userId) => {
        setUsers(prev => prev.filter(user => user._id !== userId))
    };

    const handleToggleBookMark = (id) => {
        setUsers(prevState => prevState.map(item => {
            if (item._id === id) {
                return { ...item, bookmark: !item.bookmark };
            }
            return item;
        }));
    };

    return (
        <>
            <SearchStatus number={ users.length } />
            <Users users={ users } onDeleteUser={ handleDeleteUser } onToggleBookMark={ handleToggleBookMark } />
        </>
    );
};

export default Page;