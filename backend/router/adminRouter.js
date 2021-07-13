const express = require("express");
const { giveManagerAccess } = require("../controller/adminController");
const adminRouter = express.Router();

adminRouter.route("/manageraccess").post(giveManagerAccess);

module.exports = adminRouter;
