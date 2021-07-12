import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import Loader from "../../globalComponents/Loader/Tombstone";
import { useFetchEmployeeTeamData } from "./teamHooks";
import { Heading, HeadingLevel } from "baseui/heading";
import { BiAddToQueue } from "react-icons/bi";
import TeamForm from "../TeamForm/TeamForm";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Button, SIZE } from "baseui/button";

function Team() {
    // Component for accessing team data and their stand ups
    const [loading, data, error, setFetch] = useFetchEmployeeTeamData(); // Fetches the logged in employee's team data and their stand ups
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
                    <ul>
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
                            setFetch={setFetch}
                        />
                    ) : null}
                    {deleteTeamMember ? (
                        <TeamForm
                            type={"Delete"}
                            email={deleteTeamMemberEmail}
                            setDeleteTeamMember={setDeleteTeamMember}
                            setFetch={setFetch}
                        />
                    ) : null}
                </>
            ) : (
                <>
                    <div className="instruction teamInstruction">
                        <h2 className="instruction__item">
                            1. This is the section where you can manage your
                            team and review their progress.
                        </h2>
                        <h2 className="instruction__item">
                            2. Click on the add icon to add team members.
                        </h2>
                        <h2 className="instruction__item">
                            3. Once a team member is added, you will be able to
                            see their daily stand ups.
                        </h2>
                        <h2 className="instruction__item">
                            4. Click on the delete icon to delete a team member.
                        </h2>
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
                            setFetch={setFetch}
                        />
                    ) : null}
                </>
            )}
        </>
    );
}

export default Team;
