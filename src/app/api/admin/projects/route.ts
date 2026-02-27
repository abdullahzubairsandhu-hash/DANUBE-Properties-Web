// src/app/api/admin/projects/route.ts

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

/**
 * Interface for consistent error handling
 */
interface ErrorResponse {
  message: string;
}

// GET: Fetch all projects with full details
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ isLatestLaunch: -1, createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      count: projects.length,
      data: projects 
    });
  } catch (error: unknown) {
    const err = error as ErrorResponse;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch projects" }, 
      { status: 500 }
    );
  }
}

// POST: Create a complete project entry
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // 1. Validation
    if (!body.slug || !body.title) {
      return NextResponse.json(
        { success: false, error: "Title and Slug are mandatory." },
        { status: 400 }
      );
    }

    // 2. Status Shifter Logic for Global State
    // If setting this project to 'latest', demote existing latest project
    if (body.status === 'latest') {
      await Project.updateMany({ status: 'latest' }, { status: 'ongoing' });
    }

    // 3. The Robust Upsert
    const updatedProject = await Project.findOneAndUpdate(
      { slug: body.slug.toLowerCase().trim() },
      { $set: body },
      { 
        new: true, 
        upsert: true, 
        runValidators: true,
        setDefaultsOnInsert: true 
      }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Project data synchronized successfully.", 
      data: updatedProject 
    });

  } catch (error: unknown) {
    console.error("Upsert Error:", error);
    
    // Type-safe error message extraction
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    
    return NextResponse.json(
      { success: false, error: errorMessage }, 
      { status: 500 }
    );
  }
}