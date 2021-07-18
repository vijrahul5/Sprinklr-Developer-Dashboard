// libraries
import React from "react";
// components
import TeamForm from "./TeamForm";
// styles
import "../../scss/team.scss";

function index({ type }) {
    return <TeamForm type={type} />;
}

export default index;
