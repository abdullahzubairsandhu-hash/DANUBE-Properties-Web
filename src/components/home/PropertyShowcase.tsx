// src/components/home/PropertyShowcase.tsx

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CldImage from "@/components/shared/CldImageWrapper";

gsap.registerPlugin(ScrollTrigger);

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
  const mainContainer = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isEn = locale === 'en';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=500%", // Gave it more room for a premium slow-burn feel
          pin: true,
          scrub: 1,
        }
      });

      // 1. IMAGE REVEAL SEQUENCE
      FEATURES.forEach((_, index) => {
        // First, clip the image
        tl.to(`.feature-img-${index}`, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1,
          ease: "none"
        }, index);

        // SECOND: This is the missing piece! 
        // Once clipped, set opacity to 0 so it doesn't block the layers below
        tl.to(`.feature-img-${index}`, {
          autoAlpha: 0,
          duration: 0.1
        }, index + 1);
      });

      // 2. REVEAL "WHY DANUBE" CONTENT
      // We start this exactly as the last image (index 3) finishes its move
      tl.from(".why-danube-content", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power2.out"
      }, FEATURES.length); 

      // 3. STAGGER THE ICONS
      tl.from(".danube-icon-card", {
        opacity: 0,
        scale: 0.5,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5"); 

      // 4. REVEAL THE FINAL BANNER STRIP
      tl.to(".featured-projects-banner", {
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "+=0.5");

    }, mainContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainer} className="relative w-full bg-[#F9F9F9] overflow-hidden">
      <div ref={triggerRef} className="relative w-full h-screen">
        
        {/* IMAGES LAYER - Fixed zIndex and added visibility class */}
        {FEATURES.map((feature, index) => (
          <div
            key={feature.id}
            className={`feature-img-${index} absolute inset-0 w-full h-full overflow-hidden`}
            style={{ 
              zIndex: 40 - index, // Increased Z-index to ensure they stay on top until cleared
              clipPath: 'inset(0 0 0% 0)' 
            }}
          >
            <div className="relative w-full h-full">
              <CldImage src={feature.publicId} alt={feature.title} fill className="object-cover" priority={index === 0} />
              <div className="absolute inset-0 bg-black/15" />
              <div className="absolute z-50 top-[86px] left-[48px]">
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#fff', fontFamily: 'var(--font-secondary)', fontSize: '14px', fontWeight: 500, letterSpacing: '1.4px', padding: '10px 48px', textTransform: 'uppercase' }}>
                  {isEn ? feature.title : 'التصميم'}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* WHY DANUBE LAYER - Stays behind at z-10 */}
        <div className="why-danube-content absolute inset-0 w-full h-full bg-[#F9F9F9] z-10 flex flex-col items-center justify-center">
          <div className="text-center mt-10 mb-8">
            <span style={{ color: 'rgb(136, 136, 136)', fontFamily: 'var(--font-secondary)', fontSize: '18px', fontWeight: 500, letterSpacing: '2.88px', textTransform: 'uppercase' }}>Why</span>
            <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: '32px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '8px' }}>
              Danube Properties?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl relative px-4">
            {WHY_DANUBE.map((item, idx) => (
              <div key={idx} className="danube-icon-card relative flex flex-col items-center justify-center p-6 md:p-10 group">
                {(idx + 1) % 4 !== 0 && <div className="absolute right-0 top-1/4 bottom-1/4 w-[1.5px] bg-gray-200 hidden md:block" />}
                {idx < 4 && <div className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-gray-200 hidden md:block" />}
                
                <div className="mb-6 h-[64px] w-[64px] relative transition-transform duration-500 group-hover:scale-110">
                  <CldImage src={item.publicId} alt={item.label} width={64} height={64} className="object-contain" />
                </div>
                <p style={{ color: 'rgb(85, 85, 85)', fontFamily: 'var(--font-secondary)', fontSize: '12px', letterSpacing: '1.4px', lineHeight: '1.2', textTransform: 'uppercase', textAlign: 'center', fontWeight: 500 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED PROJECTS STRIP */}
        <div className="featured-projects-banner absolute bottom-0 left-0 w-full bg-[#F9F9F9] z-[30] flex flex-col items-center text-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] translate-y-full" style={{ height: '45vh' }}>
          <div className="py-16 md:py-20 flex flex-col items-center">
            <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: '39px', fontWeight: 400, letterSpacing: '1.7px', textTransform: 'uppercase', marginBottom: '40px' }}>
              {isEn ? "FEATURED PROJECTS" : "مشاريع مميزة"}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="hover:bg-black transition-all duration-400" style={{ backgroundColor: 'rgb(85, 85, 85)', color: 'white', width: '180px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'var(--font-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                {isEn ? "DISCOVER" : "اكتشف"}
              </button>
              <button className="hover:opacity-90 shadow-sm transition-all duration-400" style={{ backgroundColor: 'rgb(189, 165, 136)', color: 'white', width: '240px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {isEn ? "REGISTER INTEREST" : "سجل اهتمامك"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}