import { React, useEffect, useState } from "react";
import Profile from "./GitlabProfile";
import { FcApproval, FcCancel } from "react-icons/fc";
const axios = require("axios");

function GitlabApp({ user }) {
    console.log("user", user);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    const [posts, setPosts] = useState([]);
    const accessToken = user.gitlabAccessToken;
    //pipelinBuilder Implemented
    const pipelineBuilder = async (projectId, merge_req, ProjectName) => {
        let arr_to_pass = [];

        const Pipeline_status = await axios.get(
            `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${merge_req.iid}/pipelines`
        );
        //console.log(Pipeline_status);
        if (Pipeline_status.data.length == 0) {
            arr_to_pass.push([
                ProjectName,
                <a href={merge_req.web_url}>{merge_req.title}</a>,
                merge_req.merge_status,
                merge_req.merged_by === null ? null : merge_req.merged_by.name,
                merge_req.target_branch,
                null,
                null,
            ]);
        } else {
            let Pipeline_stat = Pipeline_status.data[0].status;
            let GitlabApproval;
            if (Pipeline_stat == "success") {
                GitlabApproval = <FcApproval size={30} />;
                Pipeline_stat = <FcApproval size={30} />;
            } else {
                GitlabApproval = <FcCancel size={30} />;
                Pipeline_stat = <FcCancel size={30} />;
            }

            arr_to_pass.push([
                ProjectName,
                <a href={merge_req.web_url}>{merge_req.title}</a>,
                merge_req.merge_status,
                merge_req.merged_by === null ? null : merge_req.merged_by.name,
                merge_req.target_branch,
                GitlabApproval,
                Pipeline_stat,
            ]);
        }
        return arr_to_pass;
    };

    const fetchProjectids = async () => {
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
            console.log("projects", projects);
            let arr = [];
            let arr_to_pass = [];
            let finalArray = [];
            arr.push([36528, "Bitcoin"]);
            projects.data.map((obj) => {
                arr.push([obj.id, obj.name]);
            });
            for (let i = 0; i < arr.length; i++) {
                let element = arr[i];
                const merge_ids_response = await axios.get(
                    `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests`
                );
                if (merge_ids_response.data.length === 0) {
                    finalArray.push([
                        element[1],
                        "NO_Merge_Request",
                        null,
                        null,
                        null,
                        null,
                    ]);
                } else {
                    for (let i = 0; i < merge_ids_response.data.length; i++) {
                        let merge_req = merge_ids_response.data[i];
                        arr_to_pass = await pipelineBuilder(
                            element[0],
                            merge_req,
                            element[1]
                        );
                        arr_to_pass.map((data) => {
                            finalArray.push(data);
                        });
                        //console.log(arr_to_pass);
                    }
                }
            }
            //console.log(finalArray);
            setPosts(finalArray);
        } catch (err) {}
    };
    useEffect(() => {
        fetchProjectids();
    }, []);
    return (
        <>
            <Profile
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                post={posts}
                user={user}
            />
        </>
    );
}

export default GitlabApp;
