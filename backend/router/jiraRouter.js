const express = require("express");
const jiraRouter = express.Router();

const { handleNotification } = require("../controller/jiraController.js");

jiraRouter.route("/").post(handleNotification);

module.exports = jiraRouter;
