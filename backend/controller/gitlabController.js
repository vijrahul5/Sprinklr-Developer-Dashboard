const employeeModel = require("../model/employeeModel");
const axios = require("axios");
const gitlabRouter = require("../router/gitlabRouter");

async function submitGitlabAccessToken(req, res) {
    const email = req.email;
    try {
        const employee = await employeeModel.findOne({ email: email });
        employee.gitlabAccessToken = req.body.gitlabAccessToken;
        employee.doneGitlabAuth = true;
        await employee.save();
        res.json({
            status: "Success",
        });
    } catch (err) {
        res.json({
            status: "Failed",
        });
    }
}

module.exports.submitGitlabAccessToken = submitGitlabAccessToken;
