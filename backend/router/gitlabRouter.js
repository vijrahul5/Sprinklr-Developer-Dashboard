const express = require("express");
const gitlabRouter = express.Router();

const {
    getGitlabData,
    submitGitlabAccessToken,
} = require("../controller/gitlabController");

gitlabRouter.route("/").get(getGitlabData);
gitlabRouter.route("/").post(submitGitlabAccessToken);

module.exports = gitlabRouter;
