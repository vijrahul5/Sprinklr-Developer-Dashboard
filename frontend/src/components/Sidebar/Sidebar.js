import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaSignOutAlt } from "react-icons/fa";
import Auth from "../../Auth";

function SidebarMenu() {
    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="sidebar">
                    <h1>Sprinklr Developer Dashboard</h1>
                    <FaSignOutAlt
                        style={{
                            fontSize: "2rem",
                            marginRight: "2rem",
                            cursor: "pointer",
                        }}
                        onClick={() => Auth.logout()}
                    >
                        <Link to="/"  />
                    </FaSignOutAlt>
                </div>
            </IconContext.Provider>
        </>
    );
}

export default SidebarMenu;
