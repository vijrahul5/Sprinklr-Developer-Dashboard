const employeeModel = require("../model/employeeModel");
const axios = require("axios");

async function getGitlabData(req, res) {
    const email = req.email;
    try {
        const employee = await employeeModel.findOne({
            email: email,
        });
        if (!employee) throw new Error("Employee not found");
        const gitlabAccessToken = employee.gitlabAccessToken;

        const url =
            "https://gitlab.com/api/v4/user?access_token=" + gitlabAccessToken;
        const userData = await axios.get(url);

        if (!userData) throw new Error("Failed");

        const userName = userData.data.username;
        const userIdData = await axios.get(
            `https://gitlab.com/api/v4/users?username=${userName}`
        );

        if (!userIdData) throw new Error("Failed");

        const projects = await axios.get(
            `https://gitlab.com/api/v4/users/${userIdData.data[0].id}/projects/?access_token=` +
                gitlabAccessToken
        );

        const arr = [];
        // arr.push([36528, "Bitcoin"]);
        projects.data.forEach((obj) => {
            arr.push([obj.id, obj.name]);
        });
        const finalData = [];
        for (let i = 0; i < arr.length; i++) {
            let element = arr[i];
            const merge_ids_response = await axios.get(
                `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests`
            );

            if (merge_ids_response.data.length === 0) {
                finalData.push([
                    element[1],
                    "NO_Merge_Request",
                    null,
                    null,
                    null,
                    null,
                ]);
            } else {
                for (let j = 0; j < merge_ids_response.data.length; j++) {
                    let merge_req = merge_ids_response.data[j];
                    const Pipeline_status = await axios.get(
                        `https://gitlab.com/api/v4/projects/${element[0]}/merge_requests/${merge_req.iid}/pipelines`
                    );
                    if (Pipeline_status.data.length == 0) {
                        finalData.push([
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
                        let GitlabApproval =
                            Pipeline_stat === "success"
                                ? "Approved"
                                : "Not Approved";
                        finalData.push([
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
                }
            }
        }
        res.json({ status: "Success", finalData });
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function submitGitlabAccessToken(req, res) {
    const email = req.email;
    try {
        const employee = await employeeModel.findOne({ email: email });
        employee.gitlabAccessToken = req.body.gitlabAccessToken;
        employee.doneGitlabAuth = true;
        await employee.save();
    } catch (err) {
        res.json({
            status: "Failed",
        });
    }
}

module.exports.getGitlabData = getGitlabData;
module.exports.submitGitlabAccessToken = submitGitlabAccessToken;
