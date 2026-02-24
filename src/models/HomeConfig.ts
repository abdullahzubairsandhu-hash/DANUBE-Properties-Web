// src/models/HomeConfig.ts

import mongoose, { model, models } from 'mongoose';

const HomeConfigSchema = new mongoose.Schema({
  heroVideoUrl: { type: String },
  // These arrays store the icons and text for those grid sections
  whyDanube: [{ 
    labelEn: String, 
    labelAr: String, 
    iconId: String 
  }],
  whyInvestDubai: [{ 
    labelEn: String, 
    labelAr: String, 
    iconId: String 
  }]
}, { 
  timestamps: true 
});

const HomeConfig = models.HomeConfig || model('HomeConfig', HomeConfigSchema);

export default HomeConfig;