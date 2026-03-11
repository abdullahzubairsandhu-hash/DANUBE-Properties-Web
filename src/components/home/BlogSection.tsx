// src/components/home/BlogSection.tsx

"use client";

import { useEffect, useRef } from "react";
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BlogDocument {
  _id: string;
  title: { en: string; ar: string };
  slug: string;
  thumbnail: string;
}

export default function BlogSection({ locale, blogs }: { locale: string; blogs: BlogDocument[] }) {
  const isEn = locale === "en";
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blogs || blogs.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".blog-card", {
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [blogs]);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-danube-navy overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        
        <div ref={headerRef} className="flex justify-between items-end mb-16 border-b border-gray-100 dark:border-white/10 pb-8">
          <div>
            <span className="text-danube-red font-black tracking-[0.4em] text-[10px] uppercase block mb-2">
              {isEn ? "STAY UPDATED" : "كن على اطلاع"}
            </span>
            <h2 className="text-5xl md:text-7xl font-black italic text-danube-navy dark:text-white tracking-tighter uppercase">
              {isEn ? "LATEST NEWS & BLOGS" : "آخر الأخبار"}
            </h2>
          </div>
          {/* Corrected path to /media/blogs */}
          <Link 
            href={`/${locale}/media/blogs`} 
            className="hidden md:flex items-center gap-2 text-danube-gold font-black tracking-widest text-[10px] hover:text-danube-red transition-colors uppercase"
          >
            {isEn ? "VIEW ALL" : "عرض الكل"} <ChevronRight size={14} />
          </Link>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((post) => (
            <Link 
              key={post._id} 
              href={`/${locale}/media/blogs/${post.slug}`} // Corrected individual blog path
              className="blog-card group cursor-pointer block"
            >
              <div className="relative h-[400px] w-full mb-6 overflow-hidden bg-gray-200 shadow-lg">
                <CldImage 
                  src={post.thumbnail} 
                  alt={isEn ? post.title.en : post.title.ar}
                  fill
                  className="object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-danube-navy/80 via-transparent to-transparent opacity-60"></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-sm md:text-base leading-[1.2] text-danube-navy dark:text-white group-hover:text-danube-red transition-colors uppercase tracking-tight">
                  {isEn ? post.title.en : post.title.ar}
                </h3>
                <div className="w-8 h-[2px] bg-danube-gold group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:hidden">
            <Link href={`/${locale}/media/blogs`} className="flex justify-center items-center gap-2 text-danube-gold font-black tracking-widest text-[10px] uppercase">
                {isEn ? "VIEW ALL" : "عرض الكل"} <ChevronRight size={14} />
            </Link>
        </div>
      </div>
    </section>
  );
}