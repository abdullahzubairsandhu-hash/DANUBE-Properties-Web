// src/app/api/home-featured/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomeFeatured from "@/models/HomeFeatured";

export async function GET() {
  await connectDB();
  const data = await HomeFeatured.find().sort({ order: 1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectDB();
  const { publicId, slug } = await req.json();
  const count = await HomeFeatured.countDocuments();
  const newItem = await HomeFeatured.create({ publicId, slug, order: count });
  return NextResponse.json(newItem);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await HomeFeatured.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}