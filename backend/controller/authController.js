const employeeModel = require("../model/employeeModel");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const client = new OAuth2Client(`${process.env.CLIENT_ID}`);

async function signIn(req, res) {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: `${process.env.CLIENT_ID}`,
        });
        const { name, email, picture, given_name, family_name } =
            ticket.getPayload();
        const employee = await employeeModel.findOne({ email });
        if (!employee) {
            await employeeModel.create({
                name,
                email,
                picture,
                given_name,
                family_name,
                managerAccess: false,
                doneJiraAuth: false,
                doneGitlabAuth: false,
            });
        }
        res.cookie("session-token", token);
        res.json({
            status: "Success",
        });
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function verify(req, res) {
    try {
        let token = req.cookies["session-token"];
        if (token) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: `${process.env.CLIENT_ID}`,
            });
            res.json({
                status: "Success",
            });
        } else {
            throw new Error("Please Sign In First");
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function protectRoute(req, res, next) {
    try {
        let token = req.cookies["session-token"];
        if (token) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: `${process.env.CLIENT_ID}`,
            });
            const { email } = ticket.getPayload();
            req.email = email;
            next();
        } else {
            throw new Error("Please Sign In First");
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

function signOut(req, res) {
    res.cookie("session-token", "wrongtoken");
    res.json({
        status: "Success",
    });
}

module.exports.protectRoute = protectRoute;
module.exports.signIn = signIn;
module.exports.signOut = signOut;
module.exports.verify = verify;
