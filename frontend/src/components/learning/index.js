import Learning from "./components/Learning";
import React from "react";
import "../../scss/learning.scss";

function index({user}) {
    return <Learning user={user}/>;
}

export default index;
