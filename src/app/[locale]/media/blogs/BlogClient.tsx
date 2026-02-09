// src/app/[locale]/media/blog/BlogClient.tsx

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { blogData } from "@/data/blogs"; // Pointing to blog data
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export default function BlogClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-white pt-20">
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <CldImage
          src="skyline_company-profile_tgvoja"
          alt="Blogs Skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 " />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-20 flex flex-col items-center text-center">
          <h1 className="font-primary text-[#BDA588] text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Blogs" : "المدونات"}
          </h1>
          <div className="w-24 h-1.5 bg-[#BDA588] mt-4"></div>
        </div>

        <div className="flex flex-col gap-12">
          {blogData.map((post) => (
            <div key={post.id} className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 pb-12">
              <div className="w-full md:w-1/3 relative aspect-video md:aspect-square lg:aspect-video rounded-sm overflow-hidden shadow-lg">
                <CldImage
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="w-full md:w-2/3 flex flex-col">
                <div className="flex gap-4 items-center mb-3">
                  <span className="font-secondary text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                    {formatDate(post.publishedAt, locale)}
                  </span>
                </div>

                <h2 className="font-secondary text-black text-lg md:text-xl font-medium mb-4 leading-snug hover:text-[#BDA588] transition-colors h-[3.5rem] line-clamp-2">
                  <Link href={`/${locale}/media/blogs/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="font-secondary text-gray-600 text-sm md:text-base mb-6 font-medium line-clamp-2">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/${locale}/media/blogs/${post.slug}`}
                  className="bg-[#BDA588] text-white px-8 py-3 w-fit uppercase font-secondary tracking-widest text-xs hover:bg-black transition-colors duration-300 shadow-md"
                >
                  {isEn ? "Read More" : "اقرأ المزيد"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}