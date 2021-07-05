const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Model for storing stand ups
const standUpSchema = new Schema(
    {
        question1: { type: String, required: true, max: 500 },
        question2: { type: String, required: true, max: 500 },
        question3: { type: String, required: true, max: 500 },
        author: {
            type: Schema.Types.ObjectId,
            ref: "employeeModel",
            required: true,
        },
    },
    { timestamps: true }
);

const standUpModel = mongoose.model("standUpModel", standUpSchema);

module.exports = standUpModel;
