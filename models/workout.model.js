/*
This contains the workout schema.
*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
Workout schema.
*/
const workoutSchema = new Schema(
    {
        shotList: { type: Array, required: true },
        userEmail: { type: String, required: false },
        startdate: { type: Date, required: false },
        enddate: { type: Date, required: false },
    },
    { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;