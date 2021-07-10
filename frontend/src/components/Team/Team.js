import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import Loader from "../../globalComponents/Loader/Loader";
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
                    <HeadingLevel>
                        <Heading
                            style={{
                                marginBottom: "2rem",
                                textAlign: "center",
                                fontSize: "1.5rem",
                                fontWeight: "250",
                            }}
                        >
                            No team members added...
                        </Heading>
                    </HeadingLevel>
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
