// src/app/api/admin/news/route.ts


import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  try {
    if (slug) {
      const article = await News.findOne({ slug });
      return NextResponse.json(article);
    }
    const articles = await News.find({}).sort({ publishedAt: -1 });
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// CREATE
export async function POST(req: Request) {
  await dbConnect();
  try {
    const data = await req.json();
    delete data._id; // Ensure we don't pass an empty/wrong ID string
    const created = await News.create(data);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

// UPDATE
export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { _id, ...data } = await req.json();
    if (!_id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    const updated = await News.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  try {
    await News.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}