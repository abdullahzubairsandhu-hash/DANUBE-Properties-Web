// src/app/[locale]/media/blogs/[slug]/page.tsx

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { blogData } from "@/data/blogs"; // Pointing to blog data
import Footer from "@/components/shared/Footer";
import ContactSection from "@/components/shared/ContactSection";

const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function BlogDetails() {
  const { locale, slug } = useParams();
  const isEn = locale === 'en';
  
  const blogIndex = blogData.findIndex((b) => b.slug === slug);
  const post = blogData[blogIndex];
  
  const relatedPosts = [];
  if (post) {
    for (let i = 1; i <= 5; i++) {
      const nextIndex = (blogIndex + i) % blogData.length;
      relatedPosts.push(blogData[nextIndex]);
    }
  }

  if (!post) return <div className="pt-40 text-center">Blog Post Not Found</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <section className="relative w-full h-[45vh] overflow-hidden">
        <CldImage src="skyline_company-profile_tgvoja" alt="Hero" fill className="object-cover" priority />
      </section>

      <div className="px-4 md:px-[1in] mt-6 relative z-20">
        <div className="bg-[#BDA588] h-[0.6cm] md:h-[0.8cm] flex items-center px-6 text-white text-[10px] md:text-sm font-secondary shadow-lg">
          <Link href={`/${locale}`} className="hover:underline flex items-center">HOME</Link>
          <span className="mx-3 opacity-80 text-lg">»</span>
          <span className="truncate uppercase font-medium tracking-wider">{post.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <section className="w-full lg:w-2/3 bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 rounded-sm">
            <h1 className="font-secondary text-2xl md:text-4xl font-medium text-black mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="text-gray-400 text-xs font-medium mb-8 uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gray-300"></span>
              {formatDate(post.publishedAt, locale as string)}
            </div>

            <div className="relative aspect-video mb-10 rounded-sm overflow-hidden shadow-sm">
              <CldImage src={post.thumbnail} alt={post.title} fill className="object-cover" />
            </div>

            {/* DYNAMIC BLOCKS: Blogs keep images between text */}
            <article className="space-y-8">
              {post.blocks.map((block, idx) => (
                block.type === 'text' ? (
                  <p key={idx} className="font-medium text-gray-700 leading-relaxed text-base md:text-lg">
                    {block.value}
                  </p>
                ) : (
                  <div key={idx} className="relative aspect-video my-10 rounded-sm overflow-hidden border border-gray-100">
                    <CldImage src={block.value} alt="blog content" fill className="object-cover" />
                  </div>
                )
              ))}
            </article>
          </section>

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
                  <Link href={`/${locale}/media/blogs/${rel.slug}`} key={rel.id} className="group flex gap-4 items-center">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                      <CldImage src={rel.thumbnail} alt={rel.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="font-secondary text-sm font-medium line-clamp-2 text-gray-800 group-hover:text-[#BDA588] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase">
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