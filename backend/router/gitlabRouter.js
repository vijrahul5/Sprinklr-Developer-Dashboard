const express = require("express");
const gitlabRouter = express.Router();

const { submitGitlabAccessToken } = require("../controller/gitlabController");

gitlabRouter.route("/").post(submitGitlabAccessToken);

module.exports = gitlabRouter;
