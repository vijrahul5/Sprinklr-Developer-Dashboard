const express = require("express");
const jiraRouter = express.Router();

const {
  setupJira,
  getDataByJql,
  authenticated,
  webhookToken,
  getFilters,
} = require("../controller/jiraController.js");

jiraRouter.route("/").post(setupJira);
jiraRouter.route("/getDataByJql").post(getDataByJql);
jiraRouter.route("/authenticated").get(authenticated);
jiraRouter.route("/webhookToken").get(webhookToken);
jiraRouter.route("/getFilters").get(getFilters);
module.exports = jiraRouter;
