import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import ChangeUserPage from "../components/page/changeUserPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            { userId ? (edit ? <ChangeUserPage userId={ userId } /> : <UserPage userId={ userId } />) : <UsersList /> }
        </>
    );
};

export default Users;
