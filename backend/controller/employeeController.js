const employeeModel = require("../model/employeeModel");
const standUpModel = require("../model/standUpModel");
const moment = require("moment");

async function getProfile(req, res) {
    // Gets Employee profile from the employee model
    try {
        const email = req.email;
        const employee = await employeeModel
            .findOne({ email })
            .populate("manager", "email");
        if (employee) {
            res.json({
                status: "Success",
                employee,
            });
        } else {
            throw new Error("Could not get profile");
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function updateProfile(req, res) {
    // Updates Employee profile in the employee model
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        for (let key in req.body) {
            employee[key] = req.body[key];
        }
        await employee.save();
        if (employee) {
            res.json({
                status: "Success",
            });
        } else {
            throw new Error("Could not update profile");
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}
async function deleteProfile(req, res) {
    // Deletes Employee Profile from the employee model
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        const team = await employeeModel.find({ manager: employee });
        team.forEach(async (teamMember) => {
            teamMember.manager = undefined;
            await teamMember.save();
        });
        await employeeModel.deleteOne(employee);
        return res.json({
            status: "Success",
        });
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}
async function getStandUp(req, res) {
    // Gets the employee's stand up from the stand up model
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        if (employee) {
            const today = moment().startOf("day");
            const standUp = await standUpModel.findOne({
                author: employee,
                createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf("day").toDate(),
                },
            });
            if (standUp) {
                return res.json({
                    status: "Success",
                    standUp,
                });
            } else {
                throw new Error("Could not get stand up");
            }
        }
        throw new Error("Could not get stand up");
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}
async function postStandUp(req, res) {
    // Posts an employee's stand up to the stand up model
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        if (employee) {
            const standUp = await standUpModel.create({
                question1: req.body.question1,
                question2: req.body.question2,
                question3: req.body.question3,
                author: employee,
            });
            if (standUp) {
                return res.json({
                    status: "Success",
                });
            }
        }
        throw new Error("Could not post standup");
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function updateStandUp(req, res) {
    // Updates an employee's stand up for the day if it exists in the database
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        if (employee) {
            const today = moment().startOf("day");
            const standUp = await standUpModel.findOne({
                author: employee,
                createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf("day").toDate(),
                },
            });
            if (standUp) {
                for (let key in req.body) {
                    standUp[key] = req.body[key];
                }
                await standUp.save();
                return res.json({
                    status: "Success",
                });
            }
        }
        throw new Error("Could not update standup");
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function deleteStandUp(req, res) {
    // Deletes an employee's stand up for the day
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        if (employee) {
            const today = moment().startOf("day");
            const standUp = await standUpModel.deleteOne({
                author: employee,
                createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf("day").toDate(),
                },
            });

            return res.json({
                status: "Success",
            });
        }
        throw new Error("Could not delete stand up");
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function getTeam(req, res) {
    // Gets an Employee's team's data and the stand ups of the team members for the day
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        const team = await employeeModel.find({ manager: employee });
        if (employee) {
            const teamStandUp = [];
            for (let i = 0; i < team.length; i++) {
                const today = moment().startOf("day");
                const standUp = await standUpModel
                    .findOne({
                        author: team[i],
                        createdAt: {
                            $gte: today.toDate(),
                            $lte: moment(today).endOf("day").toDate(),
                        },
                    })
                    .populate("author", "name email");

                teamStandUp.push({
                    name: team[i].name,
                    email: team[i].email,
                    standUp: standUp,
                });
            }
            return res.json({
                status: "Success",
                teamStandUp,
            });
        }
        throw new Error("Could not get team");
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function postTeam(req, res) {
    // Adds a team member to the employee's team
    try {
        const email = req.email;
        const employeeEmail = req.body.employeeEmail;
        const manager = await employeeModel.findOne({ email });
        const employee = await employeeModel.findOne({ email: employeeEmail });

        if (employee && manager) {
            employee.manager = manager;

            await manager.save();
            await employee.save();

            return res.json({
                status: "Success",
            });
        }
        throw new Error("Could not add team member");
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}
async function deleteTeam(req, res) {
    // Deletes a team member from the employee's team
    try {
        const email = req.email;
        const employeeEmail = req.body.employeeEmail;
        const manager = await employeeModel.findOne({ email });
        const employee = await employeeModel.findOne({ email: employeeEmail });

        if (employee && manager) {
            employee.manager = undefined;
            await manager.save();
            await employee.save();
            return res.json({
                status: "Success",
            });
        }
        throw new Error("Could not delete team member");
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

module.exports.getProfile = getProfile;
module.exports.updateProfile = updateProfile;
module.exports.deleteProfile = deleteProfile;
module.exports.getTeam = getTeam;
module.exports.postTeam = postTeam;
module.exports.deleteTeam = deleteTeam;
module.exports.getStandUp = getStandUp;
module.exports.postStandUp = postStandUp;
module.exports.updateStandUp = updateStandUp;
module.exports.deleteStandUp = deleteStandUp;
