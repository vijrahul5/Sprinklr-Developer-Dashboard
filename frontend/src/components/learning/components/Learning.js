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
    minWidth: "200px",
    width: "40%",
});
const MarkedHeadCell = withStyle(StyledHeadCell, {
    minWidth: "100px",
    width: "20%",
});
const PercentageHeadCell = withStyle(StyledHeadCell, {
    minWidth: "100px",
    width: "20%",
});
const AuthorHeadCell = withStyle(StyledHeadCell, {
    minWidth: "100px",
    width: "20%",
});

function Learning({ user }) {
    const [postLearningResource, setPostLearningResource] = useState(false);

    const [loading, data, error, fetchLearningResources] =
        useFetchLearningResources();

    
    const [css] = useStyletron();
    if (loading) {
        return (
            <>
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
            </>
        );
    }
    return (
        <>
            <h1 className="learning__heading">
                Learning Resources
                <div className="learning__wrapper">
                    <BiAddToQueue
                        className="add__icon"
                        onClick={() => setPostLearningResource(true)}
                    />
                </div>
            </h1>
            {data && data.length ? (
                <div className={css({ height: "600px" })}>
                    <StyledTable>
                        <StyledHead
                            style={{
                                borderBottom: "1px solid rgb(200,200,200)",
                            }}
                            className="learningTable"
                        >
                            <TitleHeadCell>Title</TitleHeadCell>
                            <MarkedHeadCell>Mark/Unmark</MarkedHeadCell>
                            <PercentageHeadCell>
                                Completion %
                            </PercentageHeadCell>
                            <AuthorHeadCell>Author</AuthorHeadCell>
                        </StyledHead>
                        <StyledBody className="learningTable">
                            {data.map((resource, index) => (
                                <LearningResource
                                    user={user}
                                    key={resource["_id"]}
                                    resource={resource}
                                    fetchLearningResources={
                                        fetchLearningResources
                                    }
                                />
                            ))}
                        </StyledBody>
                    </StyledTable>
                </div>
            ) : null}
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
