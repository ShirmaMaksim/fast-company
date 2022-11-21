import React from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
            </Switch>
        </>
    );
};

export default App;
