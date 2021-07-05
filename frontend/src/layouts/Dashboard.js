import SidebarMenu from "../components/Sidebar/Sidebar";
import Team from "../layouts/Team";
import TeamForm from "./TeamForm";
import Profile from "../layouts/Profile";
import StandUp from "./StandUp";
import React from "react";
import JiraDashboard from "./JiraDashboard/JIRA/Jira";

export default function Dashboard() {
    return (
        <>
            <div className="dashboard-container">
                <SidebarMenu />
                <Profile />
                <StandUp />
                <Team />
                <TeamForm />
                <JiraDashboard />
            </div>
        </>
    );
}
