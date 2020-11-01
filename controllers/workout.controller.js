/*
Api controller for workout.
*/

let Workout = require("../models/workout.model");

/*
Normal get request, return all workouts.
*/
exports.getWorkout = (req, res) => {
    Workout.find()
        .then((workout) => res.json(workout))
        .catch((err) => res.status(400).json("Error: " + err));
}

/*
Get request for a specific workout given an ID.
*/
exports.getWorkoutById = (req, res) => {
    Workout.findById(req.params.id)
        .then((workout) => res.json(workout))
        .catch((err) => res.status(400).json("Error: " + err));
}

/*
Delete a specific workout given an ID.
*/
exports.deleteWorkoutById = (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
        .then(() => res.json("Workout deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
}

/*
Post request for creating a new workout.
*/
exports.createWorkout = (req, res) => {

    workoutFields = {};
    workoutFields.shotList = req.body.shotList;
    workoutFields.startdate = Date.parse(req.body.startdate);
    if (req.body.description) { workoutFields.description = req.body.description; }
    if (req.body.enddate) { workoutFields.enddate = Date.parse(req.body.enddate); }

    const newWorkout = new Workout(workoutFields);

    newWorkout
        .save()
        .then(() => res.json("workout added!"))
        .catch((err) => res.status(400).json("Error: " + err));
}

/*
Put request for updating a workouts's shot list given a workout ID.
*/
exports.updateWorkoutById = (req, res) => {
    const workoutId = req.body.workoutId;
    const updatedList = req.body.updatedList;
    Workout.updateOne({ "_id": ObjectID(workoutId) }, { $set: { "shotList": updatedList } })
        .then(() => res.json("Workout's shot list updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
}