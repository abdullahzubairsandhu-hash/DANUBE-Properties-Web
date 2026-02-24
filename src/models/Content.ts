// src/models/Content.ts

import mongoose, { models, model } from 'mongoose';

const ContentSchema = new mongoose.Schema({
  key: { type: String, required: true },
  locale: { type: String, required: true },
  value: { type: String, required: true },
}, { timestamps: true });

const Content = models.Content || model('Content', ContentSchema);
export default Content;