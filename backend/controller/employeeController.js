const employeeModel = require("../model/employeeModel");
const standUpModel = require("../model/standUpModel");
const managerModel = require("../model/managerModel");
const learningModel = require("../model/learningModel");
const moment = require("moment");

async function getProfile(req, res) {
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
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        if (employee) {
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
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email });
        const team = await employeeModel.find({ manager: employee });
        if (employee) {
            const teamStandUp = [];
            for (let i = 0; i < team.length; i++) {
                const today = moment().startOf("day");
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

async function getManagerAccess(req, res) {
    try {
        const email = req.email;
        const employee = await employeeModel.findOne({ email: email });
        const checkManager = await managerModel.findOne({ email: email });
        if (!checkManager || !employee) {
            throw new Error("Request Denied !");
        } else {
            employee.managerAccess = true;
            await employee.save();
            return res.json({
                status: "Success",
            });
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

async function getLearningResources(req, res) {
    const email = req.email;
    try {
        const employee = await employeeModel.findOne({ email: email });
        if (!employee) throw new Error("Failed");
        if (employee.managerAccess) {
            if (employee.manager) {
                const manager1 = employee;
                const manager2 = employee.manager;

                let learningResources1 = await learningModel
                    .find({
                        teamManager: manager1,
                    })
                    .sort({ createdAt: "desc" })
                    .populate("author")
                    .populate("teamManager")
                    .populate("markedBy");
                let learningResources2 = await learningModel
                    .find({
                        teamManager: manager2,
                    })
                    .sort({ createdAt: "desc" })
                    .populate("author")
                    .populate("teamManager")
                    .populate("markedBy");
                learningResources2 = learningResources2.filter(
                    (resource) => resource.author.email !== email
                );
                res.json({
                    status: "Success",
                    learningResources: [
                        ...learningResources1,
                        ...learningResources2,
                    ],
                });
            } else {
                const manager1 = employee;
                let learningResources1 = await learningModel
                    .find({
                        teamManager: manager1,
                    })
                    .sort({ createdAt: "desc" })
                    .populate("author")
                    .populate("teamManager")
                    .populate("markedBy");
                if (!learningResources1) throw new Error("Failed");
                res.json({
                    status: "Success",
                    learningResources: [...learningResources1],
                });
            }
        } else {
            const manager = employee.manager;
            let learningResources = await learningModel
                .find({
                    teamManager: manager,
                })
                .sort({ createdAt: "desc" })
                .populate("author")
                .populate("teamManager")
                .populate("markedBy");

            if (!learningResources) throw new Error("Failed");
            res.json({
                status: "Success",
                learningResources,
            });
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}
async function postLearningResources(req, res) {
    const email = req.email;
    try {
        const employee = await employeeModel.findOne({ email: email });
        if (!employee) throw new Error("Failed");
        if (employee.managerAccess) {
            if (employee.manager) {
                const manager1 = employee;
                const manager2 = employee.manager;
                await learningModel.create({
                    title: req.body.title,
                    link: req.body.link,
                    author: employee,
                    teamManager: manager1,
                });
                let learningResource = await learningModel.create({
                    title: req.body.title,
                    link: req.body.link,
                    author: employee,
                    teamManager: manager2,
                });
                learningResource.markedBy.push(employee);
                await learningResource.save();
                res.json({
                    status: "Success",
                });
            } else {
                const manager1 = employee;
                await learningModel.create({
                    title: req.body.title,
                    link: req.body.link,
                    author: employee,
                    teamManager: manager1,
                });
                res.json({
                    status: "Success",
                });
            }
        } else {
            const manager = employee;
            await learningModel.create({
                title: req.body.title,
                link: req.body.link,
                author: employee,
                teamManager: manager,
            });
            res.json({
                status: "Success",
            });
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}
async function updateLearningResources(req, res) {
    const email = req.email;
    try {
        const employee = await employeeModel.findOne({ email: email });
        if (!employee) throw new Error("Failed");
        const manager = employee.managerAccess ? employee : employee.manager;
        const learningResource = await learningModel
            .findOne({
                _id: req.body.resourceId,
            })
            .populate("markedBy");
        if (!learningResource) throw new Error("Failed");
        let markArray = learningResource.markedBy;
        markArray = markArray.filter(
            (markedEmployee) => markedEmployee.email !== employee.email
        );
        if (req.body.marked) {
            markArray.push(employee);
        }
        learningResource.markedBy = markArray;
        await learningResource.save();
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
async function deleteLearningResources(req, res) {
    const email = req.email;
    try {
        const employee = await employeeModel.findOne({ email: email });
        if (!employee) throw new Error("Failed");
        const manager = employee.managerAccess ? employee : employee.manager;
        await learningModel.deleteOne({
            _id: req.body.resourceId,
        });
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
module.exports.getLearningResources = getLearningResources;
module.exports.postLearningResources = postLearningResources;
module.exports.updateLearningResources = updateLearningResources;
module.exports.deleteLearningResources = deleteLearningResources;
