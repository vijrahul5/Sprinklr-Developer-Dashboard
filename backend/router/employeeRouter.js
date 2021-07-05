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
} = require("../controller/employeeController");

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

module.exports = employeeRouter;
