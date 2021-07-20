//libraries
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
// utilities
import Auth from "../../Auth";
// components
import Profile from "../profile/index";

function DashboardNavbar({ user }) {
    const [profileView, setProfileView] = useState(false);
    return (
        <>
            <nav className="dashboardNavbar">
                <h1>Sprinklr Developer Dashboard</h1>
            </nav>
            <div
                className="profile__imgHolder"
                onClick={() => setProfileView(!profileView)}
            >
                <img src={user.picture} alt="" />
                {profileView ? <Profile user={user} /> : null}
            </div>
        </>
    );
}

export default DashboardNavbar;
