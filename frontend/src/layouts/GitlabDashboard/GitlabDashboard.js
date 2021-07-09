import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import GitlabApp from "./GitlabApp.js";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function GitlabDashboard() {
    return (
        <>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirectUri="http://localhost:3000/dashboard"
            >
                <GitlabApp />
            </Auth0Provider>
        </>
    );
}

export default GitlabDashboard;
