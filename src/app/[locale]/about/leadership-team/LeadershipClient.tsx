// src/app/[locale]/about/leadership-team/LeadershipClient.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

// We define the base structure so the page isn't empty while loading
const getBaseLeaders = (isEn: boolean) => [
  {
    id: "chairman",
    name: "Mr. Rizwan Sajan",
    // Now we use isEn here!
    designation: isEn ? "Founder & Chairman - Danube" : "المؤسس ورئيس مجلس الإدارة - دانوب",
    src: "chairman_xazql9",
    href: "chairman",
  },
  {
    id: "vice",
    name: "Mr. Anis Sajan",
    // And here!
    designation: isEn ? "Vice Chairman" : "نائب رئيس مجلس الإدارة",
    src: "anis_sajan_zhcebv",
    href: "vice-chairman",
  },
  {
    id: "md",
    name: "Mr. Adel Sajan",
    // And here!
    designation: isEn ? "Group Managing Director" : "العضو المنتدب للمجموعة",
    src: "adel_sajan_vnpqd5",
    href: "managing-director",
  },
];

export default function LeadershipClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const [leaders, setLeaders] = useState(() => getBaseLeaders(isEn));
  const [isLoading, setIsLoading] = useState(true);

  // Sync with the same DB data used by the individual pages
  const loadContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?locale=${locale}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const dbData: Record<string, string> = await res.json();
      
      if (dbData && Object.keys(dbData).length > 0) {
        const base = getBaseLeaders(isEn);
        const merged = base.map((leader) => ({
          ...leader,
          // We map the specific DB keys (e.g., chairman_name) to the card
          name: dbData[`${leader.id}_name`] || leader.name,
          designation: dbData[`${leader.id}_desig`] || leader.designation,
          src: dbData[`${leader.id}_image`] || leader.src,
        }));
        setLeaders(merged);
      }
    } catch (err) {
      console.error("Leadership List Sync Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [locale, isEn]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <main className={`min-h-screen bg-white transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      {/* 1. MAIN HEADING */}
      <section className="py-20 px-4 text-center">
        <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight">
          {isEn ? "Our Leaders" : "قادتنا"}
        </h1>
      </section>

      {/* 2. LEADERS CONTAINER */}
      <section className="max-w-7xl mx-auto px-6 mb-48">
        <div className="bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-2xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-16">
          {leaders.map((leader, index) => (
            <Link 
              key={index} 
              href={`/${locale}/about/leadership-team/${leader.href}`}
              className="group flex flex-col items-center text-center"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl mb-8">
                <CldImage
                  src={leader.src}
                  alt={leader.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <h3 className="font-primary text-black text-[24px] md:text-[28px] uppercase mb-2">
                {leader.name}
              </h3>

              {/* Designation */}
              <p className="font-secondary text-gray-500 text-[15px] font-bold uppercase tracking-widest leading-relaxed">
                {leader.designation}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}