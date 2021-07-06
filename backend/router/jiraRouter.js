const express = require("express");
const jiraRouter = express.Router();

const {
  setupJira,
  getDataByJql,
  authenticated,
  webhookToken,
} = require("../controller/jiraController.js");

jiraRouter.route("/").post(setupJira);
jiraRouter.route("/getDataByJql").post(getDataByJql);
jiraRouter.route("/authenticated").get(authenticated);
jiraRouter.route("/webhookToken").get(webhookToken);
module.exports = jiraRouter;
