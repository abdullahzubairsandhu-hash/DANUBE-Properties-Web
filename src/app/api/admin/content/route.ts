// src/app/api/admin/content/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // FIXED: Using your specific path
import Content from "@/models/Content";

// FETCH: Gets all key-value pairs for a specific language
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get("locale") || "en";

    const contents = await Content.find({ locale });
    
    // Transform array [{key, value}] into Object {key: value}
    const data = contents.reduce((acc: Record<string, string>, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Content Error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// UPDATE: Saves a specific field to the database
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { key, locale, value } = body;

    if (!key || !locale || value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedContent = await Content.findOneAndUpdate(
      { key, locale },
      { value },
      { upsert: true, new: true }
    );

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("POST Content Error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}