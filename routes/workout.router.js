/*
Api routes for workouts.
*/

const router = require("express").Router();
let Workout = require("../models/workout.model");

/*
Normal get request, return all workouts.
*/
router.route("/").get((req, res) => {
    Workout.find()
        .then((workout) => res.json(workout))
        .catch((err) => res.status(400).json("Error: " + err));
});

/*
Get request for a specific workout given an ID.
*/
router.route("/:id").get((req, res) => {
    Workout.findById(req.params.id)
        .then((workout) => res.json(workout))
        .catch((err) => res.status(400).json("Error: " + err));
});


/*
Delete a specific workout given an ID.
*/
router.route("/:id").delete((req, res) => {
    Workout.findByIdAndDelete(req.params.id)
        .then(() => res.json("Workout deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

/*
Post request for adding a new workout.
*/
router.route("/add").post((req, res) => {

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
});
