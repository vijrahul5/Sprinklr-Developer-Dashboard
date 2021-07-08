import SidebarMenu from "../components/Sidebar/Sidebar";
import Team from "./Team/Team";
import TeamForm from "./TeamForm/TeamForm";
import Profile from "./Profile/Profile";
import StandUp from "./StandUp/StandUp";
import React from "react";
import JiraDashboard from "./JiraDashboard/JIRA/Jira";
import GitlabDashboard from "./GitlabDashboard/GitlabDashboard";

export default function Dashboard() {
    return (
        <>
            <SidebarMenu />
            <div className="dashboardContainer">
                <Profile />
                <StandUp />
                <Team />
                <TeamForm type="Add" />
                <TeamForm type="Delete" />
                <JiraDashboard />
                <GitlabDashboard />
            </div>
        </>
    );
}
