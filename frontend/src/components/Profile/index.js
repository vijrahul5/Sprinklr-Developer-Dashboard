// libraries
import React from "react";
// components
import Profile from "./components/Profile";
// styles
import "../../scss/basicInfo.scss";

function index({user}) {
    return <Profile user={user}/>;
}

export default index;
