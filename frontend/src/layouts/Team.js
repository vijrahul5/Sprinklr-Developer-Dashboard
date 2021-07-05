import React from "react";
import TeamMember from "./TeamMember";
import Loader from "../components/Loader/Loader";
import {useFetchEmployeeTeamData } from "../Api";
import { Heading, HeadingLevel } from "baseui/heading";

function Team() {
    // Component for accessing team data and their stand ups
    const [loading, data, error] = useFetchEmployeeTeamData(); // Fetches the logged in employee's team data and their stand ups
    if (error !== false) {
        return <h1>{error}</h1>;
    }

    if (loading === true) {
        return (
            <ul className="teamStandUpList">
                <Loader />
            </ul>
        );
    } else {
        return (
            <>
                <ul className="teamStandUpList">
                    {data.length !== 0 ? (
                        data.map((teamMember) => {
                            return (
                                <TeamMember
                                    key={teamMember.email}
                                    teamMember={teamMember}
                                />
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
}

export default Team;
