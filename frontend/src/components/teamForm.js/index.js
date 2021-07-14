import React from "react";
import TeamForm from "./TeamForm";
import "../../scss/team.scss";

function index({ type }) {
    return <TeamForm type={type} />;
}

export default index;
