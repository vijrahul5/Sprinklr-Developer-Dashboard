// libraries
import React, { useState, useEffect } from "react";
import { Button, SIZE } from "baseui/button";
import { BiAddToQueue } from "react-icons/bi";
import { withStyle, useStyletron } from "baseui";
import {
    StyledTable,
    StyledHead,
    StyledHeadCell,
    StyledBody,
    StyledRow,
    StyledCell,
} from "baseui/table";
// components
import PostLearningResource from "./PostLearningResource";
import Loader from "../../loaders/Tombstone";
import LearningResource from "./LearningResource";
// hooks
import useFetchLearningResources from "../hooks/useFetchLearningResources";
import useFetchEmployeeTeamData from "../../../hooks/useFetchEmployeeTeamData";

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

function Learning({ user }) {
    const [postLearningResource, setPostLearningResource] = useState(false);

    const [loading, data, error, fetchLearningResources] =
        useFetchLearningResources();

    const [teamLoading, teamData, teamError, fetchTeamData] =
        useFetchEmployeeTeamData();
    const [css] = useStyletron();

    if (loading || teamLoading) {
        return (
            <div className="learning">
                <h1 className="learning__heading">Learning Resources</h1>
                <div className={css({ height: "600px" })}>
                    <StyledTable>
                        <StyledHead
                            style={{
                                borderBottom: "1px solid rgb(200,200,200)",
                            }}
                        >
                            <TitleHeadCell>Title</TitleHeadCell>
                            <MarkedHeadCell>Mark/UnMark</MarkedHeadCell>
                            <PercentageHeadCell>
                                Completion %
                            </PercentageHeadCell>
                            <AuthorHeadCell>Author</AuthorHeadCell>
                        </StyledHead>
                        <StyledBody>
                            {[...Array(10)].map((x, i) => (
                                <StyledHead
                                    style={{
                                        borderBottom:
                                            "1px solid rgb(200,200,200)",
                                    }}
                                >
                                    <TitleHeadCell>
                                        <Loader
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                            }}
                                        />
                                    </TitleHeadCell>
                                    <MarkedHeadCell>
                                        <Loader
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                            }}
                                        />
                                    </MarkedHeadCell>
                                    <PercentageHeadCell>
                                        <Loader
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                            }}
                                        />
                                    </PercentageHeadCell>
                                    <AuthorHeadCell>
                                        <Loader
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                                marginRight: "8%",
                                            }}
                                        />
                                    </AuthorHeadCell>
                                </StyledHead>
                            ))}
                        </StyledBody>
                    </StyledTable>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="learning">
                <h1 className="learning__heading">
                    Learning Resources
                    {user.managerAccess || user.manager ? (
                        <div className="learning__wrapper">
                            <BiAddToQueue
                                className="add__icon"
                                onClick={() => setPostLearningResource(true)}
                            />
                        </div>
                    ) : null}
                </h1>
                {data && data.length ? (
                    <div className={css({ height: "600px" })}>
                        <StyledTable>
                            <StyledHead
                                style={{
                                    borderBottom: "1px solid rgb(200,200,200)",
                                }}
                            >
                                <TitleHeadCell>Title</TitleHeadCell>
                                <MarkedHeadCell>Mark/Unmark</MarkedHeadCell>
                                <PercentageHeadCell>
                                    Completion %
                                </PercentageHeadCell>
                                <AuthorHeadCell>Author</AuthorHeadCell>
                            </StyledHead>
                            <StyledBody>
                                {data.map((resource, index) => (
                                    <LearningResource
                                        user={user}
                                        key={resource["_id"]}
                                        resource={resource}
                                        team={teamData}
                                        fetchLearningResources={
                                            fetchLearningResources
                                        }
                                    />
                                ))}
                            </StyledBody>
                        </StyledTable>
                    </div>
                ) : null}
            </div>
            {postLearningResource ? (
                <PostLearningResource
                    setPostLearningResource={setPostLearningResource}
                    fetchLearningResources={fetchLearningResources}
                />
            ) : null}
        </>
    );
}

export default Learning;
