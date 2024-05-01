const Express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://elins-blogg.onrender.com",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/register", (req, res) => {
  const { userName, passWord } = req.body;
  res.json({ requestData: { userName, passWord } });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
