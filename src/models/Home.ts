// src/models/Home.ts

import mongoose, { models, model } from 'mongoose';

const HomeSchema = new mongoose.Schema({
  heroVideo: String,
  latestLaunchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Link to Shahrukhz
  whyDanube: [{
    labelEn: String,
    labelAr: String,
    icon: String
  }],
  whyInvestDubai: [{
    labelEn: String,
    labelAr: String,
    icon: String
  }]
}, { timestamps: true });

const Home = models.Home || model('Home', HomeSchema);
export default Home;