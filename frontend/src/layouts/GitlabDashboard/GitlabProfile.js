import { React, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FcApproval, FcHighPriority, FcOk, FcCancel } from "react-icons/fc";
import { Table } from "baseui/table-semantic";
import { Pagination } from "baseui/pagination";

const GitlabProfile = (props) => {
    const arr = props.post;
    const useFullArr = arr.slice(props.eleminatelength, arr.length);
    let totalpages = Math.ceil(props.post.length / props.postsPerPage) + 1;
    const [currentPage, setCurrentPage] = useState(1);
    const { user, isAuthenticated } = useAuth0();
    const indexOfLastPost = currentPage * props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - props.postsPerPage;
    const currentpost = useFullArr.slice(indexOfFirstPost, indexOfLastPost);

    return (
        isAuthenticated && (
            <div id="gitlabTable">
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

                    <Pagination
                        numPages={totalpages}
                        currentPage={currentPage}
                        onPageChange={({ nextPage }) => {
                            setCurrentPage(Math.min(Math.max(nextPage, 1), 20));
                        }}
                        className="gitlab"
                    />
            </div>
        )
    );
};

export default GitlabProfile;
