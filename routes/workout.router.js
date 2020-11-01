/*
Api routes for workouts.
*/

const router = require("express").Router();

/*
Load controllers
*/
const { getWorkout, getWorkoutById, deleteWorkoutById, createWorkout } = require("../controllers/workout.controller.js");

/*
Assign controller to routes
*/
router.route("/").get(getWorkout);
router.route("/:id").get(getWorkoutById);
router.route("/:id").delete(deleteWorkoutById);
router.route("/add").post(createWorkout);
