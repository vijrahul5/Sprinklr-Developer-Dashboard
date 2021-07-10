import DashboardNavbar from "../globalComponents/DashboardNavbar/DashboardNavbar";
import Team from "./Team/index";
import Profile from "./Profile/index";
import StandUp from "./StandUp/index";
import React from "react";
import JiraDashboard from "./JiraDashboard/components/jira/Jira";
import GitlabDashboard from "./GitlabDashboard/GitlabDashboard";
import { useFetchEmployeeData } from "./Profile/profileHooks";
import Loader from "../globalComponents/Loader/Loader";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function Dashboard() {
    const [loading, user, error] = useFetchEmployeeData();

    if (error) {
        NotificationManager.err("Error!", error, 5000);
    }
    
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <DashboardNavbar />
            <div className="dashboardContainer">
                <div className="basicInfo">
                    <Profile />
                    <StandUp />
                </div>
                <div className="sectionContainer">
                    {user.managerAccess ? (
                        <div className="section teamStandUpList">
                            <h1>Team</h1>
                            <Team />
                        </div>
                    ) : null}
                    <div className="section">
                        <h1>Jira</h1>
                        <JiraDashboard />
                    </div>
                    <div className="section">
                        <h1>Gitlab</h1>
                        <GitlabDashboard user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
