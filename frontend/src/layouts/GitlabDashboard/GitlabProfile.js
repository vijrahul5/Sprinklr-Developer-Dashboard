import { React, useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "baseui/button";
import { Table } from "baseui/table-semantic";
import { Pagination } from "baseui/pagination";

const GitlabProfile = (props) => {
    const arr = props.post;
    const useFullArr = arr.slice(props.eleminatelength, arr.length);
    console.log(useFullArr);
    let totalpages = Math.ceil(props.post.length / props.postsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    const { user, isAuthenticated } = useAuth0();
    const indexOfLastPost = currentPage * props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - props.postsPerPage;
    const currentpost = useFullArr.slice(indexOfFirstPost, indexOfLastPost);
    const [isDataAsked, setIsDataAsked] = useState(false);
    console.log(props.post.length);
    const [temp, settemp] = useState(0);
    const buttonClick = useCallback(() => {
        setCurrentPage((prev) => prev + 1);
        setIsDataAsked(true);
    }, []);
    if (!isDataAsked && isAuthenticated) {
        return <Button onClick={buttonClick}>Get Gitlab Data</Button>;
    }
    return (
        isAuthenticated && (
            <div id="gitlabTable">
                <Table
                    columns={[
                        "ProjectName",
                        "Merge-req",
                        "Reviewer",
                        "Target-branch",
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
