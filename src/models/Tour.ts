// src/models/Tour.ts

import mongoose, { models, model } from 'mongoose';

const TourSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  thumbnail: { 
    type: String, 
    required: true 
  },
  tourUrl: { 
    type: String, 
    required: true 
  },
  order: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

const Tour = models.Tour || model('Tour', TourSchema);
export default Tour;