import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetSchema = new Schema({
  date: { type: Date, required: true },
  description: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task',
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
}, { timestamps: true });

export default mongoose.model('Timesheet', timesheetSchema);
