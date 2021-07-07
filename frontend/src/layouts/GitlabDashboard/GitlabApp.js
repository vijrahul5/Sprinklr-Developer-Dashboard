import { React, useEffect, useState } from "react";
// import "./App.css";
import LoginButton from "../../components/GitlabButtons/LoginButton";
import LogoutButton from "../../components/GitlabButtons/LogoutButton";
import Profile from "./GitlabProfile";
import { Table } from "baseui/table-semantic";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "baseui/spinner";
const axios = require("axios");

function GitlabApp() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchProjectids = async () => {
            const userdata = await axios.get(
                "https://gitlab.com/api/v4/user?access_token=a47babe4ca273839ce99dc4e4a568ec343a17b3ca830128699c32b0f4e1c5555"
            );
            //console.log(userdata);
            const username = userdata.data.username;
            //console.log(username);
            const res = await axios.get(
                `https://gitlab.com/api/v4/users?username=${username}`
            );

            //console.log(res);

            //console.log(res.data[0].id);

            const projects = await axios.get(
                `https://gitlab.com/api/v4/users/${res.data[0].id}/projects`
            );
            console.log(projects);
            //console.log(projects);
            let arr = [];
            let array_to_pass = [];
            arr.push([36528, "Bitcoin"]);
            projects.data.map((obj) => {
                arr.push([obj.id, obj.name]);
                //console.log(arr);
            });

            await arr.forEach(async (element) => {
                const merge_ids_response = await axios.get(
                    `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests`
                );

                //console.log(merge_ids_response);
                if (merge_ids_response.data.length === 0) {
                    array_to_pass.push([element[1], null, null, null, null]);
                    console.log("entered");
                } else {
                    await merge_ids_response.data.forEach(async (merge_req) => {
                        if (merge_req.iid !== null) {
                            const Pipeline_status = await axios.get(
                                `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests/${merge_req.iid}/pipelines`
                            );
                            //console.log(Pipeline_status);
                            if (Pipeline_status.data.length == 0) {
                                array_to_pass.push([
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
                                    GitlabApproval = "Approved";
                                } else {
                                    GitlabApproval = "Not_Approved_Yet";
                                }

                                array_to_pass.push([
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
                            array_to_pass.push([
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

            setPosts(array_to_pass);
        };

        fetchProjectids();
    }, []);

    const { isLoading } = useAuth0();
    //console.log(isLoading);
    if (isLoading)
        return (
            <div>
                <Spinner />
            </div>
        );

    console.log("1", posts);
    //console.log(currentPage);

    return (
        <>
            <LoginButton />

            <LogoutButton />

            <Profile
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                post={posts}
            />
        </>
    );
}

export default GitlabApp;