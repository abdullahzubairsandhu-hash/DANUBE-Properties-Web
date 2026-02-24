// src/models/Blog.ts

import mongoose, { models, model } from 'mongoose';

const LocalizedString = {
  en: { type: String, required: true },
  ar: { type: String, required: true }
};

const ContentBlockSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'image'], required: true },
  // Mixed allows for {en, ar} object for text, or string for image
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

const BlogSchema = new mongoose.Schema({
  title: LocalizedString,
  slug: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  excerpt: LocalizedString,
  publishedAt: { type: Date, default: Date.now },
  blocks: [ContentBlockSchema]
}, { timestamps: true });

export default models.Blog || model('Blog', BlogSchema);