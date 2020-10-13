const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const title = "Építész Suli ExpressJS";
  let content = "<h1>" + title + "</h1></br>";
  const leiras = "Ez egy nagyon kis béna server, még csak egy oldalt tud, és azt is bénán";
  content += "<p>" + leiras + "</p>";

  res.send(content);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
