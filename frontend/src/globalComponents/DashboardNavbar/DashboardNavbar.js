import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Auth from "../../Auth";

function DashboardNavbar() {
  return (
    <>
      <div className="dashboardNavbar">
        <h1>Sprinklr Developer Dashboard</h1>
        <FaSignOutAlt
          onClick={() => Auth.logout()}
          className="dashboardNavbar__icon"
        >
          <Link to="/" />
        </FaSignOutAlt>
      </div>
    </>
  );
}

export default DashboardNavbar;
