// src/app/[locale]/about/our-jurney/JourneyClient.tsx 

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import { Building2, Home } from "lucide-react";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import { journeyData } from "@/data/journey"; 

export default function JourneyClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-white pt-48">
      <section className="max-w-7xl mx-auto px-6 mb-32">
        
        {/* CENTERED HEADING */}
        <div className="mb-40 flex flex-col items-center text-center">
          <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Our Journey" : "رحلتنا"}
          </h1>
          <div className="w-24 h-1.5 bg-danube-gold mt-4"></div>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          
          {/* THE MIDDLE LINE */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-danube-gold/40"></div>

          <div className="space-y-32">
            {journeyData.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative flex items-center justify-between w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* PROJECT CARD (The Polaroid) */}
                  <div className="w-[42%]">
                    {project.image ? (
                        <div className={`relative bg-white p-4 pb-14 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm transform transition-all duration-500 hover:scale-105 hover:z-20 ${isEven ? 'rotate-2' : '-rotate-2'}`}>
                          
                          {/* COMIC ARROW */}
                          <div className={`absolute top-10 w-6 h-6 bg-white rotate-45 transform shadow-[-5px_5px_10px_rgba(0,0,0,0.02)]
                            ${isEven ? '-left-3' : '-right-3'}`} 
                          />

                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                            <CldImage
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-8 text-center px-2">
                            <h3 className="font-primary text-black text-[20px] md:text-[24px] uppercase leading-tight">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                    ) : (
                        /* MILESTONE CARD (The Origin Story) */
                        <div className={`relative bg-danube-gold/5 border-2 border-dashed border-danube-gold/30 p-10 rounded-2xl text-center flex flex-col items-center ${isEven ? 'rotate-1' : '-rotate-1'}`}>
                             <Home className="mb-4 text-danube-gold w-10 h-10" />
                             <h3 className="font-primary text-black text-[28px] uppercase">{project.title}</h3>
                             <p className="font-secondary text-gray-600 mt-2 font-medium">{project.description}</p>
                        </div>
                    )}
                  </div>

                  {/* CENTER ICON */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-14 h-14 bg-danube-gold rounded-full flex items-center justify-center border-[6px] border-white shadow-xl">
                      <Building2 className="text-white w-6 h-6" />
                    </div>
                  </div>

                  {/* DATE & DESCRIPTION (On the opposite side) */}
                  <div className={`w-[42%] flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
                    <span className="font-primary text-danube-gold text-[38px] md:text-[48px] font-bold leading-none mb-4">
                      {project.year}
                    </span>
                    {project.image && (
                      <p className="font-secondary text-gray-700 text-[16px] md:text-[18px] font-medium max-w-md leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}