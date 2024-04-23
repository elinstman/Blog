const mongoose = require("mongoose");

const databaseURI = process.env.MONGOOSE_LIVE_URI;
// "mongodb+srv://eomolle:mxFo7XWrsQ9EtCPR@elinsblog.wfkbky3.mongodb.net/?retryWrites=true&w=majority&appName=Elins_blog";

// "mongodb+srv://eomolle:mxFo7XWrsQ9EtCPR@elins_blog.tz53jqs.mongodb.net/?retryWrites=true&w=majority&appName=Elins_blog";

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
