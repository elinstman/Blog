const Express = require("express");
const cors = require("cors");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
