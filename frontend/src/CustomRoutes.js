import React from "react";
import { Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { useVerifyPublicRoute, useVerifyPrivateRoute } from "./Api";

//Functions for providing protected frontend routing

//review-cycle-1: everything looks same in both PublicRoute and PrivateRoute component. Just use a sinlgle component with type param
export const PublicRoute = ({ component: Component, ...rest }) => { // Creates a public route which first verifies if a user is authenticated or not. If yes, then redirects to the dashboard only.
    const [loading, error] = useVerifyPublicRoute(true, false);
    if (error !== false) {
        return <h1>{error}</h1>;
    }
    if (loading === true) {
        return <Loader />;
    }
    return (
        <Route
            {...rest}
            render={(props) => {
                return <Component {...props} />;
            }}
        />
    );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => { // Creates a private route which first verifies if a user is authenticated or not. If not, then redirects to the signin page only.
    const [loading, error] = useVerifyPrivateRoute(true, false);
    if (error !== false) {
        return <h1>{error}</h1>;
    }
    if (loading === true) {
        return <Loader />;
    }
    return (
        <Route
            {...rest}
            render={(props) => {
                return <Component {...props} />;
            }}
        />
    );
};
