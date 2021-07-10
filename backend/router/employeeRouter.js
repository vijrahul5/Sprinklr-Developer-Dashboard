const express = require("express");
const employeeRouter = express.Router();

const {
    getProfile,
    updateProfile,
    deleteProfile,
    getTeam,
    postTeam,
    deleteTeam,
    getStandUp,
    postStandUp,
    updateStandUp,
    deleteStandUp,
    getManagerAccess,
} = require("../controller/employeeController");
const employeeModel = require("../model/employeeModel");

employeeRouter
    .route("/profile")
    .get(getProfile)
    .patch(updateProfile)
    .delete(deleteProfile);
employeeRouter
    .route("/standup")
    .get(getStandUp)
    .post(postStandUp)
    .patch(updateStandUp)
    .delete(deleteStandUp);

employeeRouter.route("/team").get(getTeam).post(postTeam).delete(deleteTeam);

employeeRouter.route("/manageraccess").get(getManagerAccess);

module.exports = employeeRouter;
