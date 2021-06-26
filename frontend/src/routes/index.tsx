import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotAuthorized from '../pages/NotAuthorized';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/not_authorized" component={NotAuthorized} />
            <Route exact path="/not_found" component={NotFound} />
            <Redirect from="*" to="/not_found" />
        </Switch>
    );
}

export default Routes;
