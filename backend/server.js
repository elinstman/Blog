const app = require("./src/app");
const { connectToMongoose } = require("./src/config/mongoose");

const port = process.env.PORT || 8000;

// const MONGODB_LIVE_URI = process.env.MONGODB_LIVE_URI;

app.listen(port, () => {
  console.log("Server running on ", port);
  connectToMongoose();
});
