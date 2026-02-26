// src/app/api/admin/projects/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Using your project's naming convention
import Project from "@/models/Project";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Changed to Promise
) {
  try {
    await dbConnect();
    const { id } = await params; // Must await params in Next.js 16
    const body = await request.json();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error: unknown) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}