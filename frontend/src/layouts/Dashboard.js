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
                <div id="basicInfo">
                    <Profile />
                    <StandUp />
                </div>
                <div id="sectionContainer">
                    <div id="teamContainer">
                        <h1>Team</h1>
                        <Team />
                        <TeamForm type="Add" />
                        <TeamForm type="Delete" />
                    </div>
                    <div id="jiraContainer">
                        <h1>Jira</h1>
                        <JiraDashboard />
                    </div>
                    {/* <GitlabDashboard/> */}
                </div>
            </div>
        </>
    );
}
