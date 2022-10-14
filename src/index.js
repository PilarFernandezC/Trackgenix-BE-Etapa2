// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');



const app = express();
const projectRouter = require("./resources/projects");
const port = process.env.PORT || 3000;
const tasksRouter = require("./resources/tasks");

app.use(express.json());
app.use("/projects", projectRouter);
app.use("/tasks", tasksRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
