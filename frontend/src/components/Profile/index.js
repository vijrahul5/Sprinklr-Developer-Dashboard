import React from "react";
import Profile from "./components/Profile";
import "../../scss/basicInfo.scss";

function index({user}) {
    return <Profile user={user}/>;
}

export default index;
