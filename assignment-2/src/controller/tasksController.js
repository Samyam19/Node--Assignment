const fs = require("fs");
const path = require("path");
const taskPath = path.join(__dirname, "../../data/task.json");
let task = require(taskPath);

const validateTask = require('../middleware/validation');

const taskDB = () => {
    fs.writeFileSync(taskPath, JSON.stringify(task, null, 2));
  };
  
  const getAllTasks = (req, res) => {
    res.status(200).json(task.tasks);
  };
  
  const getTasksById = (req, res) => {
    const tasks = task.tasks.find((tasks) => tasks.id == req.params.id);
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: "Tasks not found" });
    }
  };
  
  const createTasks = [
    validateTask,
    (req, res) => {
      const newTask = req.body;
      newTask.id = task.tasks.length + 1;
      task.tasks.push(newTask);
      taskDB();
      res.status(201).json(newTask);
    }
  ];
  
  const updateTasks = (req, res) => {
    const index = task.tasks.findIndex((task) => task.id == req.params.id);
    if (index !== -1) {
      task.tasks[index] = req.body;
      task.tasks[index].id = req.params.id;
      taskDB();
      res.status(200).json(task.tasks[index]);
    } else {
        res.status(404).json({ message: "Tasks not found" });
      }
  };
  
  const deleteTasks = (req, res) => {
    const id = parseInt(req.params.id);
   
    const taskExists = task.tasks.some(task => task.id === id);
    if (!taskExists) throw TaskNotFoundException;
  
    task.tasks = task.tasks.filter((task) => task.id !== id);
   
    taskDB();

    res.status(200).json({ message: 'Task deleted successfully' });
  };
  

  module.exports = {
    getAllTasks,
    getTasksById,
    createTasks,
    updateTasks,
    deleteTasks,
  };