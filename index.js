const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const exampleRouter = require("./routes/example.router");
const taskRouter = require("./routes/task.router");

app.use(morgan("dev"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/task", taskRouter);

app.use("/examples", exampleRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
