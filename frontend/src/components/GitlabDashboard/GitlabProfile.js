import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import Table from "../table/Table";

import GitlabAccessTokenForm from "./GitlabAccessTokenForm";
import { Select, SIZE } from "baseui/select";
import Loader from "../loaders/Tombstone";
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

    let arr = props.gitlabDetails;

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - props.postsPerPage;
    const currentpost = arr.slice(indexOfFirstPost, indexOfLastPost);

    const [project, setProject] = useState([]);
    const [mergeRequest, setMergeRequest] = useState([]);
    const overRides = {
        ControlContainer: {
            style: () => ({
                borderRadius: "4px",
            }),
        },
    };
    const mergeRequestSelect = useCallback(
        (params) => {
            setMergeRequest(params.value);

            if (mergeRequest.length !== 0) {
                let idx = parseInt(mergeRequest[0].id);

                let pageToSet = Math.ceil((idx + 1) / props.postsPerPage);

                setCurrentPage(pageToSet);
            }
        },
        [setCurrentPage, setMergeRequest, mergeRequest]
    );

    const projectSelect = useCallback(
        (params) => {
            setProject(params.value);

            if (project.length !== 0) {
                let idx = parseInt(project[0].id);

                let pageToSet = Math.ceil((idx + 1) / props.postsPerPage);

                setCurrentPage(pageToSet);
            }
        },
        [setCurrentPage, setProject, project]
    );
    const selectProject = arr.map((element, idx) => {
        return { label: element[0], id: idx.toString() };
    });

    const selectMerge = arr.map((element, idx) => {
        return { label: element[1], id: idx.toString() };
    });

    if (!isUserAuthenticated) {
        return <GitlabAccessTokenForm submitToken={submitToken} />;
    }

    if (loading) {
        return <Loader />;
    }
    return (
        <div>
            <Select
                options={selectMerge}
                value={mergeRequest}
                placeholder="Select Merge Request"
                onChange={mergeRequestSelect}
                size={SIZE.compact}
                overrides={overRides}
            />
            <br></br>
            <Select
                options={selectProject}
                value={project}
                placeholder="Select Project"
                onChange={projectSelect}
                size={SIZE.compact}
                overrides={overRides}
            />
            <br></br>

            <Table
                data={currentpost}
                pageNumber={currentPage}
                totalPages={Math.ceil(
                    props.gitlabDetails.length / props.postsPerPage
                )}
                setPageNumber={setCurrentPage}
                loading={false}
                columnTitles={[
                    "Project Name",
                    "Merge Request",
                    "Status",
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
