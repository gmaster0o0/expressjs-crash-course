const express = require("express");

const router = express.Router();

router.get("/simple", (req, res, next) => {
  const title = "Építész Suli ExpressJS";
  let content = "<h1>" + title + "</h1></br>";
  const leiras = "Ez egy nagyon kis béna server, még csak egy oldalt tud, és azt is bénán";
  content += "<p>" + leiras + "</p>";

  res.send(content);
});

router.get("/error", (req, res, next) => {
  next(new Error("valami hiba tortent"));
});

router.get("/html", (req, res, next) => {
  res.sendFile(path.join(__dirname, "examples", "example.html"));
});

const errorHandler1 = (error, req, res, next) => {
  console.error("ERROR HANDLER 1:" + error.message);
  error.message = "Ez valami szep hibauzenet";
  next(error);
};

const errorHandler2 = (error, req, res, next) => {
  console.error("ERROR HANDLER 2:" + error.message);
  res.send(error.stack);
};

router.use(errorHandler1);
router.use(errorHandler2);

module.exports = router;
