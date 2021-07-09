import React from "react";
import GitlabApp from "./GitlabApp.js";

function GitlabDashboard({user}) {
    return (
        <>
            <GitlabApp user={user}/>
        </>
    );
}

export default GitlabDashboard;
