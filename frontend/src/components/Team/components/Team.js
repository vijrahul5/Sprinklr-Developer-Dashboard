// libraries
import React, { useState, useEffect } from "react";
import {
    List,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized";

import { Button, SIZE } from "baseui/button";
// components
import TeamMember from "./TeamMember";
import Loader from "../../loaders/TeamTombstone";
import TeamForm from "../../teamForm/index";
import Instruction from "../../instruction/Instruction";
// hooks
import useFetchEmployeeTeamData from "../../../hooks/useFetchEmployeeTeamData";

function Team() {
    // Component for accessing team data and their stand ups
    const [loading, data, error, fetchTeamData] = useFetchEmployeeTeamData(); // Fetches the logged in employee's team data and their stand ups
    const [addTeamMember, setAddTeamMember] = useState(false);
    const [deleteTeamMember, setDeleteTeamMember] = useState(false);
    const [deleteTeamMemberEmail, setDeleteTeamMemberEmail] = useState("");
    const cache = React.useRef(
        new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 500,
        })
    );

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
                    <div
                        className="teamStandUpList__OuterUl"
                        style={{ width: "100%", height: "45rem" }}
                    >
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={cache.current.rowHeight}
                                    deferredMeasurementCache={cache.current}
                                    rowCount={data.length}
                                    rowRenderer={({
                                        key,
                                        index,
                                        style,
                                        parent,
                                    }) => {
                                        const teamMember = data[index];
                                        return (
                                            <CellMeasurer
                                                key={key}
                                                cache={cache.current}
                                                parent={parent}
                                                columnIndex={0}
                                                rowIndex={index}
                                                style={style}
                                            >
                                                <TeamMember
                                                    index={index}
                                                    teamMember={teamMember}
                                                    handleDeleteTeamMember={
                                                        handleDeleteTeamMember
                                                    }
                                                />
                                            </CellMeasurer>
                                        );
                                    }}
                                    className="virtual"
                                />
                            )}
                        </AutoSizer>
                    </div>

                    {addTeamMember ? (
                        <TeamForm
                            type={"Add"}
                            setAddTeamMember={setAddTeamMember}
                            fetchTeamData={fetchTeamData}
                        />
                    ) : null}
                    {deleteTeamMember ? (
                        <TeamForm
                            type={"Delete"}
                            email={deleteTeamMemberEmail}
                            setDeleteTeamMember={setDeleteTeamMember}
                            fetchTeamData={fetchTeamData}
                        />
                    ) : null}
                </>
            ) : (
                <>
                    <div className="teamInstruction">
                        <Instruction
                            instructions={[
                                "This is the section where you can manage your team and review their progress.",
                                "Click on the 'Add Team Member' button to add team members.",
                                "Once a team member is added, you will be able to see their daily stand ups.",
                                "Click on the 'Delete Team Member' button to delete a team member.",
                            ]}
                        />
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
                            fetchTeamData={fetchTeamData}
                        />
                    ) : null}
                </>
            )}
        </>
    );
}

export default Team;
