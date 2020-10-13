const express = require("express");

const router = express.Router();

const Task = require("../models/task.model");

/**
 * Get all task
 */
router.get("/", (req, res, next) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch(console.log);
});
/**
 * Get task by id
 */
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Task.findById(id)
    .then((task) => res.json(task))
    .catch(console.log);
});
/**
 * Create task
 */
router.post("/", (req, res, next) => {
  const { title, desc, priority } = req.body;
  Task.create({ title, desc, priority })
    .then((task) => res.json(task))
    .catch(console.log);
});
/**
 * Update task by id
 */
router.put("/:id", (req, res, next) => {
  const newFields = req.body;
  const id = req.params.id;
  Task.findByIdAndUpdate(id, newFields, { new: true })
    .then((task) => res.json(task))
    .catch(console.log);
});
/**
 * Delete task by id
 */
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then((task) => res.json(task))
    .catch(console.log);
});

module.exports = router;
