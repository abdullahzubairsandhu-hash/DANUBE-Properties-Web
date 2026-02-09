// src/components/home/BlogSection.tsx

"use client";
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { ChevronRight } from "lucide-react";

const BLOG_DATA = (isEn: boolean) => [
  { 
    id: 1, 
    title: isEn ? "SHAH RUKH KHAN HONORED WITH DUBAI'S NEWEST LANDMARK: SHAHRUKHZ" : "شاروخان يفتتح أحدث معالم دبي: شاروخ زد", 
    publicId: "shah-rukh-khan-honored-with-dubais-newest-landmark-shahrukhz-by-danube_nxoxo6" 
  },
  { 
    id: 2, 
    title: isEn ? "SUCCESS STORIES OF ENTREPRENEURS IN THE UAE" : "قصص نجاح رواد الأعمال في الإمارات", 
    publicId: "meet-the-richest-indian-in-dubai-a-billionaire-businessman-who-has-a-staggering-net-worth-of-rs-20883-crore-and-runs-a-rs-16709-crore-empire_olbyih" 
  },
  { 
    id: 3, 
    title: isEn ? "RIZWAN SAJAN INVITES KAMIYA FOR IFTAR AT HIS MANSION" : "رضوان ساجان يستضيف كاميا لتناول الإفطار في قصره", 
    publicId: "rizwan-sajan-invites-kamiya-for-an-iftar-meal-at-his-mansion-in-dubai-for-sunday-brunch_n5dz1l" 
  },
  { 
    id: 4, 
    title: isEn ? "BREEZ BY DANUBE BECOMES MARITIME CITY'S TALLEST TOWER" : "بريز من دانوب يصبح أطول برج في مدينة دبي الملاحية", 
    publicId: "premium-waterfront-residences-breez-by-danube-becomes-dubai-maritime-citys-tallest-tower-with-panoramic-sea-views_qwimjf" 
  },
];

export default function BlogSection({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const posts = BLOG_DATA(isEn);

  return (
    <section className="py-24 bg-white dark:bg-danube-navy">
      <div className="max-w-[1440px] mx-auto px-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-16 border-b border-gray-100 dark:border-white/10 pb-8">
          <div>
            <span className="text-danube-red font-black tracking-[0.4em] text-[10px] uppercase block mb-2">
              {isEn ? "STAY UPDATED" : "كن على اطلاع"}
            </span>
            <h2 className="text-5xl md:text-7xl font-black italic text-danube-navy dark:text-white tracking-tighter uppercase">
              {isEn ? "LATEST NEWS & BLOGS" : "آخر الأخبار"}
            </h2>
          </div>
          <Link href={`/${locale}/blog`} className="hidden md:flex items-center gap-2 text-danube-gold font-black tracking-widest text-[10px] hover:text-danube-red transition-colors uppercase">
            {isEn ? "VIEW ALL" : "عرض الكل"} <ChevronRight size={14} />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              {/* IMAGE CONTAINER */}
              <div className="relative h-[400px] w-full mb-6 overflow-hidden bg-gray-200">
                <CldImage 
                  src={post.publicId} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-danube-navy/80 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* CONTENT */}
              <div className="space-y-4">
                <h3 className="font-black text-sm md:text-base leading-[1.2] text-danube-navy dark:text-white group-hover:text-danube-red transition-colors uppercase tracking-tight">
                  {post.title}
                </h3>
                <div className="w-8 h-[2px] bg-danube-gold group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mt-12 md:hidden">
            <Link href={`/${locale}/blog`} className="flex justify-center items-center gap-2 text-danube-gold font-black tracking-widest text-[10px] uppercase">
                {isEn ? "VIEW ALL" : "عرض الكل"} <ChevronRight size={14} />
            </Link>
        </div>
      </div>
    </section>
  );
}