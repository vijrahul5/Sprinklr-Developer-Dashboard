import { React, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FcApproval, FcHighPriority, FcOk, FcCancel } from "react-icons/fc";
import { Table } from "baseui/table-semantic";
import { Pagination } from "baseui/pagination";
const axios = require("axios");

const GitlabProfile = (props) => {
    console.log("Re render");

    const arr = [
        [
            "Gitlab-authentication",
            "Draft: Gitlab rithik",
            "LiocnKter",
            <FcOk />,
            <FcApproval />,
        ],

        [
            "Bitcoin",
            "Update Element to 1.1.12",
            "Izzy",
            <FcOk />,
            <FcApproval />,
        ],
        ["Bitcoin", "Fix Glider build", "linsui", <FcOk />, <FcCancel />],

        [
            "Gitlab-authentic",
            "Gitlab rithik",
            "LiocnKter",
            <FcCancel />,
            <FcCancel />,
        ],
        [
            "Bitcoin",
            "Update Element to 1.1.12",
            "Izzy",
            <FcOk />,
            <FcApproval />,
        ],
        ["Bitcoin", "Fix Glider build", "linsui", <FcOk />, <FcApproval />],
        ["FirstProject", "No_request", "Not valid", "Not Valid", "Notvalid"],
    ];

    console.log("arr", arr);

    let len = props.post.length;

    let message = "";
    if (len === 0) {
        message = "No open merge request";
    }
    console.log(len, props.post);
    let totalpages = props.post.length / props.postsPerPage + 1;
    const [currentPage, setCurrentPage] = useState(1);
    const { user, isAuthenticated } = useAuth0();
    const indexOfLastPost = currentPage * props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - props.postsPerPage;
    console.log(indexOfFirstPost, indexOfLastPost);
    const currentpost = arr.slice(indexOfFirstPost, indexOfLastPost);

    console.log(props.post, "**");

    return (
        isAuthenticated && (
            <div>
                <h1>gitlab Repo Details</h1>
                <Table
                    columns={[
                        "ProjectName",
                        "Merge-req",
                        "Reviewer",
                        "Approval Status",
                        "Pipeline status",
                    ]}
                    data={currentpost}
                    className="gitlab"
                />

                {
                    <Pagination
                        numPages={totalpages}
                        currentPage={currentPage}
                        onPageChange={({ nextPage }) => {
                            setCurrentPage(Math.min(Math.max(nextPage, 1), 20));
                        }}
                        className="gitlab"
                    />
                }
            </div>
        )
    );
};

export default GitlabProfile;
