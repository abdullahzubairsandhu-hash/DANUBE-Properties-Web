// src/models/Profile.ts

import mongoose, { model, models } from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // e.g., 'chairman', 'company-profile'
  title: { 
    en: { type: String }, 
    ar: { type: String } 
  },
  heroImage: { type: String },
  badgeImage: { type: String }, // Specifically for the "Since 1993" badge
  content: [{
    section: { type: String }, // e.g., "bio", "vision", "mission"
    text: { 
      en: { type: String }, 
      ar: { type: String } 
    }
  }],
  signatureName: { type: String },
  signatureTitle: { 
    en: { type: String },   
    ar: { type: String } 
  }
}, { 
  timestamps: true 
});

const Profile = models.Profile || model('Profile', ProfileSchema);

export default Profile;