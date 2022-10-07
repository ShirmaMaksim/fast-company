import React, { useState, useEffect } from "react";
import api from "../api";
import Users from "../components/users";

const Page = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users
            .fetchAll()
            .then(data => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
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
    return (
        <>
            { users &&
                <Users
                    users={ users }
                    onDelete={ handleDelete }
                    onToggleBookMark={ handleToggleBookMark }
                />
            }
        </>
    );
};

export default Page;
