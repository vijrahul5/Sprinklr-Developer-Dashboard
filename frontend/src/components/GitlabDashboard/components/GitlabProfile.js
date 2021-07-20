//libraries
import React, { useCallback, useState, useEffect, lazy, Suspense } from "react";
//utils
import useFetchEmployeeTeamData from "../../../../src/hooks/useFetchEmployeeTeamData";
import { Select, SIZE } from "baseui/select";
import Expe from "../../table/Expe";
import Notification from "./Notification";
import { withStyle, useStyletron } from "baseui";
import Loader from "../../loaders/Tombstone";
import {
    StyledTable,
    StyledHead,
    StyledHeadCell,
    StyledBody,
    StyledRow,
    StyledCell,
} from "baseui/table";
//import loadMoreRows from "./LoadRows";

// const StyledHeadCell = withStyle(StyledHeadCell, {
//     width: "15%",
// });

const GitlabAccessTokenForm = lazy(() => import("./GitlabAccessTokenForm"));

const axios = require("axios");

const GitlabProfile = (props) => {
    const [css] = useStyletron();
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentMergeRequest, setcurrentMergeRequest] = useState([]);
    const [mergeRequestToShow, setmergeRequestToShow] = useState([]);

    const [teamLoading, teamData, teamError] = useFetchEmployeeTeamData();
    const [teamMemberList, setList] = useState([]);

    useEffect(() => {
        if (props.user.doneGitlabAuth === true) {
            setUserAuthenticated(true);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (props.gitlabDetails.length > 0) {
            setcurrentMergeRequest(props.gitlabDetails);

            const initial = props.gitlabDetails.filter((element) => {
                return element[2] === props.user.name;
            });
            setmergeRequestToShow(initial);
            setLoading(false);
            if (teamData) {
                let list = teamData.map((element, idx) => {
                    return { label: element.name, id: idx.toString() };
                });
                list.push({
                    label: "Assigned to me",
                    id: list.length.toString(),
                });
                setList(list);
            }
        }
    }, [props, teamData]);

    const submitToken = useCallback(
        async (token) => {
            try {
                const res = await axios.post("/api/gitlab", {
                    gitlabAccessToken: token,
                });
                window.location.reload();
            } catch (err) {}
        },
        [props]
    );

    const [author, setauthor] = useState([
        { label: "Assigned to me", id: "99" },
    ]);
    const overRides = {
        ControlContainer: {
            style: () => ({
                borderRadius: "4px",
            }),
        },
    };
    const loadMoreRows = useCallback(
        ({
            startIndex,
            stopIndex,
            setLoading,

            setList,
            setLastLoadedIndex,
            list,
            setRemoteCount,
        }) => {
            setLoading(true);

            let myPromise = new Promise(function (myResolve, myReject) {
                myResolve("OK");
            });

            return myPromise.then(() => {
                let len = mergeRequestToShow.length;
                let lastIndex = Math.min(len - 1, stopIndex);
                if (startIndex <= lastIndex) {
                    let arr = mergeRequestToShow.slice(
                        startIndex,
                        lastIndex + 1
                    );
                    setList([...list, ...arr]);
                }

                setLastLoadedIndex(lastIndex);
                setLoading(false);
                setRemoteCount(props.gitlabDetails.length);
            });
        },
        [props, mergeRequestToShow]
    );

    const authorSelect = useCallback(
        (params) => {
            if (params.value.length !== 0) {
                let temp;
                if (params.value[0].label === "Assigned to me") {
                    temp = currentMergeRequest.filter((element) => {
                        return element[2] === props.user.name;
                    });
                } else {
                    temp = currentMergeRequest.filter((element) => {
                        return element[2] === params.value[0].label;
                    });
                }

                setmergeRequestToShow(temp);
            }
            if (params.value.length === 0) {
                const initial = props.gitlabDetails.filter((element) => {
                    return element[2] === props.user.name;
                });
                setmergeRequestToShow(initial);
            }
            setauthor(params.value);
        },
        [setauthor, author, currentMergeRequest, props]
    );

    if (!isUserAuthenticated) {
        return <GitlabAccessTokenForm submitToken={submitToken} />;
    }

    if (loading || teamLoading) {
        return (
            <div className={css({ height: "600px" })}>
                <StyledTable>
                    <StyledHead
                        style={{
                            borderBottom: "1px solid rgb(200,200,200)",
                        }}
                    >
                        <StyledHeadCell>Project Name</StyledHeadCell>
                        <StyledHeadCell>Merge Request</StyledHeadCell>
                        <StyledHeadCell>Author</StyledHeadCell>
                        <StyledHeadCell>Reviewer</StyledHeadCell>
                        <StyledHeadCell>Target Branch</StyledHeadCell>
                        <StyledHeadCell>Approval Status</StyledHeadCell>
                        <StyledHeadCell>Pipeline Status</StyledHeadCell>
                    </StyledHead>
                    <StyledBody>
                        {[...Array(15)].map((x, i) => (
                            <StyledHead
                                style={{
                                    borderBottom: "1px solid rgb(200,200,200)",
                                }}
                            >
                                <StyledHeadCell>
                                    <Loader
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                        }}
                                    />
                                </StyledHeadCell>
                                <StyledHeadCell>
                                    <Loader
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                        }}
                                    />
                                </StyledHeadCell>
                                <StyledHeadCell>
                                    <Loader
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                        }}
                                    />
                                </StyledHeadCell>
                                <StyledHeadCell>
                                    <Loader
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                        }}
                                    />
                                </StyledHeadCell>
                                <StyledHeadCell>
                                    <Loader
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                        }}
                                    />
                                </StyledHeadCell>
                                <StyledHeadCell>
                                    <Loader
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                        }}
                                    />
                                </StyledHeadCell>
                                <StyledHeadCell>
                                    <Loader
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                        }}
                                    />
                                </StyledHeadCell>
                            </StyledHead>
                        ))}
                    </StyledBody>
                </StyledTable>
            </div>
        );
    }
    if (props.user.managerAccess !== true) {
        return (
            <div>
                <Expe
                    columnTitles={[
                        "Project Name",
                        "Merge Request",
                        "Author",
                        "Reviewer",
                        "Target Branch",
                        "Approval Status",
                        "Pipeline Status",
                    ]}
                    loadMoreRows={loadMoreRows}
                    author={author}
                    minWidth="1050px"
                />
                <Notification />
            </div>
        );
    }
    return (
        <>
            <Select
                options={teamMemberList}
                value={author}
                placeholder="Select TeamMember"
                onChange={authorSelect}
                size={SIZE.compact}
                overrides={overRides}
            />

            <br></br>
            <Expe
                columnTitles={[
                    "Project Name",
                    "Merge Request",
                    "Author",
                    "Reviewer",
                    "Target Branch",
                    "Approval Status",
                    "Pipeline Status",
                ]}
                loadMoreRows={loadMoreRows}
                author={author}
                minWidth="1050px"
            />
            <Notification />
        </>
    );
};

export default GitlabProfile;
