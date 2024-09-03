require("dotenv").config();  // Load environment variables early

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express.json());

// Use the correct route prefix
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

const conn = async () => {
    try {
        console.log(process.env.JWT_SECRET, "tokkkk");
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(4000, () => {
    conn();
    console.log("Server running on http://localhost:4000");
});
