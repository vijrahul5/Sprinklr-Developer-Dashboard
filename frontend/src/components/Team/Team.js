import React from "react";
import TeamMember from "./TeamMember";
import Loader from "../../globalComponents/Loader/Loader";
import { useFetchEmployeeTeamData } from "./teamHooks";
import { Heading, HeadingLevel } from "baseui/heading";

function Team() {
    // Component for accessing team data and their stand ups
    const [loading, data, error] = useFetchEmployeeTeamData(); // Fetches the logged in employee's team data and their stand ups

    if (error) {
        alert(error);
    }

    if (loading) {
        return (
            <ul className="teamStandUpList">
                <Loader />
            </ul>
        );
    }
    return (
        <>
            <h1>Team</h1>
            <ul>
                {data.length ? (
                    data.map((teamMember) => {
                        return (
                            <li>
                                <TeamMember
                                    key={teamMember.email}
                                    teamMember={teamMember}
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
        </>
    );
}

export default Team;
