// src/app/api/admin/seed/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomeFeatured from "@/models/HomeFeatured";

const initialData = [
  { publicId: "Breez-image-1_zueu8a", slug: "breez", order: 0 },
  { publicId: "aspirz-image-1_yu3ur4", slug: "aspirz", order: 1 },
  { publicId: "sparklz-image-1_cnmszt", slug: "sparklz", order: 2 },
  { publicId: "timez-image-1_w3svcj", slug: "timez", order: 3 },
  { publicId: "bayz102-image-1_xnlntx", slug: "bayz-102", order: 4 },
  { publicId: "diamondz-image-1_ceep0e", slug: "diamondz", order: 5 },
];

export async function GET() {
  try {
    await connectDB();
    // Optional: clear existing to avoid duplicates during testing
    await HomeFeatured.deleteMany({}); 
    const result = await HomeFeatured.insertMany(initialData);
    return NextResponse.json({ message: "Seed successful", data: result });
  } catch {
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}