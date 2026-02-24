// src/app/api/admin/journey/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Journey from "@/models/Journey";

// GET ALL MILESTONES
export async function GET() {
  await dbConnect();
  try {
    const items = await Journey.find({}).sort({ order: 1 });
    return NextResponse.json(items);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Fetch error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// UPDATE/CREATE logic inside POST or separate PUT
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { _id, year, title, description, image, type, order } = body;

    if (_id) { // Use _id consistently
      const updated = await Journey.findByIdAndUpdate(
        _id,
        { year, title, description, image, type, order },
        { new: true }
      );
      return NextResponse.json(updated);
    } else {
      const newItem = await Journey.create({ year, title, description, image, type, order });
      return NextResponse.json(newItem);
    }
  } catch {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}

// DELETE MILESTONE
export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Journey.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Delete error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}