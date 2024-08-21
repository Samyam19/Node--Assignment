const express = require('express')
const app = express()
const tasksRoutes = require("./src/routes/taskRoute")
const validateTask = require("./src/middleware/validation")


app.use(express.json());

app.use(validateTask);
app.use("/tasks", tasksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});