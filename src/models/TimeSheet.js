import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  date: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
});

export default mongoose.model('TimeSheet', timeSheetSchema);
