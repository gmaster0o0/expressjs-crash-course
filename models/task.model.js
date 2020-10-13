const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  desc: String,
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
