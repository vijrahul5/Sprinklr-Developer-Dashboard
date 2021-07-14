import DashboardNavbar from "../dashboardNavbar/index";
import Profile from "../Profile/index";
import StandUp from "../StandUp/index";
import React, { lazy, Suspense } from "react";
import JiraDashboard from "../JiraDashboard/components/jira/Jira";
import GitlabDashboard from "../GitlabDashboard/GitlabDashboard";
import useFetchEmployeeData from "../../hooks/useFetchEmployeeData";
import Loader from "../loaders/Loader";
import { NotificationContainer } from "react-notifications";



const Team = lazy(() => import("../team/index"));

export default function Dashboard() {
    const [loading, user, error] = useFetchEmployeeData();
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <DashboardNavbar />
            <div className="dashboardContainer">
                <div className="basicInfo">
                    <Profile user={user} />
                    <StandUp />
                </div>
                <div className="sectionContainer">
                    {user.managerAccess ? (
                        <Suspense
                            fallback={() => {
                                return (
                                    <div className="section teamStandUpList">
                                        <h1 className="teamStandUpList__heading">Team</h1>
                                        <Loader />
                                    </div>
                                );
                            }}
                        >
                            <div className="section teamStandUpList">
                                <h1>Team</h1>
                                <Team />
                            </div>
                        </Suspense>
                    ) : null}
                    <div className="section">
                        <h1>Jira</h1>
                        <JiraDashboard user={user}/>
                    </div>
                    <div className="section">
                        <h1>Gitlab</h1>
                        <GitlabDashboard user={user} />
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </>
    );
}
