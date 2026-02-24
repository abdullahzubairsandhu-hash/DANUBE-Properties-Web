// src/app/api/admin/blog/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET ALL OR SINGLE BY SLUG
export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  
  try {
    if (slug) {
      const article = await Blog.findOne({ slug });
      if (!article) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      return NextResponse.json(article);
    }
    const articles = await Blog.find({}).sort({ publishedAt: -1 });
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// CREATE NEW BLOG
export async function POST(req: Request) {
  await dbConnect();
  try {
    const data = await req.json();
    // Safety check: ensure _id isn't passed as an empty string from the client
    delete data._id; 
    
    const created = await Blog.create(data);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Blog creation failed" }, { status: 500 });
  }
}

// UPDATE EXISTING BLOG
export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { _id, ...data } = await req.json();
    if (!_id) return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    
    const updated = await Blog.findByIdAndUpdate(_id, data, { new: true });
    if (!updated) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Blog update failed" }, { status: 500 });
  }
}

// DELETE BLOG
export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) return NextResponse.json({ error: "ID required for deletion" }, { status: 400 });

  try {
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Blog entry deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Blog deletion failed" }, { status: 500 });
  }
}