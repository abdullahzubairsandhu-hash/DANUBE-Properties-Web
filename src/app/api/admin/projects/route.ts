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
    const projects = await Project.find({}).sort({ status: 1, createdAt: -1 });
    
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

    if (!body.slug) return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });

    // SURGICAL LOGIC: If body has "partial: true", we only $set the specific field
    // This allows our future AdminContentWrapper to work without a big form.
    const updateData = body.partial ? { $set: body.data } : { $set: body };

    if (body.status === 'latest' && !body.partial) {
      await Project.updateMany({ status: 'latest' }, { status: 'ongoing' });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { slug: body.slug.toLowerCase().trim() },
      updateData,
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during update";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// NEW DELETE METHOD
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during deletion";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}