const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Model for storing stand ups
const managerSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

const managerModel = mongoose.model("managerModel", managerSchema);

module.exports = managerModel;
