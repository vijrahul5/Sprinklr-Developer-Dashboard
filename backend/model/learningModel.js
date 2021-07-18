const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const learningSchema = new Schema(
    {
        title: { type: String, required: true },
        link: { type: String, required: true },
        markedBy: [{ type: Schema.Types.ObjectId, ref: "employeeModel" }],
        author: {
            type: Schema.Types.ObjectId,
            ref: "employeeModel",
            required: true,
        },
        teamManager: {
            type: Schema.Types.ObjectId,
            ref: "employeeModel",
            required: true,
        },
    },
    { timestamps: true }
);

const learningModel = mongoose.model("learningModel", learningSchema);

module.exports = learningModel;
