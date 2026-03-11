// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Destructure based on your specific Inquiry Schema
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      budget, 
      unitType, 
      timeline, 
      nationality, 
      sourcePage 
    } = body;

    // Robust Validation: Check core identity fields
    if (!firstName || !lastName || !email || !phone?.number) {
      return NextResponse.json(
        { success: false, error: "Missing required contact information" }, 
        { status: 400 }
      );
    }

    // Create the entry using your exact model structure
    const newInquiry = await Inquiry.create({
      firstName,
      lastName,
      email,
      phone: {
        countryCode: phone.countryCode || "+971", // Defaulting to UAE if not provided
        number: phone.number
      },
      budget,
      unitType,
      timeline,
      nationality,
      sourcePage: sourcePage || "unknown",
      status: 'new'
    });

    return NextResponse.json({ 
      success: true, 
      message: "Inquiry received successfully",
      id: newInquiry._id 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error("Inquiry Submission Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage 
    }, { status: 500 });
  }
}