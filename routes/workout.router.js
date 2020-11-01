/*
Api routes for workouts.
*/

const router = require("express").Router();

/*
Load controllers
*/
const { getWorkout, getWorkoutById, deleteWorkoutById, createWorkout, updateWorkoutById } = require("../controllers/workout.controller.js");

/*
Assign controller to routes
*/
router.route("/").get(getWorkout);
router.route("/:id").get(getWorkoutById);
router.route("/:id").delete(deleteWorkoutById);
router.route("/add").post(createWorkout);
router.route("/update").put(updateWorkoutById);

module.exports = router;