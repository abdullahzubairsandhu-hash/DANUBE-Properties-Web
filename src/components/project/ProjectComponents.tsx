// src/components/project/ProjectComponents.tsx

"use client";

import { useRef } from "react";
// import { useScroll, useTransform, motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import 'next-cloudinary/dist/cld-video-player.css';
import React from 'react';


// --- TYPES ---
interface WhyAreaItem {
  icon: string;
  textEn: string;
  textAr: string;
}

interface Amenity {
  imageId: string;
  titleEn: string;
  titleAr: string;
  icon?: string;
}

interface FAQ {
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
}

// --- COMPONENTS ---

// 1. HERO SECTION
export function ProjectHero({ mediaId, isVideo }: { mediaId: string; isVideo: boolean }) {
  // We manually build the Cloudinary URL to ensure high quality and "shimmer"
  const videoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto,e_improve:outdoor,cs_srgb/${mediaId}`;

  return (
    <section className="relative w-full h-[80vh] lg:h-screen bg-black">
      {isVideo ? (
        <video
          key={mediaId}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-[1.15] contrast-[1.1] saturate-[1.2]"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <CldImage src={mediaId} alt="Hero" fill className="object-cover" priority />
      )}
    </section>
  );
}

// 2. SPECS GRID
export function SpecBox({ label, value, idx }: { label: string; value: string; idx: number }) {
  return (
    <div className="relative flex flex-col items-center justify-center p-10 group bg-transparent">
      {/* Vertical divider: only on desktop and not for the last item in a row of 3 */}
      {(idx + 1) % 3 !== 0 && (
        <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gray-300 hidden md:block" />
      )}
      
      {/* Horizontal divider: only for the top row items */}
      {idx < 3 && (
        <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gray-300 hidden md:block" />
      )}
      
      <span className="font-secondary text-gray-400 text-[12px] tracking-[2.8px] uppercase mb-3 font-medium">
        {label}
      </span>
      <span className="font-primary text-danube-gold text-[20px] lg:text-[26px] uppercase tracking-wide text-center leading-tight">
        {value}
      </span>
    </div>
  );
}

// 3. WHY AREA (Wipe Banner)
export function WhyArea({ area, items, isEn }: { area: string; items: WhyAreaItem[]; isEn: boolean }) {
  // Clean the area name: takes "Sheikh Zayed Road, Dubai" and returns "Sheikh Zayed Road"
  const cleanedArea = area.split(',')[0].trim();

  return (
    <section className="py-24 bg-white flex flex-col items-center">
      <div className="text-center mb-16">
        <span className="font-secondary text-gray-400 text-[16px] lg:text-[18px] tracking-[4px] uppercase block mb-3 font-medium">
          {isEn ? "Why ?" : "لماذا ؟"}
        </span>
        <h2 className="font-primary text-danube-gold text-[35px] lg:text-[50px] uppercase leading-tight">
          {cleanedArea}
        </h2>
      </div>

      {/* Grid with Void UI: No outer borders, only internal dividers */}
      <div className="grid grid-cols-2 md:grid-cols-3 w-full max-w-5xl px-6">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={`relative flex flex-col items-center p-12 transition-all duration-500 hover:bg-gray-50/50`}
          >
            {/* Vertical Divider logic */}
            {(idx + 1) % 3 !== 0 && (
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gray-200 hidden md:block" />
            )}
            {/* Horizontal Divider logic (for the first row in 3-col grid) */}
            {idx < 3 && items.length > 3 && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gray-200 hidden md:block" />
            )}
            
            {/* For mobile 2-col vertical dividers */}
            {(idx + 1) % 2 !== 0 && (
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gray-200 md:hidden" />
            )}

            <div className="mb-8 h-[55px] w-[55px] relative group-hover:scale-110 transition-transform">
              <CldImage 
                src={item.icon} 
                alt={item.textEn} 
                width={55} 
                height={55} 
                className="object-contain" 
              />
            </div>
            <p className="font-secondary text-[12px] lg:text-[14px] tracking-[2px] text-gray-500 uppercase text-center leading-relaxed max-w-[150px]">
              {isEn ? item.textEn : item.textAr}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. AMENITIES SLIDER
export function AmenitiesSlider({ 
  showcase, 
  icons, 
  isEn 
}: { 
  showcase: Amenity[]; 
  icons: Amenity[]; 
  isEn: boolean 
}) {
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(0);

  // Slider controls only the high-res showcase
  const next = () => setCurrent((prev) => (prev === showcase.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? showcase.length - 1 : prev - 1));

  return (
    <section className="relative w-full h-screen bg-black">
      {/* FULL SCREEN SLIDER - High Res Renders */}
      <div className="relative w-full h-full">
        <CldImage 
          src={showcase[current].imageId} 
          alt="Amenity" 
          fill 
          className="object-cover opacity-80" 
        />
        
        <button onClick={prev} className="absolute left-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-danube-gold transition-colors">
          <ChevronLeft size={60} strokeWidth={1} />
        </button>
        <button onClick={next} className="absolute right-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-danube-gold transition-colors">
          <ChevronRight size={60} strokeWidth={1} />
        </button>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-12 py-4 text-center min-w-[300px]">
          <span className="font-primary text-white text-[24px] uppercase tracking-[4px]">
            {isEn ? showcase[current].titleEn : showcase[current].titleAr}
          </span>
        </div>
      </div>

      {/* MODAL TRIGGER */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <button 
          onClick={() => setShowModal(true)}
          className="text-white border-b border-white pb-1 font-secondary text-[12px] tracking-[2px] uppercase hover:text-danube-gold hover:border-danube-gold transition-all"
        >
          {isEn ? "View All Amenities" : "عرض جميع المرافق"}
        </button>
      </div>

      {/* THE MODAL - Icon Based */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-4xl p-12 max-h-[80vh] overflow-y-auto rounded-sm">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-black hover:rotate-90 transition-transform">
              <X size={32} />
            </button>
            
            {/* Using the icons data here */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {icons.map((amt, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 relative">
                    <CldImage src={amt.imageId} width={48} height={48} alt="icon" className="object-contain" />
                  </div>
                  <span className="font-secondary text-[11px] text-gray-500 uppercase text-center">
                    {isEn ? amt.titleEn : amt.titleAr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// 5. REVEAL GALLERY (Fixed Sticky logic)
export function RevealGallery({ images, isEn }: { images: string[]; isEn: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 1. "Locking" logic: if top is at 0 and bottom hasn't left the screen
      const active = rect.top <= 0 && rect.bottom >= windowHeight;
      setIsVisible(active);

      // 2. Calculate Progress (0 to 1)
      const totalScrollable = containerRef.current.offsetHeight - windowHeight;
      const currentScroll = -rect.top;
      const p = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black" 
      style={{ height: "420vh" }} // Your requested height
    >
      {/* FIXED CONTAINER: This provides the "Locking" effect */}
      <div 
        className={`${isVisible ? 'fixed' : 'absolute'} top-0 left-0 w-full h-screen overflow-hidden`}
        style={!isVisible && progress > 0.9 ? { top: 'auto', bottom: 0 } : {}}
      >
        {/* IMAGES 1-4 */}
        {images.slice(0, 4).map((img, index) => {
          // Progress logic identical to PropertyShowcase
          const start = index * 0.2; 
          const localProgress = Math.min(Math.max((progress - start) / 0.2, 0), 1);

          return (
            <div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{
                zIndex: 20 - index,
                // Wiping from bottom to top
                clipPath: `inset(0 0 ${localProgress * 100}% 0)`,
                transition: 'clip-path 0.1s linear',
              }}
            >
              <CldImage 
                src={img} 
                alt={`Gallery ${index}`} 
                fill 
                className="object-cover" 
                priority={index === 0} 
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          );
        })}

        {/* FINAL LAYER: THE AMENITIES BANNER */}
        {(() => {
          // Banner reveals in the last 20% of the scroll
          const bannerProgress = Math.min(Math.max((progress - 0.8) / 0.2, 0), 1);
          
          return (
            <div 
              className="absolute inset-0 w-full h-full bg-black z-[5] flex items-center justify-center text-center"
              style={{
                opacity: bannerProgress,
                transform: `scale(${0.95 + (bannerProgress * 0.05)})`,
              }}
            >
              <div>
                <h2 className="font-primary text-danube-gold text-[60px] lg:text-[120px] uppercase leading-tight tracking-tight">
                  {isEn ? "Amenities" : "المرافق"}
                </h2>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// 7. MEDIA GALLERY
export function ImageGallery({ images, isEn }: { images: string[]; isEn: boolean }) {
  // We double the images to ensure the loop is seamless
  const loopImages = [...images, ...images];

  return (
    <section className="py-24 overflow-hidden bg-white">
      {/* 1. CENTERED HEADINGS */}
      <div className="text-center mb-16 px-6">
        <span className="font-secondary text-gray-400 text-[16px] lg:text-[18px] tracking-[4px] uppercase block mb-3 font-medium">
          {isEn ? "Media" : "إعلام"}
        </span>
        <h2 className="font-primary text-danube-gold text-[35px] lg:text-[50px] uppercase leading-tight">
          {isEn ? "Image Gallery" : "معرض الصور"}
        </h2>
      </div>

      {/* 2. INFINITE MARQUEE */}
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {loopImages.map((img, i) => (
            <div 
              key={i} 
              className="relative w-[350px] h-[220px] lg:w-[450px] lg:h-[280px] mx-3 shrink-0 group overflow-hidden"
            >
              <CldImage 
                src={img} 
                alt={`Gallery ${i}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Subtle overlay for a premium look */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. SCROLL LOGIC & KEYFRAMES */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }

        /* Hovering pauses the gallery so users can look at a specific image */
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

// 9. FAQ SECTION
export function FAQSection({ faqs, isEn }: { faqs: FAQ[]; isEn: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-8 max-w-4xl mx-auto">
      <h2 className="font-primary text-[35px] text-danube-navy uppercase mb-12 text-center">
        {isEn ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center text-left py-4"
            >
              <span className="font-secondary font-bold text-danube-navy uppercase tracking-wider">
                {isEn ? faq.qEn : faq.qAr}
              </span>
              <span className="text-2xl">{openIndex === i ? '-' : '+'}</span>
            </button>
            {openIndex === i && (
              <p className="font-inter-light text-gray-600 pb-4">
                {isEn ? faq.aEn : faq.aAr}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// 8. MAP SECTION (Missing Component added)
export function MapSection({ iframeUrl }: { iframeUrl: string }) {
  return (
    <section className="py-20 px-8 lg:px-24">
      <div className="max-w-[1200px] mx-auto h-[450px] overflow-hidden rounded-xl border border-gray-100 shadow-lg">
        <iframe src={iframeUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
      </div>
    </section>
  );
}