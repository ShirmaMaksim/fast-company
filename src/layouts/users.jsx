import React from "react";
import { useParams, useHistory } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const history = useHistory();
    const handleBack = () => {
        history.push(`/users/${userId}`);
    };
    return (
        <UserProvider>
            { userId
                ? (edit
                    ? <div>
                        <button className="btn btn-info position-absolute top-10 start-0" onClick={ handleBack }>
                                Назад
                        </button>
                        <EditUserPage userId={ userId } />
                    </div>
                    : <UserPage userId={ userId } />)
                : <UsersListPage />
            }
        </UserProvider>
    );
};

export default Users;
