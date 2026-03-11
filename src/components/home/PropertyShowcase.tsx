// src/components/home/PropertyShowcase.tsx

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CldImage from "@/components/shared/CldImageWrapper";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { Edit3 } from "lucide-react";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";

gsap.registerPlugin(ScrollTrigger);

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

interface PropertyShowcaseProps {
  locale: string;
  images: string[];
  slug: string;
  onAdminClick?: () => void; // New prop to trigger the modal in the next section
}

export default function PropertyShowcase({ locale, images, slug, onAdminClick }: PropertyShowcaseProps) {
  const mainContainer = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isEn = locale === 'en';
  const totalImages = images.length;

  useEffect(() => {
    if (totalImages === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${(totalImages + 2) * 100}%`, 
          pin: true,
          scrub: 1,
        }
      });

      images.forEach((_, index) => {
        tl.to(`.feature-img-${index}`, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1,
          ease: "none"
        }, index);

        tl.to(`.feature-img-${index}`, {
          autoAlpha: 0,
          duration: 0.1
        }, index + 1);
      });

      tl.from(".why-danube-content", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power2.out"
      }, totalImages); 

      tl.from(".danube-icon-card", {
        opacity: 0,
        scale: 0.5,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5"); 

      tl.to(".featured-projects-banner", {
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "+=0.5");

    }, mainContainer);

    return () => ctx.revert();
  }, [images, totalImages]);

  const { isAdmin } = useAdmin();

  return (
    <div ref={mainContainer} className="relative w-full bg-[#F9F9F9] overflow-hidden">
      <div ref={triggerRef} className="relative w-full h-screen">
        
        {images.map((publicId, index) => (
          <div
            key={`${publicId}-${index}`}
            className={`feature-img-${index} absolute inset-0 w-full h-full overflow-hidden`}
            style={{ zIndex: 40 - index, clipPath: 'inset(0 0 0% 0)' }}
          >
            <div className="relative w-full h-full">
              <CldImage src={publicId} alt={`Showcase ${index}`} fill className="object-cover" priority={index === 0} />
              <div className="absolute inset-0 bg-black/15" />
              <div className="absolute z-50 top-[86px] left-[48px]">
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#fff', fontFamily: 'var(--font-secondary)', fontSize: '14px', fontWeight: 500, letterSpacing: '1.4px', padding: '10px 48px', textTransform: 'uppercase' }}>
                  {isEn ? "INTERIOR" : "التصميم الداخلي"}
                </div>
              </div>
            </div>
          </div>
        ))}

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

        <div className="featured-projects-banner absolute bottom-0 left-0 w-full bg-[#F9F9F9] z-[30] flex flex-col items-center text-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] translate-y-full" style={{ height: '45vh' }}>
          <div className="py-16 md:py-20 flex flex-col items-center">
            <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: '39px', fontWeight: 400, letterSpacing: '1.7px', textTransform: 'uppercase', marginBottom: '40px' }}>
              {isEn ? "FEATURED PROJECTS" : "مشاريع مميزة"}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href={`/${locale}/projects/${slug}`}>
                {/* Changed button to span to fix Hydration Error */}
                <span className="hover:bg-black cursor-pointer transition-all duration-400" style={{ backgroundColor: 'rgb(85, 85, 85)', color: 'white', width: '180px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'var(--font-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  {isEn ? "DISCOVER" : "اكتشف"}
                </span>
              </Link>
              <button className="hover:opacity-90 shadow-sm transition-all duration-400" style={{ backgroundColor: 'rgb(189, 165, 136)', color: 'white', width: '240px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {isEn ? "REGISTER INTEREST" : "سجل اهتمامك"}
              </button>

              {/* SHIFTED ADMIN BUTTON */}
              <ClientOnlyAdmin>
                {isAdmin && (
                  <button 
                    onClick={onAdminClick}
                    className="flex items-center justify-center gap-2 border-2 border-danube-gold text-danube-gold hover:bg-danube-gold hover:text-white transition-all duration-400"
                    style={{ width: '180px', height: '56px', fontFamily: 'var(--font-secondary)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}
                  >
                    <Edit3 size={16} />
                    {isEn ? "Edit Projects" : "تعديل المشاريع"}
                  </button>
                )}
              </ClientOnlyAdmin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}