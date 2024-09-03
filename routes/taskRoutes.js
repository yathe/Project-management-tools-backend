const express=require("express");
const router=express.Router();
const taskController=require("../controllers/taskControllers");
router.route("/add").post(taskController.addTask);
router.route("/tasks").get(taskController.getAllTasks);
router.route("/edit/:id").put(taskController.editTask);
router.route("/:id/status").put(taskController.statusChange); // Updated route for status change
router.route("/:id").delete(taskController.deleteTask);
module.exports=router;