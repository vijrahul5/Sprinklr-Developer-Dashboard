import SidebarMenu from "../components/Sidebar/Sidebar";
import Team from "./Team/Team";
import TeamForm from "./TeamForm/TeamForm";
import Profile from "./Profile/Profile";
import StandUp from "./StandUp/StandUp";
import React from "react";
import Jira from "../components/JiraDashboard/components/jira/Jira";
export default function Dashboard() {
  return (
    <>
      <SidebarMenu />

      <div className="sectionContainer">
        <Profile />
        <div>
          <Jira />
        </div>
      </div>
    </>
  );
}
