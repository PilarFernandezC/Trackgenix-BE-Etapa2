import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('Admins', adminSchema);
