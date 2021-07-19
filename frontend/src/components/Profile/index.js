// libraries
import React from "react";
// components
import Profile from "./components/Profile";
// styles
import "./styles/profile.scss";

function index({user}) {
    return <Profile user={user}/>;
}

export default index;
