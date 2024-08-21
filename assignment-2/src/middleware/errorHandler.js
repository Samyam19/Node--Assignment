const path = require("path");
const taskPath = path.join(__dirname, "../../data/task.json");
let taskDB = require(taskPath);

const taskExists = (req, res, next) => { 
    const task = taskDB.tasks.find(t => t.id === parseInt(req.params.id));  
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });  
    }
    req.task = task;  
    next();  
};

module.exports = taskExists