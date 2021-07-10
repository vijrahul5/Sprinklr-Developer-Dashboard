import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function TeamMember({ teamMember, handleDeleteTeamMember }) {
    // Component for displaying a single team member's basic info and stand ups for the day
    return (
        <>
            <ul>
                <li>
                    <p className="teamStandUpList__param">Name:</p>
                    <p className="teamStandUpList__value">{teamMember.name}</p>
                </li>
                <li>
                    <p className="teamStandUpList__param">Email:</p>
                    <p className="teamStandUpList__value">{teamMember.email}</p>
                </li>
                <li>
                    <p className="teamStandUpList__param">
                        Work Done Yesterday:
                    </p>
                    <p className="teamStandUpList__value">
                        {teamMember.standUp
                            ? teamMember.standUp.question1
                            : "Not Submitted Yet"}
                    </p>
                </li>
                <li>
                    <p className="teamStandUpList__param">Agenda For Today:</p>
                    <p className="teamStandUpList__value">
                        {teamMember.standUp
                            ? teamMember.standUp.question2
                            : "Not Submitted Yet"}
                    </p>
                </li>
                <li>
                    <p className="teamStandUpList__param">
                        Work To Be Done Today:
                    </p>
                    <p className="teamStandUpList__value">
                        {teamMember.standUp
                            ? teamMember.standUp.question3
                            : "Not Submitted Yet"}
                    </p>
                </li>
                <div className="teamStandUpList__delete">
                    <RiDeleteBin6Line className="teamStandUpList__delete__icon" onClick={()=>handleDeleteTeamMember(teamMember.email)}/>
                </div>
            </ul>
        </>
    );
}

export default TeamMember;
