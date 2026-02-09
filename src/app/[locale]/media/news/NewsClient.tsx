// src/app/[locale]/media/news/NewsClient.tsx 

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { newsData } from "@/data/news";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

// Helper for dynamic formatting in the list
const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export default function NewsClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <CldImage
          src="skyline_company-profile_tgvoja"
          alt="News & Events Skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 " />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* CENTERED HEADING */}
        <div className="mb-20 flex flex-col items-center text-center">
          <h1 className="font-primary text-[#BDA588] text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "News & Events" : "الأخبار والفعاليات"}
          </h1>
          <div className="w-24 h-1.5 bg-[#BDA588] mt-4"></div>
        </div>

        {/* NEWS LIST */}
        <div className="flex flex-col gap-12">
          {newsData.map((article) => (
            <div key={article.id} className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 pb-12">
              
              {/* Left: Image */}
              <div className="w-full md:w-1/3 relative aspect-video md:aspect-square lg:aspect-video rounded-sm overflow-hidden shadow-lg">
                <CldImage
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-2/3 flex flex-col">
                <div className="flex gap-4 items-center mb-3">
                  <span className="font-secondary text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                    {formatDate(article.publishedAt, locale)}
                  </span>
                  {/* Time can be extracted dynamically if needed, but standard news usually shows just date */}
                  <span className="h-4 w-[1px] bg-gray-200"></span>
                  <span className="font-secondary text-gray-400 text-xs md:text-sm font-medium">
                    {new Date(article.publishedAt).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <h2 className="font-secondary text-black text-lg md:text-xl font-medium mb-4 leading-snug hover:text-[#BDA588] transition-colors h-[3.5rem] line-clamp-2">
                  <Link href={`/${locale}/media/news/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="font-secondary text-gray-600 text-sm md:text-base mb-6 font-medium line-clamp-2">
                  {article.excerpt}
                </p>

                <Link 
                  href={`/${locale}/media/news/${article.slug}`}
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