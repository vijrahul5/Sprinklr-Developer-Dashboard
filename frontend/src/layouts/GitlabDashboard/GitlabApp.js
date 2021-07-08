import { React, useEffect, useState } from "react";
// import "./App.css";
import LoginButton from "../../components/GitlabButtons/LoginButton";
import Profile from "./GitlabProfile";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "baseui/spinner";
import { FcApproval, FcHighPriority, FcOk, FcCancel } from "react-icons/fc";
const axios = require("axios");

function GitlabApp() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    const [posts, setPosts] = useState([]);
    const [eleminatelength, seteleminatelength] = useState(0);
    useEffect(() => {
        const fetchProjectids = async () => {
            const userdata = await axios.get(
                "https://gitlab.com/api/v4/user?access_token=a47babe4ca273839ce99dc4e4a568ec343a17b3ca830128699c32b0f4e1c5555"
            );

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
                    ]);
                } else {
                    await merge_ids_response.data.forEach(async (merge_req) => {
                        if (merge_req.iid !== null) {
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
                                    null,
                                    null,
                                ]);
                            } else {
                                let Pipeline_stat =
                                    Pipeline_status.data[0].status;
                                let GitlabApproval;
                                if (Pipeline_stat == "success") {
                                    GitlabApproval = <FcOk />;
                                    Pipeline_stat = <FcApproval />;
                                } else {
                                    GitlabApproval = <FcCancel />;
                                    Pipeline_stat = <FcCancel />;
                                }

                                arr.push([
                                    element[1],
                                    merge_req.title,
                                    merge_req.merged_by === null
                                        ? null
                                        : merge_req.merged_by.name,
                                    GitlabApproval,
                                    Pipeline_stat,
                                ]);
                            }
                        } else {
                            arr.push([
                                element[1],
                                merge_req.title,
                                merge_req.merged_by === null
                                    ? null
                                    : merge_req.merged_by.name,
                                null,
                                null,
                            ]);
                        }
                    });
                }
            });

            setPosts(arr);
        };

        fetchProjectids();
    }, []);

    const { isLoading } = useAuth0();

    if (isLoading)
        return (
            <div>
                <Spinner />
            </div>
        );

    return (
        <>
            <LoginButton />

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
