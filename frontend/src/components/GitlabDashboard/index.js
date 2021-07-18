//libraries
import React from "react";
//utils
import GitlabApp from "./GitlabApp.js";
//styles
import "./styles/gitlab.scss";

function index({ user }) {
    return (
        <>
            <GitlabApp user={user} />
        </>
    );
}

export default index;
