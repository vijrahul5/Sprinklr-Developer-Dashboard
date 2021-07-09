import React from "react";

function TeamMember({ teamMember }) {
    // Component for displaying a single team member's basic info and stand ups for the day
    return (
        <ul>
            <li>
                <p className="param">Name:</p>
                <p className="value">{teamMember.name}</p>
            </li>
            <li>
                <p className="param">Email:</p>
                <p className="value">{teamMember.email}</p>
            </li>
            <li>
                <p className="param">Work Done Yesterday:</p>
                <p className="value">
                    {teamMember.standUp
                        ? teamMember.standUp.question1
                        : "Not Submitted Yet"}
                </p>
            </li>
            <li>
                <p className="param">Agenda For Today:</p>
                <p className="value">
                    {teamMember.standUp
                        ? teamMember.standUp.question2
                        : "Not Submitted Yet"}
                </p>
            </li>
            <li>
                <p className="param">Work To Be Done Today:</p>
                <p className="value">
                    {teamMember.standUp
                        ? teamMember.standUp.question3
                        : "Not Submitted Yet"}
                </p>
            </li>
        </ul>
    );
}

export default TeamMember;
