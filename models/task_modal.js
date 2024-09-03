const mongoose = require("mongoose");

// Define the Task schema
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task name is required'], // Better validation message
        minlength: [10, 'Task must be at least 10 characters long'], // Ensure minimum length
    },
    status: {
        type: String,
        enum: ['backlog', 'todo', 'doing', 'done'],
        default: 'backlog',
    },
    deadline: {
        type: Date,  // Add this new field
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true // Enable timestamps to record createdAt and updatedAt
});


// Create the Task model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;