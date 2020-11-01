/*
Api routes for workouts.
*/

const router = require("express").Router();

const { getWorkout, getWorkoutById, deleteWorkoutById, createWorkout } = require("../controllers/workout.controller.js");

router.route("/").get(getWorkout);
router.route("/:id").get(getWorkoutById);
router.route("/:id").delete(deleteWorkoutById);
router.route("/add").post(createWorkout);
