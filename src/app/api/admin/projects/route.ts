// src/app/api/admin/projects/route.ts

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { MongoError } from 'mongodb';

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

    // 1. Strict Validation
    if (!body.slug || !body.title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title and slug are mandatory." },
        { status: 400 }
      );
    }

    // 2. Logic: Ensure only one project is 'isLatestLaunch'
    if (body.isLatestLaunch === true) {
      await Project.updateMany({}, { isLatestLaunch: false });
    }

    // 3. Create the Project
    const newProject = await Project.create(body);

    return NextResponse.json({ 
      success: true, 
      message: "New project successfully published.", 
      data: newProject 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error("Critical Project Creation Error:", error);

    // Using MongoError to check for duplicate keys (code 11000)
    if (error instanceof MongoError && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A project with this slug or unique identifier already exists." },
        { status: 409 }
      );
    }

    const err = error as ErrorResponse;
    return NextResponse.json(
      { success: false, error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}