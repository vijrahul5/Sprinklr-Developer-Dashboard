const express = require("express");
const jiraNotificationRouter = express.Router();

const {
  handleNotification,
} = require("../controller/jiraNotificationController.js");

jiraNotificationRouter.route("/").post(handleNotification);

module.exports = jiraNotificationRouter;
