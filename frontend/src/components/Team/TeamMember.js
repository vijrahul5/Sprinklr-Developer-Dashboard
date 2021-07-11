import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import standUpQuestions from "../StandUp/StandUpQuestions";

function TeamMember({ teamMember, handleDeleteTeamMember }) {
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

                {standUpQuestions.map(({ question, questionNumber }) => {
                    return (
                        <li key={questionNumber}>
                            <p className="teamStandUpList__param">{question}</p>
                            <p className="teamStandUpList__value">
                                {teamMember.standUp
                                    ? teamMember.standUp.questions[
                                          questionNumber
                                      ]
                                    : "Not Submitted Yet"}
                            </p>
                        </li>
                    );
                })}

                <div className="teamStandUpList__delete">
                    <RiDeleteBin6Line
                        className="teamStandUpList__delete__icon"
                        onClick={() => handleDeleteTeamMember(teamMember.email)}
                    />
                </div>
            </ul>
        </>
    );
}

export default TeamMember;
