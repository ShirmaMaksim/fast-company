import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link to="/" className="nav-link active">Main</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/userspage" className="nav-link">Users Page</Link>
            </li>
        </ul>
    );
};

export default Navbar;
