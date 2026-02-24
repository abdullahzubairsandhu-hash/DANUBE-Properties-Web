// src/app/api/admin/seed/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import Blog from '@/models/Blog';
import Video from '@/models/Video'; // Add this
import { newsSeedData } from '@/data/news-seed';
import { blogSeedData } from '@/data/blog-seed';
import { videoSeedData } from '@/data/video-seed'; // Add this

export async function GET() {
  await dbConnect();

  try {
    // Seed News
    await News.deleteMany({});
    await News.insertMany(newsSeedData);

    // Seed Blogs
    await Blog.deleteMany({});
    await Blog.insertMany(blogSeedData);

    // Seed Videos
    await Video.deleteMany({});
    await Video.insertMany(videoSeedData);

    return NextResponse.json({ 
      message: "Database seeded successfully!",
      newsCount: newsSeedData.length,
      blogCount: blogSeedData.length,
      videoCount: videoSeedData.length 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}