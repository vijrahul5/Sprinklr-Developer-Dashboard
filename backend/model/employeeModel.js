const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

mongoose
    .connect(`${process.env.DB_LINK}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Database Error");
        console.log(err.message);
    });

// Model for storing the employee's data
const employeeSchema = new Schema({
    given_name: {
        type: String,
    },
    family_name: {
        type: String,
    },
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true],
    },
    picture: {
        type: String,
    },
    city: {
        type: String,
        maxlength: 40,
    },
    state: {
        type: String,
        maxlength: 40,
    },
    address: {
        type: String,
        maxlength: 300,
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: "employeeModel",
    },
});

const employeeModel = mongoose.model("employeeModel", employeeSchema);

module.exports = employeeModel;
