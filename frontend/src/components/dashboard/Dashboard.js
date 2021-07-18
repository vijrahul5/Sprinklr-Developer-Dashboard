// libraries
import React, { lazy, Suspense } from "react";
import { NotificationContainer } from "react-notifications";
// components
import Loader from "../loaders/Loader";
import DashboardNavbar from "../dashboardNavbar/index";
import Profile from "../profile/index";
import StandUp from "../standUp/index";
import JiraDashboard from "../jiraDashboard/components/jira/Jira";
import GitlabDashboard from "../gitlabDashboard/GitlabDashboard";
import Learning from "../learning/index";
// hooks
import useFetchEmployeeData from "../../hooks/useFetchEmployeeData";

// lazy loading
const Team = lazy(() => import("../team/index"));

export default function Dashboard() {
    const [loading, user, error] = useFetchEmployeeData();
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <DashboardNavbar />
            {/* <div className="dashboardContainer"> */}
            <div className="basicInfo__OuterWrapper">
                <div className="basicInfo">
                    <div className="basicInfo__wrapper">
                        <Profile user={user} />
                        <StandUp />
                    </div>
                    <Learning user={user} />
                </div>
            </div>

            <div className="sectionContainer">
                {user.managerAccess ? (
                    <Suspense
                        fallback={() => {
                            return (
                                <div className="section teamStandUpList">
                                    <h1 className="teamStandUpList__heading">
                                        Team
                                    </h1>
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
                    <JiraDashboard user={user} />
                </div>
                <div className="section">
                    <h1>Gitlab</h1>
                    <GitlabDashboard user={user} />
                </div>
            </div>
            {/* </div> */}
            <NotificationContainer />
        </>
    );
}
