const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
  next(new Error("valami hiba tortent"));
});

const errorHandler1 = (error, req, res, next) => {
  console.log("ERROR HANDLER 1");
  console.error(error);
  next(error);
};

const errorHandler2 = (error, req, res, next) => {
  console.log("ERROR HANDLER 2");
  res.send(error.stack);
};

app.use(errorHandler1);
app.use(errorHandler2);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
