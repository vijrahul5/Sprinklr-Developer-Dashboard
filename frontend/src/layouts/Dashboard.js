import SidebarMenu from "../components/Sidebar/Sidebar";
import Team from "../layouts/Team";
import TeamForm from "./TeamForm";
import Profile from "../layouts/Profile";
import StandUp from "./StandUp";
import React from "react";
import JiraDashboard from "./JiraDashboard/JIRA/Jira";

//review-cycle-1: don't keep a single level directory structure. break it down. for eg: components has dashboard directory and signin component file. then there is a dashboard directory which has an index file which exports dashboard component. and dashboard directory also has other components used internaly by dashboard component
//review-cycle-1: if possible, try to integrate prettier and eslint in your repo. 
export default function Dashboard() {
    return (
        <>
            <SidebarMenu />
            <div className="dashboard-container">
                <Profile />
                <StandUp />
                <Team />
                <TeamForm />
                <JiraDashboard />
            </div>
        </>
    );
}
