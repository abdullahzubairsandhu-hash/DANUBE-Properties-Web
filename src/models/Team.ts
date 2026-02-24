// src/models/Team.ts

import mongoose, { model, models } from 'mongoose';

const TeamSchema = new mongoose.Schema({
    category: { 
      type: String, 
      enum: ['leadership', 'management'], 
      required: true 
    },
    name: { 
      en: { type: String, required: true }, 
      ar: { type: String, required: true } 
    },
    designation: { 
      en: { type: String, required: true }, 
      ar: { type: String, required: true } 
    },
    image: { type: String, required: true },
    href: { type: String }, // Linking to their specific profile slug
    bio: [
      { 
        en: { type: String }, 
        ar: { type: String } 
      }
    ],
    order: { type: Number, default: 0 }
  }, { 
    timestamps: true 
  });

const Team = models.Team || model('Team', TeamSchema);

export default Team;