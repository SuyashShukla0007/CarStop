import mongoose from 'mongoose'

import { Schema } from 'mongoose';
const promptSchema = new Schema({
  userId: { type: String, required: true },
  prompt: { type: String },
  response: { type: String },
  expiration: { type: Date }
});

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt
