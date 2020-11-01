/*
Api routes for users.
*/

const router = require("express").Router();

/*
Load controllers
*/
const { getUsers, getUserById, updateUserById } = require("../controllers/user.controller")

/*
Assign controller to routes
*/
router.route("/").get(getUsers);
router.route("/:id").get(getUserById);
router.route("/update").put(updateUserById);