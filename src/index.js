// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const tasksRouter = require('./resources/tasks');
const employees = require('./resources/employees');
const timeSheetsRouter = require('./resources/time-sheets');
const superAdmin = require('./resources/super-admins');
const projectsRouter = require('./resources/projects')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/timeSheets', timeSheetsRouter);
app.use('/employees', employees);
app.use('/superAdmin', superAdmin);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

const adminRouter = require('./resources/admins');

app.use('/admins', adminRouter);
