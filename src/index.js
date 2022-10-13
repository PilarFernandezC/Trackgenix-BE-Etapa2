// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const employees = require('./resources/employees');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.use('/employees', employees);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
