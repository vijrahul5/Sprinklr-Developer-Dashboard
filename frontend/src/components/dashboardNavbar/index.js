// libraries
import React from "react";
// components
import DashboardNavbar from "./DashboardNavbar";
import "./styles/dashboardNavbar.scss";

function index({ user }) {
    return <DashboardNavbar user={user} />;
}

export default index;
