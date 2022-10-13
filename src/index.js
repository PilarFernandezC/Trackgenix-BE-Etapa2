// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const employeesRouter = require('./resources/employees');
const timeSheetsRouter = require('./resources/time-sheets');
const superAdmin = require('./resources/super-admins');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employees', employeesRouter);
app.use('/timeSheets', timeSheetsRouter);
app.use('/superAdmin', superAdmin);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
