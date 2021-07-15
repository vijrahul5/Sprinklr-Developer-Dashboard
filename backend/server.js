const express = require("express");
const cookieParser = require("cookie-parser");
const { protectRoute } = require("./controller/authController");
const jiraNotificationRouter = require("./router/jiraNotificationRouter");
const authRouter = require("./router/authRouter");
const employeeRouter = require("./router/employeeRouter");
const jiraRouter = require("./router/jiraRouter");
const adminRouter = require("./router/adminRouter");
const gitlabRouter = require("./router/gitlabRouter");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/jiranotification", jiraNotificationRouter);
app.use(protectRoute);
app.use("/api/employee", employeeRouter); 
app.use("/api/jira", jiraRouter);
app.use("/api/gitlab", gitlabRouter);
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port, function () {
    console.log("Server started successfully at port: " + port);
});

// app.use("/api/admin", adminRouter);