// src/app/api/admin/video/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';

// GET: Fetch all videos (ordered by the 'order' field)
export async function GET() {
  await dbConnect();
  try {
    const videos = await Video.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error) {
    console.error("GET Videos Error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

// POST: Create a new video
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const newVideo = await Video.create(body);
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("POST Video Error:", error);
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}

// PUT: Update an existing video
export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;
    
    const updatedVideo = await Video.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    if (!updatedVideo) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error("PUT Video Error:", error);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}

// DELETE: Remove a video
export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await Video.findByIdAndDelete(id);
    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("DELETE Video Error:", error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}