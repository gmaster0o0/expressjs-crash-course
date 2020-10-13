const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "example.html"));
});

app.use("/static", express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
