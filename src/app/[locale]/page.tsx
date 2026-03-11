// src/app/[locale]/page.tsx

import HeroSection from "@/components/home/HeroSection";
import HomeShowcaseWrapper from "@/components/home/HomeShowcaseWrapper"; // NEW WRAPPER
import ContactSection from "@/components/shared/ContactSection";
import FounderSection from "@/components/home/FounderSection";
import BlogSection from "@/components/home/BlogSection";
import Footer from "@/components/shared/Footer";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import HomeFeatured from "@/models/HomeFeatured";

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;

  await connectDB();
  
  const latestProjectRaw = await Project.findOne({ isLatestLaunch: true })
    .sort({ createdAt: -1 })
    .lean();

  const latestBlogsRaw = await Blog.find({})
    .sort({ publishedAt: -1 })
    .limit(4)
    .lean();

  const featuredItemsRaw = await HomeFeatured.find({})
    .sort({ order: 1 })
    .lean();

  const latestProject = latestProjectRaw ? JSON.parse(JSON.stringify(latestProjectRaw)) : null;
  const latestBlogs = latestBlogsRaw ? JSON.parse(JSON.stringify(latestBlogsRaw)) : [];
  const featuredItems = JSON.parse(JSON.stringify(featuredItemsRaw));

  const heroData = {
    videoUrl: latestProject?.heroMediaId || "SRK_danube_w5i94j",
    projectName: latestProject?.title || "Project",
    projectSlug: latestProject?.slug || "#",
    gallery: latestProject?.gallery4 || []
  };

  return (
    <main className="relative w-full overflow-x-hidden bg-white dark:bg-danube-navy">
      <HeroSection 
        locale={locale} 
        videoUrl={heroData.videoUrl} 
        projectName={heroData.projectName}
        slug={heroData.projectSlug}
      />

      {/* This wrapper handles the shared state between the button and the modal */}
      <HomeShowcaseWrapper 
        locale={locale}
        gallery={heroData.gallery}
        projectSlug={heroData.projectSlug}
        featuredItems={featuredItems}
      />

      <FounderSection locale={locale} />

      <BlogSection 
        locale={locale} 
        blogs={latestBlogs} 
      />

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}