// libraries
import React from "react";
// components
import TeamForm from "./components/TeamForm";
// styles
import "./styles/teamForm.scss";

function index({
    type,
    email,
    setAddTeamMember,
    setDeleteTeamMember,
    fetchTeamData,
}) {
    return (
        <TeamForm
            type={type}
            email={email}
            setAddTeamMember={setAddTeamMember}
            setDeleteTeamMember={setDeleteTeamMember}
            fetchTeamData={fetchTeamData}
        />
    );
}

export default index;
