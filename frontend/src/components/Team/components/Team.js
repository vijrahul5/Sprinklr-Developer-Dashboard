import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import Loader from "../../loaders/Tombstone";
import useFetchEmployeeTeamData from "../../../hooks/useFetchEmployeeTeamData";
import TeamForm from "../../teamForm.js/components/TeamForm";
import { Button, SIZE } from "baseui/button";
import Instruction from "../../instruction/Instruction";

function Team() {
    // Component for accessing team data and their stand ups
    const [loading, data, error, fetchTeamData] = useFetchEmployeeTeamData(); // Fetches the logged in employee's team data and their stand ups
    const [addTeamMember, setAddTeamMember] = useState(false);
    const [deleteTeamMember, setDeleteTeamMember] = useState(false);
    const [deleteTeamMemberEmail, setDeleteTeamMemberEmail] = useState("");

    function handleDeleteTeamMember(email) {
        setDeleteTeamMemberEmail(email);
        setDeleteTeamMember(true);
    }

    if (loading) {
        return (
            <div className="teamStandUpList__loader">
                <Loader />
            </div>
        );
    }

    return (
        <>
            {data && data.length ? (
                <>
                    <div className="teamStandUpList__add">
                        <Button
                            className="btnCustom"
                            size={SIZE.compact}
                            onClick={() => setAddTeamMember(true)}
                        >
                            Add Team Member
                        </Button>
                    </div>
                    <ul className="teamStandUpList__OuterUl">
                        {data.map((teamMember) => {
                            return (
                                <li key={teamMember.email}>
                                    <TeamMember
                                        teamMember={teamMember}
                                        handleDeleteTeamMember={
                                            handleDeleteTeamMember
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    {addTeamMember ? (
                        <TeamForm
                            type={"Add"}
                            setAddTeamMember={setAddTeamMember}
                            fetchTeamData={fetchTeamData}
                        />
                    ) : null}
                    {deleteTeamMember ? (
                        <TeamForm
                            type={"Delete"}
                            email={deleteTeamMemberEmail}
                            setDeleteTeamMember={setDeleteTeamMember}
                            fetchTeamData={fetchTeamData}
                        />
                    ) : null}
                </>
            ) : (
                <>
                    <div className="teamInstruction">
                        <Instruction
                            instructions={[
                                "This is the section where you can manage your team and review their progress.",
                                "Click on the add icon to add team members.",
                                "Once a team member is added, you will be able to see their daily stand ups.",
                                "Click on the delete icon to delete a team member.",
                            ]}
                        />
                    </div>
                    <div className="teamStandUpList__add teamInstruction__btn">
                        <Button
                            className="btnCustom"
                            size={SIZE.compact}
                            onClick={() => setAddTeamMember(true)}
                        >
                            Add Team Member
                        </Button>
                    </div>
                    {addTeamMember ? (
                        <TeamForm
                            type={"Add"}
                            setAddTeamMember={setAddTeamMember}
                            fetchTeamData={fetchTeamData}
                        />
                    ) : null}
                </>
            )}
        </>
    );
}

export default Team;
