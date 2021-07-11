import { React, useEffect, useState, useCallback } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { Button } from "baseui/button";
//import { Table } from "baseui/table-semantic";
import Table from "../../components/Table/Table";
//import { Pagination } from "baseui/pagination";
import GitlabAccessTokenForm from "./GitlabAccessTokenForm";
import { Select } from "baseui/select";
const axios = require("axios");

const GitlabProfile = (props) => {
    const [finalArrayData, setFinalArrayData] = useState([]);
    const [isDataAvilable, setAvilable] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (props.user.doneGitlabAuth === true) {
            console.log("ii", props.user.doneGitlabAuth);

            //const res = await axios.get("/api/gitlab");

            setAvilable(true);
            //console.log("res", res);
            //setFinalArrayData(res.data.finalData);

            //get response and set array of table data;
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (props.post.length > 0) {
            setLoading(false);
        }
    }, [props]);

    const submitToken = async (token) => {
        console.log("token", token);
        try {
            const res = await axios.post("/api/gitlab", {
                gitlabAccessToken: token,
            });
            console.log(res);
            console.log(res.data.status);
        } catch (err) {}
    };

    const arr = props.post;

    let useFullArr = arr;

    //console.log(useFullArr);
    // for (let i = 0; i < useFullArr.length; i++) {
    //     let l = useFullArr[i].length;

    //     for (let j = 0; j < l; j++) {
    //         // if (j == 1) {
    //         //     let webUrl = useFullArr[i][j].web_url;
    //         //     let title = useFullArr[i][j].title;

    //         //     useFullArr[i][j] = <a href={webUrl}>{title}</a>;
    //         // }
    //         if (
    //             useFullArr[i][j] == "Approved" ||
    //             useFullArr[i][j] == "success"
    //         ) {
    //             useFullArr[i][j] = <FcApproval size={30} />;
    //         }
    //         if (
    //             useFullArr[i][j] == "Not Approved" ||
    //             useFullArr[i][j] == "failed"
    //         ) {
    //             useFullArr[i][j] = <FcCancel size={30} />;
    //         }
    //     }
    // }
    let totalpages = Math.ceil(props.post.length / props.postsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - props.postsPerPage;
    const currentpost = useFullArr.slice(indexOfFirstPost, indexOfLastPost);
    const [isDataAsked, setIsDataAsked] = useState(false);
    const [project, setProject] = useState([]);
    const [mergeRequest, setMergeRequest] = useState([]);
    const buttonClick = useCallback(() => {
        setCurrentPage((prev) => prev + 1);
        setIsDataAsked(true);
    }, []);

    const selectProject = useFullArr.map((element, idx) => {
        return { label: element[0], id: idx.toString() };
    });

    const selectMerge = useFullArr.map((element, idx) => {
        return { label: element[1], id: idx.toString() };
    });
    //console.log(selectMerge);
    if (!isDataAvilable) {
        //render from
        return <GitlabAccessTokenForm submitToken={submitToken} />;
    }

    if (loading) {
        return <h1>loading...</h1>;
    }
    return (
        <div id="gitlabTable">
            {/* <Select
                options={selectProject}
                value={value}
                placeholder="Select Project"
                onChange={(params) => {
                    setValue(params.value);
                }}
            /> */}
            <Select
                options={selectMerge}
                value={mergeRequest}
                placeholder="Select MergeReqest"
                onChange={(params) => {
                    setMergeRequest(params.value);

                    if (mergeRequest.length !== 0) {
                        let idx = parseInt(mergeRequest[0].id);
                        //console.log("idx", idx, mergeRequest[0].label);
                        let pageToSet = Math.ceil(
                            (idx + 1) / props.postsPerPage
                        );
                        console.log(pageToSet);
                        setCurrentPage(pageToSet);
                    }
                }}
            />
            <br></br>
            <Select
                options={selectProject}
                value={project}
                placeholder="Select Project"
                onChange={(params) => {
                    setProject(params.value);
                    console.log("value", project);
                    if (project.length !== 0) {
                        let idx = parseInt(project[0].id);
                        console.log("idx", idx, project[0].label);
                        let pageToSet = Math.ceil(
                            (idx + 1) / props.postsPerPage
                        );
                        console.log(pageToSet);
                        setCurrentPage(pageToSet);
                    }
                }}
            />
            <br></br>
            {/* <Select
                options={[
                    { label: "AliceBlue", id: "#F0F8FF" },
                    { label: "AntiqueWhite", id: "#FAEBD7" },
                    { label: "Aqua", id: "#00FFFF" },
                    { label: "Aquamarine", id: "#7FFFD4" },
                    { label: "Azure", id: "#F0FFFF" },
                    { label: "Beige", id: "#F5F5DC" },
                ]}
                value={mergeRequest}
                placeholder="Select mergeRequest"
                onChange={(params) => setMergeRequest(params.value)}
            /> */}
            {/* <Table
                columns={[
                    "ProjectName",
                    "Merge-Request",
                    "Merge-Status",
                    "Reviewer",
                    "Target-Branch",
                    "Approval-Status",
                    "Pipeline-Status",
                ]}
                data={currentpost}
                className="gitlab"
            />
            <br></br>
            <br></br>
            <br></br>
            <div id="pagination">
                <Pagination
                    numPages={totalpages}
                    currentPage={currentPage}
                    onPageChange={({ nextPage }) => {
                        setCurrentPage(Math.min(Math.max(nextPage, 1), 20));
                    }}
                    className="gitlab"
                /> */}

            {/* </div> */}
            <Table
                data={currentpost}
                pageNumber={currentPage}
                totalPages={Math.ceil(props.post.length / props.postsPerPage)}
                setPageNumber={setCurrentPage}
                loading={false}
                columnTitles={[
                    "ProjectName",
                    "Merge-Request",
                    "Merge-Status",
                    "Reviewer",
                    "Target-Branch",
                    "Approval-Status",
                    "Pipeline-Status",
                ]}
            />
        </div>
    );
};

export default GitlabProfile;
