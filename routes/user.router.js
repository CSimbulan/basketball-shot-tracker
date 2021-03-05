/*
Api routes for users.
*/

const router = require("express").Router();

/*
Load controllers
*/
const { updateUserById } = require("../controllers/user.controller")

/*
Assign controller to routes
*/
router.route("/update").put(updateUserById);

module.exports = router;