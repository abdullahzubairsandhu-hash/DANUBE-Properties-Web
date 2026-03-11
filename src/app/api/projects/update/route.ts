// src/app/api/projects/update/route.ts

// src/app/api/projects/update/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { projectId, field, value } = await req.json();

    // 1. Validate incoming data
    if (!projectId || !field) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let updateQuery = {};

    // 2. SMART LOGIC: 
    // NEW: Handle Gallery Deletion
    if (field === "gallery4_delete") {
      updateQuery = { $pull: { gallery4: value } }; 
    } 
    // Handle Gallery Addition
    else if (field === "gallery4") {
      updateQuery = { $push: { [field]: value } };
    } 
    // Handle Standard Text/Field Updates
    else {
      updateQuery = { $set: { [field]: value } };
    }

    const updated = await Project.findByIdAndUpdate(
      projectId,
      updateQuery,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 3. Cache Busting
    revalidatePath("/", "layout");
    
    return NextResponse.json({ success: true, data: updated });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Surgical Update Error:", errorMessage);

    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}