// src/app/[locale]/media/video/VideoGalleryClient.tsx

"use client";

import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Play, X } from "lucide-react";
import { videoData } from "@/data/videos";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

export default function VideoGalleryClient({ locale }: { locale: string }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <CldImage
          src="skyline_company-profile_tgvoja"
          alt="Video Gallery Skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* CENTERED HEADING */}
        <div className="mb-20 flex flex-col items-center text-center">
          <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Video Gallery" : "معرض الفيديو"}
          </h1>
          <div className="w-24 h-1.5 bg-danube-gold mt-4"></div>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {videoData.map((video) => (
            <div 
              key={video.id}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.embedUrl)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <CldImage
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-125">
                    <Play className="text-danube-gold fill-danube-gold w-6 h-6 ml-1" />
                  </div>
                </div>
              </div>
              
              <h3 className="mt-6 font-primary text-black text-[20px] md:text-[22px] uppercase text-center tracking-wide group-hover:text-danube-gold transition-colors font-medium">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL POPUP - Native Iframe Implementation */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          />
          
          <div className="relative w-full max-w-6xl aspect-video z-10 bg-black shadow-2xl rounded-xl overflow-hidden">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white flex items-center gap-2 hover:text-danube-gold transition-colors group"
            >
              <span className="uppercase text-sm font-bold tracking-widest">{isEn ? 'Close' : 'إغلاق'}</span>
              <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            <div className="w-full h-full">
               <iframe
                width="100%"
                height="100%"
                src={`${selectedVideo}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}