import React from "react";
import { useState, useEffect } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import Profile from "./components/GitlabProfile";

const axios = require("axios");

function GitlabApp({ user }) {
    const mergeRequestPerPage = 8;
    const [gitlabDetails, setgitlabDetails] = useState([]);
    const accessToken = user.gitlabAccessToken;

    const pipelineBuilder = async (projectId, mergeRequests, projectName) => {
        let arrToPass = [];

        const allpipelineStatus = await axios.get(
            `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequests.iid}/pipelines`
        );

        if (allpipelineStatus.data.length == 0) {
            arrToPass.push([
                projectName,
                <a href={mergeRequests.web_url}>{mergeRequests.title}</a>,
                mergeRequests.author.name,
                mergeRequests.merged_by === null
                    ? null
                    : mergeRequests.merged_by.name,
                mergeRequests.target_branch,
                null,
                null,
            ]);
        } else {
            let pipelineStatus = allpipelineStatus.data[0].status;
            let GitlabApproval;
            if (pipelineStatus == "success") {
                GitlabApproval = <FcApproval size={30} />;
                pipelineStatus = <FcApproval size={30} />;
            } else {
                GitlabApproval = <FcCancel size={30} />;
                pipelineStatus = <FcCancel size={30} />;
            }

            arrToPass.push([
                projectName,
                <a href={mergeRequests.web_url}>{mergeRequests.title}</a>,
                mergeRequests.author.name,
                mergeRequests.merged_by === null
                    ? null
                    : mergeRequests.merged_by.name,
                mergeRequests.target_branch,
                GitlabApproval,
                pipelineStatus,
            ]);
        }
        return arrToPass;
    };

    const fetchProject = async () => {
        try {
            const url =
                "https://gitlab.com/api/v4/user?access_token=" + accessToken;
            const userData = await axios.get(url);
            if (!userData) throw new Error("Failed");
            const userName = userData.data.username;

            const res = await axios.get(
                `https://gitlab.com/api/v4/users?username=${userName}`
            );

            const projects = await axios.get(
                "https://gitlab.com/api/v4/users/" +
                    res.data[0].id +
                    "/projects"
            );

            let arr = [];
            let arrToPass = [];
            let finalArray = [];
            const id = 36528;
            const ProjectName = "Bitcoin";
            arr.push([id, ProjectName]);
            projects.data.map((obj) => {
                arr.push([obj.id, obj.name]);
            });
            for (let i = 0; i < arr.length; i++) {
                let element = arr[i];
                const mergeIdsResponse = await axios.get(
                    `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests`
                );
                if (mergeIdsResponse.data.length === 0) {
                    finalArray.push([
                        element[1],
                        "NO_mergeRequestsuest",
                        null,
                        null,
                        null,
                        null,
                    ]);
                } else {
                    for (let i = 0; i < mergeIdsResponse.data.length; i++) {
                        let mergeRequests = mergeIdsResponse.data[i];
                        arrToPass = await pipelineBuilder(
                            element[0],
                            mergeRequests,
                            element[1]
                        );
                        arrToPass.map((data) => {
                            finalArray.push(data);
                        });
                    }
                }
            }

            setgitlabDetails(finalArray);
        } catch (err) {}
    };
    useEffect(() => {
        fetchProject();
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
