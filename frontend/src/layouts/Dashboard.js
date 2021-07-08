import SidebarMenu from "../components/Sidebar/Sidebar";
import Team from "./Team/Team";
import TeamForm from "./TeamForm/TeamForm";
import Profile from "./Profile/Profile";
import StandUp from "./StandUp/StandUp";
import React from "react";
import JiraDashboard from "./JiraDashboard/JIRA/Jira";
import GitlabDashboard from "./GitlabDashboard/GitlabDashboard";
import { useFetchEmployeeData } from "./Profile/profileHooks";
import Loader from "../components/Loader/Loader";

export default function Dashboard() {
    const [loading, data, error] = useFetchEmployeeData();
    if (error) {
        alert(error);
        window.location.reload();
    }
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <SidebarMenu />
            <div className="dashboardContainer">
                <div id="basicInfo">
                    <Profile />
                    <StandUp />
                </div>
                <div id="sectionContainer">
                    {data.managerAccess ? (
                        <div id="teamContainer">
                            <h1>Team</h1>
                            <Team />
                            <TeamForm type="Add" />
                            <TeamForm type="Delete" />
                        </div>
                    ) : null}
                    <div id="jiraContainer">
                        <h1>Jira</h1>
                        <JiraDashboard />
                    </div>
                    <div id="gitlabContainer">
                        <h1>Gitlab</h1>
                        <GitlabDashboard />
                    </div>
                </div>
            </div>
        </>
    );
}
