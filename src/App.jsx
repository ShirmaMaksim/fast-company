import React from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/userspage/:userId?" component={Users} />
            </Switch>
        </>
    );
};

export default App;
