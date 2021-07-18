const employeeModel = require("../model/employeeModel");
const standUpModel = require("../model/standUpModel");
const managerModel = require("../model/managerModel");
const moment = require("moment");
// const Mediator = require("../model/Mediator");
// const mediator = new Mediator();

async function getProfile(req, res) {
    // Gets Employee profile from the employee model
    try {
        const email = req.email;
        const employee = await employeeModel
            .findOne({ email })
            .populate("manager", "email");
        // const employee = await mediator.get(employeeModel,{email}).populate("manager", "email");
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
        // const employee = await mediator.get(employeeModel,{email},"one");
        const employee = await employeeModel.findOne({ email });
        // await mediator.set(employee,req.body);
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
        // const employee = await mediator.get(employeeModel,{ email },"one");
        const employee = await employeeModel.findOne({ email });
        // const team = await mediator.get(employeeModel,{ manager: employee },"all");
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
        // const employee = await mediator.get(employeeModel, { email }, "one");
        const employee = await employeeModel.findOne({ email });
        if (employee) {
            const today = moment().startOf("day");
            // const standUp = await mediator.get(
            //     standUpModel,
            //     {
            //         author: employee,
            //         createdAt: {
            //             $gte: today.toDate(),
            //             $lte: moment(today).endOf("day").toDate(),
            //         },
            //     },
            //     "one"
            // );
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
                    questions: standUp.questions,
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
        // const employee = await mediator.get(employeeModel, { email }, "one");
        if (employee) {
            // const standUp = await mediator.create(standUpModel, {
            //     questions: req.body.data,
            //     author: employee,
            // });
            const standUp = await standUpModel.create({
                questions: req.body.data,
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
        // const employee = await mediator.get(employeeModel, { email }, "one");
        if (employee) {
            const today = moment().startOf("day");
            // const standUp = await mediator.get(
            //     standUpModel,
            //     {
            //         author: employee,
            //         createdAt: {
            //             $gte: today.toDate(),
            //             $lte: moment(today).endOf("day").toDate(),
            //         },
            //     },
            //     "one"
            // );
            const standUp = await standUpModel.findOne({
                author: employee,
                createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf("day").toDate(),
                },
            });
            if (standUp) {
                // await mediator.set(standUpModel, { questions: req.body.data });
                standUp.questions = req.body.data;
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
        // const employee = await mediator.get(employeeModel, { email }, "one");
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
        // const employee = await mediator.get(employeeModel, { email }, "one");
        // const team = await mediator.get(
        //     employeeModel,
        //     { manager: employee },
        //     "all"
        // );
        const team = await employeeModel.find({ manager: employee });
        if (employee) {
            const teamStandUp = [];
            for (let i = 0; i < team.length; i++) {
                const today = moment().startOf("day");
                // const standUp = await mediator.get(
                //     standUpModel,
                //     {
                //         author: team[i],
                //         createdAt: {
                //             $gte: today.toDate(),
                //             $lte: moment(today).endOf("day").toDate(),
                //         },
                //     },
                //     "one"
                // );
                const standUp = await standUpModel.findOne({
                    author: team[i],
                    createdAt: {
                        $gte: today.toDate(),
                        $lte: moment(today).endOf("day").toDate(),
                    },
                });

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
        // const manager = await mediator.get(employeeModel, { email }, "one");
        const manager = await employeeModel.findOne({ email });
        // const employee = await mediator.get(
        //     employeeModel,
        //     { email: employeeEmail },
        //     "one"
        // );
        const employee = await employeeModel.findOne({ email: employeeEmail });

        if (employee && manager) {
            // mediator.set(employee, { manager: manager });
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
        // const manager = await mediator.get(employeeModel, { email }, "one");
        const manager = await employeeModel.findOne({ email });
        // const employee = await mediator.get(
        //     employeeModel,
        //     { email: employeeEmail },
        //     "one"
        // );
        const employee = await employeeModel.findOne({ email: employeeEmail });

        if (employee && manager) {
            // await mediator.set(employee, { manager: undefined });
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

async function getManagerAccess(req, res) {
    try {
        const email = req.email;
        console.log(email, req);
        // const employee = await mediator.get(
        //     employeeModel,
        //     { email: email },
        //     "one"
        // );
        const employee = await employeeModel.findOne({ email: email });
        // const checkManager = await mediator.get(
        //     managerModel,
        //     { email: email },
        //     "one"
        // );
        console.log(employee);
        const checkManager = await managerModel.findOne({ email: email });
        console.log(checkManager);
        if (!checkManager || !employee) {
            throw new Error("Request Denied !");
        } else {
            // await mediator.set(employee, { managerAccess: true });
            employee.managerAccess = true;
            await employee.save();
            return res.json({
                status: "Success",
            });
        }
    } catch (err) {
        console.log(err.message);
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
module.exports.getManagerAccess = getManagerAccess;
