const employeeModel = require("../model/employeeModel");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const client = new OAuth2Client(`${process.env.CLIENT_ID}`);

async function signIn(req, res) {
    // Receives a token Id and sends a verification request to Google with that token Id. If verified, then session-token
    //is placed in the cookies for the employee who is trying to login
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
    // Verifies if an employee is logged in or not and the session-token is valid or not.
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
    // Middleware to protect all routes which require the  employee to be logged in
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
    // Signs out an employee by clearing the session token.
    res.cookie("session-token", "wrongtoken");
    res.json({
        status: "Success",
    });
}

module.exports.protectRoute = protectRoute;
module.exports.signIn = signIn;
module.exports.signOut = signOut;
module.exports.verify = verify;
