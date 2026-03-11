// src/models/HomeFeatured.tsx 

import mongoose, { models, model } from 'mongoose';

const HomeFeaturedSchema = new mongoose.Schema({
  publicId: { type: String, required: true },
  slug: { type: String, required: true }, // The project it links to
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.HomeFeatured || model('HomeFeatured', HomeFeaturedSchema);