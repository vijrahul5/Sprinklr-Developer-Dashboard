import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import Loader from "../../globalComponents/Loader/Tombstone";
import { useFetchEmployeeTeamData } from "./teamHooks";
import { Heading, HeadingLevel } from "baseui/heading";
import { BiAddToQueue } from "react-icons/bi";
import TeamForm from "../TeamForm/TeamForm";
import NotificationManager from "react-notifications/lib/NotificationManager";

function Team() {
    // Component for accessing team data and their stand ups
    const [loading, data, error, setLoading] = useFetchEmployeeTeamData(); // Fetches the logged in employee's team data and their stand ups
    const [addTeamMember, setAddTeamMember] = useState(false);
    const [deleteTeamMember, setDeleteTeamMember] = useState(false);
    const [deleteTeamMemberEmail, setDeleteTeamMemberEmail] = useState("");

    function handleDeleteTeamMember(email) {
        setDeleteTeamMemberEmail(email);
        setDeleteTeamMember(true);
    }
    useEffect(() => {
        if (error) {
            NotificationManager.error("Error!", error, 5000);
        }
    }, [error]);

    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <div className="teamStandUpList__add">
                <BiAddToQueue
                    className="teamStandUpList__add__icon"
                    onClick={() => setAddTeamMember(true)}
                />
            </div>
            <ul>
                {data && data.length ? (
                    data.map((teamMember) => {
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
                    })
                ) : (
                    <div className="instruction">
                        <h2 className="instruction__item">1. This is the section where you can manage your team and review their progress.</h2>
                        <h2 className="instruction__item">2. Click on the add icon to add team members.</h2>
                        <h2 className="instruction__item">3. Once a team member is added, you will be able to see their daily stand ups.</h2>
                        <h2 className="instruction__item">4. Click on the delete icon to delete a team member.</h2>
                    </div>
                )}
            </ul>
            {addTeamMember ? (
                <TeamForm
                    type={"Add"}
                    setAddTeamMember={setAddTeamMember}
                    setLoading={setLoading}
                />
            ) : null}
            {deleteTeamMember ? (
                <TeamForm
                    type={"Delete"}
                    email={deleteTeamMemberEmail}
                    setDeleteTeamMember={setDeleteTeamMember}
                    setLoading={setLoading}
                />
            ) : null}
        </>
    );
}

export default Team;
