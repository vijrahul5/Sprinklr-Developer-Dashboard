import React from "react";
import { Route } from "react-router-dom";
import Loader from "../components/loaders/Loader";
import { useVerifyRoute } from "./useVerifyRoute";
//Functions for providing protected frontend routing

export const PublicRoute = ({ component: Component, ...rest }) => {
    // Creates a public route which first verifies if a user is authenticated or not. If yes, then redirects to the dashboard only.
    const [loading, error] = useVerifyRoute("Public");
    if (error) {
        return <h1>{error}</h1>;
    }
    if (loading) {
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

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    // Creates a private route which first verifies if a user is authenticated or not. If not, then redirects to the signin page only.
    const [loading, error] = useVerifyRoute("Private");
    if (error) {
        return <h1>{error}</h1>;
    }
    if (loading) {
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
