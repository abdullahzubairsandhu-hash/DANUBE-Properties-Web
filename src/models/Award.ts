// src/models/Award.ts

import mongoose, { model, models } from 'mongoose';

const AwardSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Cloudinary ID
  title: { type: String }, // Optional metadata
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Check if the model exists before creating a new one
const Award = models.Award || model('Award', AwardSchema);

export default Award;