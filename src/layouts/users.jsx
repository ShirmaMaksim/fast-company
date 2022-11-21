import React from "react";
import { useParams, useHistory } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const history = useHistory();
    const handleBack = () => {
        history.push(`/users/${userId}`);
    };
    return (
        <div className="container">
            { userId
                ? (edit
                    ? <div>
                        <button className="btn btn-info position-absolute top-10 start-0" onClick={ handleBack }>
                                Назад
                        </button>
                        <div className="row">
                            <div className=".col-md-6 .offset-md-3 shadow p-4">
                                <EditUserPage userId={ userId } />
                            </div>
                        </div>
                    </div>
                    : <div className="row gutters-sm">
                        <UserPage userId={ userId } />
                    </div>)
                : <UsersListPage />
            }
        </div>
    );
};

export default Users;
