const Task = require("../models/Task");
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (
      task.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (
      task.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
