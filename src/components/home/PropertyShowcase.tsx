// src/components/home/PropertyShowcase.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import CldImage from "@/components/shared/CldImageWrapper";

const FEATURES = [
  { id: 1, title: "EXTERIOR", publicId: "banner1-2_Shahrukhz_Exterior_sghqze" },
  { id: 2, title: "GRAND LOBBY", publicId: "banner2-2_Shahrukhz_Grand_Lobby_mo8yzb" },
  { id: 3, title: "HELIPAD", publicId: "banner3-2_Shahrukhz_Helipad_wj8xpn" },
  { id: 4, title: "OFFICE", publicId: "banner4-2_Shahrukhz_Office_c4qhdk" },
];

const WHY_DANUBE = [
  { label: "0% Interest", publicId: "interest-0_md7dy5" },
  { label: "1% Per Month", publicId: "1persent_cy4nzd" },
  { label: "80 Months Payment Plan", publicId: "80_k1kww3" },
  { label: "High Return on Investment", publicId: "highreturn_tycz85" },
  { label: "Timely Delivery", publicId: "timely_vwxeuc" },
  { label: "Prime Locations", publicId: "location_lbjbij" },
  { label: "Luxury Furnishing", publicId: "luxzary_hqerpo" },
  { label: "40+ Amenities", publicId: "amenities_a8zeni" },
];

export default function PropertyShowcase({ locale }: { locale: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isEn = locale === 'en';

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const active = rect.top <= 0 && rect.bottom >= windowHeight;
      setIsVisible(active);

      const totalScrollable = containerRef.current.offsetHeight - windowHeight;
      const currentScroll = -rect.top;
      const p = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ height: "440vh" }}>
      <div 
        className={`${isVisible ? 'fixed' : 'absolute'} top-0 left-0 w-full h-screen overflow-hidden`}
        style={!isVisible && progress > 0.9 ? { top: 'auto', bottom: 0 } : {}}
      >
        {/* IMAGES 1-4 */}
        {FEATURES.map((feature, index) => {
          const start = index * 0.2; 
          const localProgress = Math.min(Math.max((progress - start) / 0.2, 0), 1);

          return (
            <div
              key={feature.id}
              className="absolute inset-0 w-full h-full"
              style={{
                zIndex: 20 - index,
                clipPath: `inset(0 0 ${localProgress * 100}% 0)`,
                transition: 'clip-path 0.1s linear',
              }}
            >
              <div className="relative w-full h-full">
                <CldImage src={feature.publicId} alt={feature.title} fill className="object-cover" priority={index === 0} />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute z-50" style={{ top: '86px', left: '48px', opacity: localProgress > 0.8 ? 0 : 1 }}>
                  <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#fff', fontFamily: 'var(--font-secondary)', fontSize: '14px', fontWeight: 500, letterSpacing: '1.4px', padding: '10px 48px', textTransform: 'uppercase' }}>
                    {isEn ? feature.title : 'التصميم'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 5TH LAYER: WHY DANUBE INFO GRID (THE "VOID" FILLER) */}
        <div className="absolute inset-0 w-full h-full bg-[#F9F9F9] z-[5] flex flex-col items-center justify-center">
          <div className="text-center mt-10 mb-8">
            <span style={{ color: 'rgb(136, 136, 136)', fontFamily: 'var(--font-secondary)', fontSize: '18px', fontWeight: 500, letterSpacing: '2.88px', textTransform: 'uppercase' }}>Why</span>
            <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: '32px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '8px' }}>
              Danube Properties?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl relative">
            {WHY_DANUBE.map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center justify-center p-10 group">
                {/* Refined Prominent Lines */}
                {(idx + 1) % 4 !== 0 && <div className="absolute right-0 top-1/4 bottom-1/4 w-[1.5px] bg-gray-300 hidden md:block" />}
                {idx < 4 && <div className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-gray-300 hidden md:block" />}
                
                <div className="mb-6 h-[64px] w-[64px] relative transition-transform duration-500 group-hover:scale-110">
                  <CldImage src={item.publicId} alt={item.label} width={64} height={64} className="object-contain" />
                </div>
                <p style={{ color: 'rgb(85, 85, 85)', fontFamily: 'var(--font-secondary)', fontSize: '13px', letterSpacing: '1.4px', lineHeight: '1.2', textTransform: 'uppercase', textAlign: 'center', fontWeight: 500 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6TH LAYER: THE "FEATURED PROJECTS" BANNER (REVEALS AS A STRIP) */}
        {(() => {
          // Banner starts revealing at 85% scroll
          const bannerProgress = Math.min(Math.max((progress - 0.85) / 0.15, 0), 1);
          return (
            <div 
              className="absolute bottom-0 left-0 w-full bg-[#F9F9F9] z-[30] flex flex-col items-center text-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-transform duration-100 ease-out"
              style={{ 
                height: '45vh', // Condensed height to match "strip" feel
                transform: `translateY(${(1 - bannerProgress) * 100}%)`,
              }}
            >
              <div className="py-16 md:py-20 flex flex-col items-center">
                
                
                <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: '39px', fontWeight: 400, letterSpacing: '1.7px', textTransform: 'uppercase', marginBottom: '40px' }}>
                  {isEn ? "FEATURED PROJECTS" : "مشاريع مميزة"}
                </h2>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  {/* DISCOVER BUTTON (EXACT HERO STYLE) */}
                  <button className="hover:bg-black transition-all duration-400" style={{ backgroundColor: 'rgb(85, 85, 85)', color: 'white', width: '180px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'var(--font-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    {isEn ? "DISCOVER" : "اكتشف"}
                  </button>

                  {/* REGISTER INTEREST BUTTON (EXACT HERO STYLE) */}
                  <button className="hover:opacity-90 shadow-sm transition-all duration-400" style={{ backgroundColor: 'rgb(189, 165, 136)', color: 'white', width: '240px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {isEn ? "REGISTER INTEREST" : "سجل اهتمامك"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}