// src/models/Video.ts

import mongoose, { models, model } from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  youtubeUrl: { 
    type: String, 
    required: true 
  },
  embedUrl: { 
    type: String, 
    required: true 
  },
  thumbnail: { 
    type: String, 
    required: true // Cloudinary Public ID
  },
  order: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

const Video = models.Video || model('Video', VideoSchema);
export default Video;