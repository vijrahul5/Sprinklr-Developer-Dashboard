import { React, useEffect, useState } from "react";
import Profile from "./GitlabProfile";
import { FcApproval, FcHighPriority, FcOk, FcCancel } from "react-icons/fc";
const axios = require("axios");

function GitlabApp({ user }) {
    // user.doneGitlabAuth === true -> Table Render else Access Token submission
    // For access token submission -> Post request with exact key 'gitlabAccessToken' on '/api/gitlab'   {gitlabAccessData : ""}; await axios.post("/api/gtilab",{gitlabAccessToken : ""})
    // For get table data -> Get request on '/api/gitlab'

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [posts, setPosts] = useState([]);
    const [eleminatelength, seteleminatelength] = useState(0);
    const accessToken =
        "a47babe4ca273839ce99dc4e4a568ec343a17b3ca830128699c32b0f4e1c5555";
    const fetchProjectids = async () => {
        const url =
            "https://gitlab.com/api/v4/user?access_token=" + accessToken;
        const userdata = await axios.get(url);

        const username = userdata.data.username;

        const res = await axios.get(
            `https://gitlab.com/api/v4/users?username=${username}`
        );

        const projects = await axios.get(
            `https://gitlab.com/api/v4/users/${res.data[0].id}/projects`
        );

        let arr = [];
        arr.push([36528, "Bitcoin"]);
        projects.data.map((obj) => {
            arr.push([obj.id, obj.name]);
        });
        seteleminatelength(arr.length);
        await arr.forEach(async (element) => {
            const merge_ids_response = await axios.get(
                `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests`
            );

            if (merge_ids_response.data.length === 0) {
                arr.push([
                    element[1],
                    "NO_Merge_Request",
                    null,
                    null,
                    null,
                    null,
                ]);
            } else {
                await merge_ids_response.data.forEach(async (merge_req) => {
                    const Pipeline_status = await axios.get(
                        `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests/${merge_req.iid}/pipelines`
                    );
                    //console.log(Pipeline_status);
                    if (Pipeline_status.data.length == 0) {
                        arr.push([
                            element[1],
                            merge_req.title,
                            merge_req.merged_by === null
                                ? null
                                : merge_req.merged_by.name,
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

                        arr.push([
                            element[1],
                            merge_req.title,
                            merge_req.merged_by === null
                                ? null
                                : merge_req.merged_by.name,
                            merge_req.target_branch,
                            GitlabApproval,
                            Pipeline_stat,
                        ]);
                    }
                });
            }
        });

        setPosts(arr);
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
                eleminatelength={eleminatelength}
            />
        </>
    );
}

export default GitlabApp;
