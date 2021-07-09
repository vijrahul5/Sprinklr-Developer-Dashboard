const managerModel = require("../model/managerModel");

async function giveManagerAccess(req, res) {
    const { adminId, adminPassword, accessEmail } = req.body;
    console.log(adminId,adminPassword,accessEmail);

    try {
        if (
            adminId === "admin@sprinklr" &&
            adminPassword === "sprinklr123" &&
            accessEmail
        ) {
            const manager = await managerModel.findOne({ email: accessEmail });
            if (manager) {
                return res.json({
                    status: "Success",
                });
            } else {
                await managerModel.create({
                    email: accessEmail,
                });
            }
        } else {
            throw new Error("Error Occurred");
        }
    } catch (err) {
        res.json({
            status: "Failed",
            error: err.message,
        });
    }
}

module.exports.giveManagerAccess = giveManagerAccess;
