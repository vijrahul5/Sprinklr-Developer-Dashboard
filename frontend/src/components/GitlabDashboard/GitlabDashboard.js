//libraries
import React from "react";
//utils
import GitlabApp from "./GitlabApp.js";
import "../../scss/jira.scss";
function GitlabDashboard({ user }) {
    return (
        <>
            <GitlabApp user={user} />
        </>
    );
}

export default GitlabDashboard;
