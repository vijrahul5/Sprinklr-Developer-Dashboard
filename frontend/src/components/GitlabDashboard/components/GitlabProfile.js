import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import Table from "../../Table/Table";

import GitlabAccessTokenForm from "./GitlabAccessTokenForm";
import { Select, SIZE } from "baseui/select";
import Loader from "../../../globalComponents/Loader/Tombstone";
const axios = require("axios");

const GitlabProfile = (props) => {
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (props.user.doneGitlabAuth === true) {
            setUserAuthenticated(true);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (props.gitlabDetails.length > 0) {
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
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastMergeRequest = currentPage * props.mergeRequestPerPage;
    const indexOfFirstMergeRequest =
        indexOfLastMergeRequest - props.mergeRequestPerPage;

    const currentMergeRequest = mergeRequestarray.slice(
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

            // setauthor(params.value);
            // console.log("after", params.value[0].label);
            if (params.value.length !== 0) {
                let idx = parseInt(params.value[0].id);

                let pageToSet = Math.ceil(
                    (idx + 1) / props.mergeRequestPerPage
                );

                setCurrentPage(pageToSet);
            }
            setauthor(params.value);
        },
        [setCurrentPage, setauthor, author]
    );

    const projectSelect = useCallback(
        (params) => {
            setProject(params.value);

            if (project.length !== 0) {
                let idx = parseInt(project[0].id);

                let pageToSet = Math.ceil(
                    (idx + 1) / props.mergeRequestPerPage
                );

                setCurrentPage(pageToSet);
            }
        },
        [setCurrentPage, setProject, project]
    );
    const selectProject = mergeRequestarray.map((element, idx) => {
        return { label: element[0], id: idx.toString() };
    });

    const authorList = mergeRequestarray.map((element, idx) => {
        return { label: element[2], id: idx.toString() };
    });
    // const selectMerge = mergeRequestarray
    //.map((element, idx) => {
    //     return { label: element[1], id: idx.toString() };
    // });

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
            {/* <Select
                options={selectProject}
                value={project}
                placeholder="Select Project"
                onChange={projectSelect}
                size={SIZE.compact}
                overrides={overRides}
            /> */}
            <br></br>

            <Table
                data={currentMergeRequest}
                pageNumber={currentPage}
                totalPages={Math.ceil(
                    props.gitlabDetails.length / props.mergeRequestPerPage
                )}
                setPageNumber={setCurrentPage}
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
