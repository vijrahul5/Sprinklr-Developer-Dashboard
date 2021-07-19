const express = require("express");
const gitlabNotificationRouter = express.Router();

const {
    handleNotification,
} = require("../controller/gitlabNotificationController.js");

gitlabNotificationRouter.route("/").post(handleNotification);

module.exports = gitlabNotificationRouter;
