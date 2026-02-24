// src/models/project.ts

import mongoose, { model, models } from 'mongoose';

const AmenitySchema = new mongoose.Schema({
  imageId: String,
  titleEn: String,
  titleAr: String,
  icon: String, // Kept for flexibility
});


const ShowcaseSectionSchema = new mongoose.Schema({
  titleEn: String,
  titleAr: String,
  publicId: String, 
});

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
  
  // Add this to your ProjectSchema in src/models/Project.ts
  status: { 
  type: String, 
  enum: ["latest", "ongoing", "completed", "hidden"], 
  default: "latest" 
},

  isLatestLaunch: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false }, 
  
  heroMediaId: String,
  heroIsVideo: { type: Boolean, default: false },
  descEn: String,
  descAr: String,
  
  showcaseSections: [ShowcaseSectionSchema], 

  specs: {
    price: String,
    completion: String,
    paymentPlan: String,
    apartments: String,
    location: String,
    commercial_units: String, // FIXED: Added missing field from your DB
  },
  areaReasons: [{
    icon: String,
    textEn: String,
    textAr: String,
  }],
  gallery4: [String],
  // Your DB uses these specifically
  amenitiesShowcase: [AmenitySchema],
  amenitiesIcons: [AmenitySchema],
  amenities: [AmenitySchema], // Kept for legacy/fallback
  
  mediaGallery: [String],
  mapIframe: String,
  faqs: [{
    qEn: String,
    aEn: String,
    qAr: String,
    aAr: String,
  }],
}, { 
  timestamps: true,
  strict: false // Allows the DB to hold extra fields without crashing, but we want it clean
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;