// libraries
import React, { useState, useEffect, useCallback } from "react";
import { Button, SIZE } from "baseui/button";
import MaterialTooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { withStyle, useStyletron } from "baseui";
import {
    StyledTable,
    StyledHead,
    StyledHeadCell,
    StyledBody,
    StyledRow,
    StyledCell,
} from "baseui/table";
import Checkbox from "@material-ui/core/Checkbox";

// hooks
import useUpdateLearningResource from "../hooks/useUpdateLearningResource";

const TitleHeadCell = withStyle(StyledHeadCell, {
    width: "40%",
});
const MarkedHeadCell = withStyle(StyledHeadCell, {
    width: "20%",
});
const PercentageHeadCell = withStyle(StyledHeadCell, {
    width: "20%",
});
const AuthorHeadCell = withStyle(StyledHeadCell, {
    width: "20%",
});

const Tooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "white",
        color: "black",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        fontSize: 12,
        fontFamily: "system-ui, Helvetica, Arial, sans-serif",
        height: "fit-content",
        width: "50rem",
        padding: "1rem",
    },
    arrow: {
        color: "white",
    },
}))(MaterialTooltip);

function checkMarked(resource, email) {
    for (let i = 0; i < resource.markedBy.length; i++) {
        if (resource.markedBy[i].email === email) return true;
    }
    return false;
}

function LearningResource({ resource, user, team, fetchLearningResources }) {
    const [value, setValue] = useState(false);
    const [updateError, updateLearningResource] = useUpdateLearningResource();

    const percentage = Math.ceil(
        (resource.markedBy.length / (team.length + 1)) * 100
    );
    useEffect(() => {
        if (checkMarked(resource, user.email)) {
            setValue(true);
        }
    }, [resource, user]);

    const handleChange = useCallback(
        async (e) => {
            setValue(() => !value);
            await updateLearningResource({
                resourceId: resource["_id"],
                marked: !value,
            });
            fetchLearningResources();
        },
        [
            setValue,
            resource,
            fetchLearningResources,
            updateLearningResource,
            value,
        ]
    );
    return (
        <>
            <StyledHead
                style={{
                    borderBottom: "1px solid rgb(200,200,200)",
                }}
            >
                <TitleHeadCell>
                    <a className="learningResource__link" href={resource.link}>
                        {resource.title}
                    </a>
                </TitleHeadCell>
                <MarkedHeadCell>
                    <Checkbox
                        className="learningResource__mark"
                        onChange={handleChange}
                        checked={value}
                    />
                    
                </MarkedHeadCell>
                {resource.teamManager.email === user.email ? (
                    <Tooltip
                        arrow
                        PopperProps={{
                            modifiers: {
                                offset: {
                                    enabled: true,
                                    offset: "0px, -10px",
                                },
                            },
                        }}
                        title={
                            <>
                                <h1 className="learningResource__toolTipHeading">
                                    Marked By:
                                </h1>
                                <div>
                                    {resource.markedBy.map((markPerson) => {
                                        return (
                                            <div className="learningResource__toolTipEmail">
                                                {markPerson.email}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        }
                    >
                        <PercentageHeadCell>
                            <div
                                style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                }}
                            >
                                <CircularProgressbar
                                    value={percentage}
                                    text={`${percentage}%`}
                                    styles={buildStyles({
                                        pathColor: `rgb(12, 102, 194)`,
                                        textColor: "rgb(12, 102, 194)",
                                        trailColor: "#d6d6d6",
                                    })}
                                />
                            </div>
                        </PercentageHeadCell>
                    </Tooltip>
                ) : (
                    <PercentageHeadCell>N.A.</PercentageHeadCell>
                )}
                <AuthorHeadCell style={{fontWeight: "350"}}>{resource.author.name}</AuthorHeadCell>
            </StyledHead>
        </>
    );
}

export default LearningResource;
