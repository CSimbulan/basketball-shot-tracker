const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

// body parser
app.use(bodyParser.json());

// Load Routes
const workoutRouter = require("./routes/workout.router");
const usersRouter = require("./routes/user.router");

// Use Routes
app.use("/api/workouts", workoutRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "client", "build", "index.html")) })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});