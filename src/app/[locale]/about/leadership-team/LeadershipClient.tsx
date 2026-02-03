// src/app/[locale]/about/leadership-team/LeadershipClient.tsx

"use client";

import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

const LEADERS = [
  {
    name: "Mr. Rizwan Sajan",
    designation: "Founder & Chairman - Danube",
    src: "chairman_xazql9",
    href: "chairman", // Matches the folder name
  },
  {
    name: "Mr. Anis Sajan",
    designation: "Vice Chairman",
    src: "anis_sajan_zhcebv",
    href: "vice-chairman", // We'll create this folder next
  },
  {
    name: "Mr. Adel Sajan",
    designation: "Group Managing Director",
    src: "adel_sajan_vnpqd5",
    href: "managing-director", // We'll create this folder next
  },
];

export default function LeadershipClient({ locale }: { locale: string }) {
    const isEn = locale === 'en';
  return (
    <main className="min-h-screen bg-white">
      {/* 1. MAIN HEADING */}
      <section className="py-20 px-4 text-center">
        <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight">
          {isEn ? "Our Leaders" : "قادتنا"}
        </h1>
      </section>

      {/* 2. LEADERS CONTAINER */}
      {/* Increased mb-32 to mb-48 to push the contact section further down */}
      <section className="max-w-7xl mx-auto px-6 mb-48">
        <div className="bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-2xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-16">
          {LEADERS.map((leader, index) => (
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

      {/* The Contact & Footer will now start after that generous 48-unit gap */}
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}