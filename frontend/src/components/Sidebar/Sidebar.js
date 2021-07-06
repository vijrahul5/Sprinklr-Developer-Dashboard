import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import Auth from "../../layouts/SignIn/Auth";

function SidebarMenu() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="sidebar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <h1>Sprinklr Developer Dashboard</h1>
                </div>
                <nav
                    className={sidebar ? "sidebar-menu active" : "sidebar-menu"}
                >
                    <ul className="sidebar-menu-items" onClick={showSidebar}>
                        <li className="sidebar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <li
                            className="sidebar-text"
                            onClick={() => Auth.logout()}
                        >
                            <Link to="/">
                                <IoIcons.IoMdHelpCircle />
                                <span>Sign Out</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default SidebarMenu;
