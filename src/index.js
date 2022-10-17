// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

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
