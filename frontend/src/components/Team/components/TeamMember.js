// libraries
import React from "react";
import { Button, SIZE, KIND } from "baseui/button";
// components
import standUpQuestions from "../../../constants/standUpQuestions";

function TeamMember({ teamMember, handleDeleteTeamMember }) {
    return (
        <>
            <ul>
                <li className="teamMember__list__item">
                    <p className="teamStandUpList__param">Name:</p>
                    <p className="teamStandUpList__value">{teamMember.name}</p>
                </li>
                <li className="teamMember__list__item">
                    <p className="teamStandUpList__param">Email:</p>
                    <p className="teamStandUpList__value">{teamMember.email}</p>
                </li>

                {standUpQuestions.map(({ question, questionNumber }) => {
                    return (
                        <li key={questionNumber} className="teamMember__list__item">
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
