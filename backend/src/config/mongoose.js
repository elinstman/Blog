const mongoose = require("mongoose");

const databaseURI =
  process.env.MONGOOSE_LIVE_URI ||
  "mongodb+srv://eomolle:mxFo7XWrsQ9EtCPR@cluster0.tz53jqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

function connectToMongoose() {
  mongoose
    .connect(databaseURI)
    .then(() => {
      console.log("Connected to DB: ", databaseURI);
    })
    .catch((error) => {
      console.log("Could not connect to DB: ", databaseURI, error);
    });
}

module.exports = {
  connectToMongoose,
};
