const express = require("express");
const router = express.Router();
const taskExists = require("../middleware/errorHandler")
const tasksController = require("../controller/tasksController")

router.get("/", tasksController.getAllTasks);
router.get("/:id", tasksController.getTasksById);
router.post("/", tasksController.createTasks);
router.put("/:id",taskExists, tasksController.updateTasks);
router.delete("/:id",taskExists, tasksController.deleteTasks);

module.exports = router;