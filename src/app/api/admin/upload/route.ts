// src/app/api/admin/upload/route.ts

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Properly typed Promise using Cloudinary's UploadApiResponse
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "danube_projects" },
        (error, uploadResult) => {
          if (error || !uploadResult) reject(error);
          else resolve(uploadResult);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      public_id: result.public_id, 
      url: result.secure_url
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("Cloudinary Upload Error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}