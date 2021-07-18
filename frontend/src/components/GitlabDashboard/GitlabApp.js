//libraries
import React from "react";
import { useState, useEffect, lazy } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import RequestPipeline from "./components/PipelineProcessor";
import getArrayOfProjects from "./Functions/GetArrayOfProjects";
import getMergeRequests from "./Functions/GetMergeRequests";
import getPipeline from "./Functions/GetPipeline";
//utils
const Profile = lazy(() => import("./components/GitlabProfile"));
const axios = require("axios");

function GitlabApp({ user }) {
    const mergeRequestPerPage = 8;
    const [gitlabDetails, setgitlabDetails] = useState([]);
    const accessToken = user.gitlabAccessToken;

    async function shouldExecuteNext(next, prev) {
        let tempResult = await next(prev);
        if (tempResult === [] || tempResult === ["error"]) {
            return null;
        }

        return tempResult;
    }

    async function mergeRequestData() {
        const gitlabmerge = new RequestPipeline(
            [getArrayOfProjects, getMergeRequests, getPipeline],
            accessToken,
            shouldExecuteNext
        );
        const result = await gitlabmerge.processor();
        const projectName = result[2];
        if (result.length === 0) {
            return ["error"];
        }
        const mergeRequestsResult = result[1];
        if (
            mergeRequestsResult === undefined ||
            (mergeRequestsResult && mergeRequestsResult.length === 0)
        ) {
            return ["error"];
        }

        const pipelineResult = result[0];
        if (pipelineResult && pipelineResult.length === 0) {
            return mergeRequestsResult;
        }

        if (pipelineResult === []) {
            return mergeRequestsResult;
        }
        let pi = 0;
        const arr = [];
        for (let i = 0; i < mergeRequestsResult.length; i++) {
            if (mergeRequestsResult[i].length !== 0) {
                for (let j = 0; j < mergeRequestsResult[i].length; j++) {
                    if (pipelineResult[pi].length !== 0) {
                        arr.push([
                            projectName[i][1],
                            <a href={mergeRequestsResult[i][j].web_url}>
                                {mergeRequestsResult[i][j].title}
                            </a>,
                            mergeRequestsResult[i][j].author.name,
                            mergeRequestsResult[i][j].merged_by === null
                                ? null
                                : mergeRequestsResult[i][j].merged_by.name,
                            mergeRequestsResult[i][j].target_branch,
                            pipelineResult[pi][0].status === "success" ? (
                                <FcApproval size={30} />
                            ) : (
                                <FcCancel size={30} />
                            ),
                            pipelineResult[pi][0].status === "success" ? (
                                <FcApproval size={30} />
                            ) : (
                                <FcCancel size={30} />
                            ),
                        ]);
                        pi++;
                    } else {
                        arr.push([
                            projectName[i][1],
                            <a href={mergeRequestsResult[i][j].web_url}>
                                {mergeRequestsResult[i][j].title}
                            </a>,
                            mergeRequestsResult[i][j].author.name,
                            mergeRequestsResult[i][j].merged_by === null
                                ? null
                                : mergeRequestsResult[i][j].merged_by.name,
                            mergeRequestsResult[i][j].target_branch,
                            null,
                            null,
                        ]);

                        pi++;
                    }
                }
            }
        }
        setgitlabDetails(arr);
    }

    useEffect(() => {
        //fetchProject();
        mergeRequestData();
    }, []);
    return (
        <>
            <Profile
                mergeRequestPerPage={mergeRequestPerPage}
                gitlabDetails={gitlabDetails}
                user={user}
            />
        </>
    );
}

export default GitlabApp;
