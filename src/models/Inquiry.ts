// src/models/Inquiry.ts

import mongoose, { models, model } from 'mongoose';

const InquirySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    countryCode: String,
    number: String
  },
  budget: String, // e.g., "1-2"
  unitType: String, // e.g., "studio"
  timeline: String, // e.g., "60"
  nationality: String,
  sourcePage: String, // To track if they came from "Payment Plan" or "Home"
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'closed'], 
    default: 'new' 
  }
}, { timestamps: true });

const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);
export default Inquiry;