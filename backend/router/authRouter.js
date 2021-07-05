const express = require("express");
const authRouter = express.Router();

const { verify, signIn, signOut } = require("../controller/authController");

authRouter.route("/verify").get(verify);
authRouter.route("/signin").post(signIn);
authRouter.route("/signout").get(signOut);

module.exports = authRouter;
