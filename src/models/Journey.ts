// src/models/Journey.ts

import mongoose, { models, model } from 'mongoose';

const JourneySchema = new mongoose.Schema({
  year: { 
    type: String, 
    required: true 
  },
  // We use nested objects for localized text
  title: {
    en: { type: String, required: true },
    ar: { type: String, default: "" }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, default: "" }
  },
  image: { 
    type: String, 
    default: null // Allowed to be null for milestones
  },
  type: { 
    type: String, 
    enum: ['milestone', 'project'], 
    default: 'project' 
  },
  order: {
    type: Number,
    default: 0 // Helps us sort them manually if years are the same
  }
}, { 
  timestamps: true 
});

const Journey = models.Journey || model('Journey', JourneySchema);
export default Journey;