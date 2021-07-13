import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Auth from "../../Auth";

function DashboardNavbar() {
<<<<<<< HEAD:frontend/src/globalComponents/DashboardNavbar/DashboardNavbar.js
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
=======
    return (
        <>
            <nav className="dashboardNavbar">
                <h1>Sprinklr Developer Dashboard</h1>
                <FaSignOutAlt
                    onClick={() => Auth.logout()}
                    className="dashboardNavbar__icon"
                >
                    <Link to="/" />
                </FaSignOutAlt>
                <p className="dashboardNavbar__icon__description">Sign Out</p>
            </nav>
        </>
    );
>>>>>>> 5493d4a05eb958d551f479d115c0cb81ab24111b:frontend/src/components/dashboardNavbar/DashboardNavbar.js
}

export default DashboardNavbar;
