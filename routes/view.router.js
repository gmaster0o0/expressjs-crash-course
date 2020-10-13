const express = require("express");
const { route } = require("./example.router");

const router = express.Router();

const Task = require("../models/task.model");

router.get("/", (req, res, next) => {
  Task.find()
    .then((tasks) => res.render("index", { title: "Epitesz Suli", tasks }))
    .catch(next);
});

router.get("/edit/:id", (req, res, next) => {
  const id = req.params.id;
  Task.findById(id)
    .then((task) => res.render("edit", { title: "Epitesz Suli", task }))
    .catch(next);
});

module.exports = router;
