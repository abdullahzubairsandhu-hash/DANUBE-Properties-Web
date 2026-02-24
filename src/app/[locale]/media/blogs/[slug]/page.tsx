// src/app/[locale]/media/blogs/[slug]/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import Footer from "@/components/shared/Footer";
import ContactSection from "@/components/shared/ContactSection";
import { IBlog } from "@/components/admin/BlogModal";
import { Loader2 } from "lucide-react";

export default function BlogDetails() {
  const { locale, slug } = useParams();
  const isEn = locale === 'en';
  
  const [post, setPost] = useState<IBlog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all blogs to find the current one and calculate related posts
        const res = await fetch('/api/admin/blog');
        const allData: IBlog[] = await res.json();
        
        const current = allData.find(b => b.slug === slug);
        if (current) {
          setPost(current);
          
          // Logic for "You May Also Like" - picking the next few in the array
          const currentIndex = allData.findIndex(b => b.slug === slug);
          const related = [];
          const count = Math.min(allData.length - 1, 5); // Don't show more than 5 or what's available
          
          for (let i = 1; i <= count; i++) {
            const nextIndex = (currentIndex + i) % allData.length;
            related.push(allData[nextIndex]);
          }
          setRelatedPosts(related);
        }
      } catch (e) {
        console.error("Failed to load blog:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[#BDA588]" />
    </div>
  );

  if (!post) return (
    <div className="pt-40 text-center font-medium min-h-screen">
      Blog Post Not Found
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] overflow-hidden">
        <CldImage src="skyline_company-profile_tgvoja" alt="Hero" fill className="object-cover" priority />
      </section>

      {/* Breadcrumb Navigation */}
      <div className="px-4 md:px-[1in] mt-6 relative z-20">
        <div className="bg-[#BDA588] h-[0.6cm] md:h-[0.8cm] flex items-center px-6 text-white text-[10px] md:text-sm font-secondary shadow-lg">
          <Link href={`/${locale}`} className="hover:underline flex items-center">HOME</Link>
          <span className="mx-3 opacity-80 text-lg">»</span>
          <span className="truncate uppercase font-medium tracking-wider">
            {post.title[isEn ? 'en' : 'ar']}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content Area */}
          <section className="w-full lg:w-2/3 bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 rounded-sm">
            <h1 className="font-secondary text-2xl md:text-4xl font-medium text-black mb-4 leading-tight">
              {post.title[isEn ? 'en' : 'ar']}
            </h1>
            
            <div className="text-gray-400 text-xs font-medium mb-8 uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gray-300"></span>
              <span suppressHydrationWarning>
                {new Date(post.publishedAt).toLocaleDateString(locale as string, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <div className="relative aspect-video mb-10 rounded-sm overflow-hidden shadow-sm">
              <CldImage src={post.thumbnail} alt="thumbnail" fill className="object-cover" />
            </div>

            {/* Dynamic Content Blocks */}
            <article className="space-y-8">
              {post.blocks.map((block, idx) => {
                // Prevent duplicate main thumbnail if added in blocks
                if (block.type === 'image' && block.value === post.thumbnail) return null;

                if (block.type === 'text') {
                  const textValue = block.value as { en: string; ar: string };
                  return (
                    <p key={idx} className="font-medium text-gray-700 leading-relaxed text-base md:text-lg">
                      {isEn ? textValue.en : textValue.ar}
                    </p>
                  );
                }
                return (
                  <div key={idx} className="relative aspect-video my-10 rounded-sm overflow-hidden border border-gray-100">
                    <CldImage src={block.value as string} alt="blog content" fill className="object-cover" />
                  </div>
                );
              })}
            </article>
          </section>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 space-y-10">
            <div className="bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">
              <ContactSection locale={locale as string} isSidebar={true} />
            </div>

            <div className="bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">
              <h3 className="font-primary text-[#BDA588] text-xl uppercase mb-8 border-b border-gray-100 pb-4 tracking-wider">
                {isEn ? "Recent Blogs" : "المدونات الأخيرة"}
              </h3>
              <div className="flex flex-col gap-8">
                {relatedPosts.map((rel) => (
                  <Link href={`/${locale}/media/blogs/${rel.slug}`} key={rel._id} className="group flex gap-4 items-center">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                      <CldImage src={rel.thumbnail} alt="thumb" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="font-secondary text-sm font-medium line-clamp-2 text-gray-800 group-hover:text-[#BDA588] transition-colors leading-snug">
                        {rel.title[isEn ? 'en' : 'ar']}
                      </h4>
                      <p suppressHydrationWarning className="text-[10px] text-gray-400 mt-1 uppercase">
                        {new Date(rel.publishedAt).toLocaleDateString(locale as string, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <ContactSection locale={locale as string} />
      <Footer locale={locale as string} />
    </main>
  );
}