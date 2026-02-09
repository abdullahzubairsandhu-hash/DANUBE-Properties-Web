// src/app/[locale]/media/3d-tours/ToursClient.tsx

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
// Removed MoveUpRight as it's no longer needed
import { tourData } from "@/data/tours";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

export default function ToursClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <CldImage
          src="skyline_company-profile_tgvoja"
          alt="3D Tours Skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* CENTERED HEADING */}
        <div className="mb-20 flex flex-col items-center text-center">
          <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "3D Tours" : "جولات ثلاثية الأبعاد"}
          </h1>
          <div className="w-24 h-1.5 bg-danube-gold mt-4"></div>
        </div>

        {/* TOURS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {tourData.map((tour) => (
            <a 
              key={tour.id}
              href={tour.tourUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <CldImage
                  src={tour.thumbnail}
                  alt={tour.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* RECTANGULAR BOX OVERLAY */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="border border-white/80 py-2 px-4 self-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="font-secondary text-white text-[12px] md:text-[14px] uppercase tracking-[0.2em]">
                      {isEn ? "Visit Virtual Look" : "زيارة المظهر الافتراضي"}
                    </span>
                  </div>
                </div>
              </div>
              
              <h3 className="mt-6 font-primary text-black text-[20px] md:text-[22px] uppercase text-center tracking-wide group-hover:text-danube-gold transition-colors font-medium">
                {tour.name}
              </h3>
            </a>
          ))}
        </div>
      </section>

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}