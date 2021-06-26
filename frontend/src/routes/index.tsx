import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotAuthorized from '../pages/NotAuthorized';
import NotFound from '../pages/NotFound';


const Routes: React.FC = () => {

    const [isAutheticated, setIsAutheticated] = useState(false);

    useEffect(() => {
        const isAuth = JSON.parse(localStorage.getItem("@isAutenticate"));

        if (isAuth && isAuth.autheticated === "autheticated")
            setIsAutheticated(true);
    }, []);

    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={isAutheticated ? Home : NotAuthorized} />
            <Route exact path="/not_found" component={NotFound} />
            <Redirect from="*" to="/not_found" />
        </Switch>
    );
}

export default Routes;