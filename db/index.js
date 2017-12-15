const chalk = require("chalk");
const mongoose = require("mongoose");

const connect = () => {
  const mongoURI = process.env.MONGODB_HOST;
  const mongoDB = mongoose.connect(mongoURI, { useMongoClient: true });
  mongoose.Promise = Promise;

  if (process.env.NODE_ENV === "development") {
    mongoDB.on("error", err => {
      console.log(chalk.red("🔺  Connection to database failed", err.message));
    });
    mongoDB.once("open", () => {
      console.log(chalk.cyan("✨  Connection to database established"));
    });
  }
};

module.exports = { connect };
