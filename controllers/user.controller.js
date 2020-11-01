/*
Api controller for users.
*/

let User = require("../models/user.model");

/*
Normal get request, return all workouts.
*/
exports.getUsers = (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
}

/*
Get request for a specific workout given an ID.
*/
exports.getUserById = (req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
}

exports.updateUserById = (req, res) => {
    const userId = req.body.userId;
    const updatedList = req.body.updatedList;
    User.updateOne({ "_id": ObjectID(userId) }, { $set: { "workout_list": updatedList } })
        .then(() => res.json("User's workout list updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
}