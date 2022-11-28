import React from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";

const App = () => {
    return (
        <>
            <Navbar />
            <QualitiesProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/users/:userId?/:edit?" component={Users} />
                    </Switch>
                </ProfessionProvider>
            </QualitiesProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
