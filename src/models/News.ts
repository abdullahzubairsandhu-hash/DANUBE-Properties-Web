// src/models/News.ts

import mongoose, { models, model } from 'mongoose';

const LocalizedString = {
  en: { type: String, required: true },
  ar: { type: String, required: true }
};

const ContentBlockSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'image'], required: true },
  // If text, it needs en/ar. If image, it's just a string (Cloudinary ID)
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

const NewsSchema = new mongoose.Schema({
  title: LocalizedString,
  slug: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  excerpt: LocalizedString,
  publishedAt: { type: Date, default: Date.now },
  blocks: [ContentBlockSchema]
}, { timestamps: true });

export default models.News || model('News', NewsSchema);