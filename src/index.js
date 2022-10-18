// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const employees = require('./resources/employees');
const timeSheetsRouter = require('./resources/time-sheets');
const superAdmin = require('./resources/super-admins');
const projectsRouter = require('./resources/projects');
const adminRouter = require('./resources/admins');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);
app.use('/projects', projectsRouter);
app.use('/timeSheets', timeSheetsRouter);
app.use('/employees', employees);
app.use('/superAdmin', superAdmin);
app.use('/admins', adminRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

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
