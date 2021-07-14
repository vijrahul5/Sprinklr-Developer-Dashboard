import React from "react";
import standUpQuestions from "../../../constants/standUpQuestions";
import { Button, SIZE, KIND } from "baseui/button";

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
                    <Button
                        className="btnCustom--tertiary"
                        size={SIZE.mini}
                        kind={KIND.tertiary}
                        onClick={() => handleDeleteTeamMember(teamMember.email)}
                    >
                        Delete Team Member
                    </Button>
                </div>
            </ul>
        </>
    );
}

export default TeamMember;
