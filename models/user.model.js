/*
This contains the user schema.
*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
User schema.
*/
const userSchema = new Schema(
    {
        tenant: { type: String, required: true },
        connection: { type: String, required: true },
        email: {
            type: String, required: true, unique: true,
            lowercase: true
        },
        password: { type: String, required: true },
        debug: { type: Boolean, required: false },
        email_verified: { type: Boolean, required: true },
        workout_list: { type: Array, required: true }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;