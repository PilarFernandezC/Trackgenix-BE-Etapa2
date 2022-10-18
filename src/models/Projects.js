import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  statDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date, required: true },
  clientName: { type: String, required: true },
  employees: [{
    employeeId: { type: mongoose.ObjectId, required: true },
    role: { type: String, enum: ['DEV', 'QA', 'PM', 'TL'], required: true },
    rate: { type: Number, required: true },
  }],
});

export default mongoose.model('projects', schema);
