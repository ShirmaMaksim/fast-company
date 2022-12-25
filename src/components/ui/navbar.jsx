import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const Navbar = () => {
    const { currentUser } = useAuth();
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link
                            to="/"
                            aria-current="page"
                            className="nav-link active"
                        >
                            Main
                        </Link>
                    </li>
                    { currentUser && (
                        <li className="nav-item">
                            <Link
                                to="/users"
                                aria-current="page"
                                className="nav-link"
                            >
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    { currentUser
                        ? (
                            <NavProfile />
                        ) : (
                            <Link
                                to="/login"
                                className="nav-link"
                                aria-current="page"
                            >
                                Login
                            </Link>
                        )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
