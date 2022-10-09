// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const callRouter = require('./resources/projects');

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(callRouter);

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
