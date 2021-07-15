import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import Table from "../../table/Table";

import GitlabAccessTokenForm from "./GitlabAccessTokenForm";
import { Select, SIZE } from "baseui/select";
import Loader from "../../loaders/Tombstone";
const axios = require("axios");

const GitlabProfile = (props) => {
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentMergeRequest, setcurrentMergeRequest] = useState([]);
    const [mergeRequestToShow, setmergeRequestToShow] = useState([]);
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
                return element[2] === "Ashutosh Gangwar";
            });
            setmergeRequestToShow(initial);
            setLoading(false);
        }
    }, [props]);

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

    let mergeRequestarray = props.gitlabDetails;
    mergeRequestarray.sort(function (a, b) {
        return a[2] - b[2];
    });

    console.log("currentMergeRequest", currentMergeRequest);

    const [currentMergeRequestPage, setcurrentMergeRequestPage] = useState(1);

    const indexOfLastMergeRequest =
        currentMergeRequestPage * props.mergeRequestPerPage;
    const indexOfFirstMergeRequest =
        indexOfLastMergeRequest - props.mergeRequestPerPage;

    const currentMergeRequestMergeRequest = mergeRequestToShow.slice(
        indexOfFirstMergeRequest,
        indexOfLastMergeRequest
    );

    const [project, setProject] = useState([]);
    const [author, setauthor] = useState([]);
    const overRides = {
        ControlContainer: {
            style: () => ({
                borderRadius: "4px",
            }),
        },
    };
    const authorSelect = useCallback(
        (params) => {
            console.log("before", params.value);

            if (params.value.length !== 0) {
                let idx = parseInt(params.value[0].id);

                let temp = currentMergeRequest.filter((element) => {
                    return element[2] == params.value[0].label;
                });

                setmergeRequestToShow(temp);
            }
            setauthor(params.value);
        },
        [setcurrentMergeRequestPage, setauthor, author]
    );

    const authorList = mergeRequestarray.map((element, idx) => {
        return { label: element[2], id: idx.toString() };
    });
    const uniqueSelect = [...new Set(authorList)];
    console.log(uniqueSelect);

    if (!isUserAuthenticated) {
        return <GitlabAccessTokenForm submitToken={submitToken} />;
    }

    if (loading) {
        return <Loader />;
    }
    return (
        <div>
            <Select
                options={authorList}
                value={author}
                placeholder="Select Author"
                onChange={authorSelect}
                size={SIZE.compact}
                overrides={overRides}
            />

            <br></br>

            <Table
                data={mergeRequestToShow}
                pageNumber={currentMergeRequestPage}
                totalPages={Math.ceil(
                    mergeRequestToShow.length / props.mergeRequestPerPage
                )}
                setPageNumber={setcurrentMergeRequestPage}
                loading={false}
                columnTitles={[
                    "Project Name",
                    "Merge Request",
                    "Author",
                    "Reviewer",
                    "Target Branch",
                    "Approval Status",
                    "Pipeline Status",
                ]}
            />
        </div>
    );
};

export default GitlabProfile;
