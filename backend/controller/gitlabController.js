const employeeModel = require("../model/employeeModel");
const axios = require("axios");
const gitlabRouter = require("../router/gitlabRouter");
const Mediator = require("../model/Mediator");
const mediator = new Mediator();

async function submitGitlabAccessToken(req, res) {
    const email = req.email;
    try {
        // const employee = await mediator.get(
        //     employeeModel,
        //     { email: email },
        //     "one"
        // );
        const employee = await employeeModel.findOne({ email: email });
        // await mediator.set(employeeModel, {
        //     gitlabAccessToken: req.body.gitlabAccessToken,
        //     doneGitlabAuth: true,
        // });
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
