// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';

// use "require" to import JSON files
//const tasksRouter = require('./resources/tasks');
const employees = require('./resources/employees');
const timeSheetsRouter = require('./resources/time-sheets');
const superAdmin = require('./resources/super-admins');
const projectsRouter = require('./resources/projects');
const adminRouter = require('./resources/admins');

import tasksRouter from './routes/task';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/timeSheets', timeSheetsRouter);
app.use('/employees', employees);
app.use('/superAdmin', superAdmin);
app.use('/admins', adminRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Example app listening on port ${port}`);
// });
const MONGO_URL = 'mongodb+srv://BaSP-database-ayom-a:BaSP2022@cluster0.b8vlcfc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fails connection to database', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Server ready on  port ${port}`);
      });
    }
  },
);
