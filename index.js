const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const exampleRouter = require("./routes/example.router");
const taskRouter = require("./routes/task.router");
const viewRouter = require("./routes/view.router");

mongoose.connect("mongodb://localhost/task", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use("/", viewRouter);
app.use("/tasks", taskRouter);
app.use("/examples", exampleRouter);

app.use((error, req, res, next) => {
  console.log(error);

  res.render("error", { title: error.message, stack: JSON.stringify(error.stack) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
