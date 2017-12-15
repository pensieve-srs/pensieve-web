const express = require("express");
const chalk = require("chalk");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const db = require("../db");
const api = require("./api");

const app = express();
const port = process.env.SERVER_PORT || 9000;

db.connect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use("/", api);

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log(chalk.cyan("✨  Starting the server..."));
    }
  }
});
