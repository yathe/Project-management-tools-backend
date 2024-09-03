const Task = require("../models/task_modal")
const User = require("../models/user_modal")
const mongoose = require('mongoose');
const { findByIdAndDelete } = require("../models/task_modal");

const addTask = async (req, res) => {
    const { task, createdBy,deadline } = req.body;
    try {
        if (!task) {
            return res.status(400).json({ message: "Task name is required" });
        }
        if (task.length < 10) {
            return res.status(400).json({ message: "Task must be at least 10 characters long" });
        }
        if (!createdBy) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newTask = new Task({ task, createdBy,deadline });
        const savedTask = await newTask.save();

        return res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error adding task:", error.message);
        return res.status(500).json({ message: "Failed to add task" });
    }
};

const getAllTasks = async (req, res) => {
    const { id } = req.query;
    console.log(req.params._id, "--");
    try {
        let tasklist = await Task.find({ createdBy: id });
        res.status(201).send(tasklist);
    } catch (error) {
        console.log(error, "bye");
        return res.status(400).send(error);
    }
};
// Controller to edit a task (including deadline)
const editTask = async (req, res) => {
    const { id } = req.params;
    const { task, deadline, status } = req.body;  // Get the updated fields from the request body

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { task, deadline, status },  // Update the task with new values
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error editing task:", error.message);
        return res.status(500).json({ message: "Failed to edit task" });
    }
};

const statusChange = async (req, res) => {
    const { id } = req.params; // Get the task ID from the URL
    const { status } = req.body; // Get the new status from the request body

    try {
        const task = await Task.findById(id); // Find the task by ID

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.status = status; // Update the status
        const updatedTask = await task.save(); // Save the updated task

        res.status(200).json(updatedTask); // Respond with the updated task
    } catch (error) {
        console.error("Error updating task status:", error.message);
        res.status(500).json({ message: "Failed to update task status" });
    }
};



const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        let response = await Task.findByIdAndDelete(id);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send("deleteFailed", error);
    }
};


module.exports = {
    addTask, getAllTasks, editTask, statusChange, deleteTask,
}