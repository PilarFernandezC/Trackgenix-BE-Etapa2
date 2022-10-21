import mongoose from 'mongoose';
import app from './app';

require('dotenv').config();

const port = process.env.PORT;

mongoose.connect(
    process.env.MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fails connection to database', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
