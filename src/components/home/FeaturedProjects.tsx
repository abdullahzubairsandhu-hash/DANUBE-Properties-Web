// src/components/home/FeaturedProjects.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import CldImage from "@/components/shared/CldImageWrapper";

const FEATURED_PROJECTS = [
  { id: "breez", publicId: "Breez-image-1_zueu8a", slug: "breez" },
  { id: "aspirz", publicId: "aspirz-image-1_yu3ur4", slug: "aspirz" },
  { id: "sparklz", publicId: "sparklz-image-1_cnmszt", slug: "sparklz" },
  { id: "timez", publicId: "timez-image-1_w3svcj", slug: "timez" },
  { id: "bayz102", publicId: "bayz102-image-1_xnlntx", slug: "bayz-102" },
  { id: "diamondz", publicId: "diamondz-image-1_ceep0e", slug: "diamondz" },
];

const WHY_INVEST = [
  { labelEn: "Safest city in the world", labelAr: "المدينة الأكثر أماناً في العالم", publicId: "saftycity_lhqlvw" },
  { labelEn: "Fastest growing Economy", labelAr: "الاقتصاد الأسرع نمواً", publicId: "grow_atjyqa" },
  { labelEn: "High Capital Appreciation", labelAr: "ارتفاع قيمة رأس المال", publicId: "highcapacity_dysm0c" },
  { labelEn: "Ease of Investment", labelAr: "سهولة الاستثمار", publicId: "investment_dflc0s" },
  { labelEn: "Freehold Ownership", labelAr: "تملك حر", publicId: "freehold_bfjwkm" },
  { labelEn: "100% Tax free income", labelAr: "دخل معفى من الضرائب بنسبة 100%", publicId: "taxfree_vnrfqc" },
  { labelEn: "Long-term Golden Visa", labelAr: "تأشيرة ذهبية طويلة الأمد", publicId: "longterm_ghjdl5" },
  { labelEn: "WorldWide Connectivity", labelAr: "اتصال عالمي", publicId: "worldwide_luvmof" },
];

export default function FeaturedProjects({ locale }: { locale: string }) {
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
    <div 
      ref={containerRef} 
      className="relative w-full bg-white" 
      style={{ height: "580vh" }} // Shortened from 640vh for a tighter scroll
    >
      <div 
        className={`${isVisible ? 'fixed' : 'absolute'} top-0 left-0 w-full h-screen overflow-hidden`}
        style={!isVisible && progress > 0.9 ? { top: 'auto', bottom: 0 } : {}}
      >
        
        {FEATURED_PROJECTS.map((project, index) => {
          // Optimized segments for 6 images + the Grid
          const start = index * 0.15; 
          const localProgress = Math.min(Math.max((progress - start) / 0.15, 0), 1);

          return (
            <div
              key={project.id}
              className="absolute inset-0 w-full h-full"
              style={{
                zIndex: 30 - index,
                clipPath: `inset(0 0 ${localProgress * 100}% 0)`,
                transition: 'clip-path 0.1s linear',
              }}
            >
              <Link 
                href={`/${locale}/projects/${project.slug}`}
                className="group block relative w-full h-full cursor-pointer"
              >
                <CldImage 
  src={project.publicId} 
  alt={project.id} 
  fill 
  className="object-cover object-top" // Changed from just 'object-cover'
  priority={index < 2} 
/>
                <div className="absolute inset-0 bg-black/10" />
                {/* HEADINGS REMOVED AS REQUESTED */}
              </Link>
            </div>
          );
        })}

        {/* FINAL LAYER: WHY INVEST IN DUBAI? */}
        <div className="absolute inset-0 w-full h-full bg-[#F9F9F9] z-[5] flex flex-col items-center justify-center">
          <div className="text-center mt-6 mb-8" style={{ direction: isEn ? 'ltr' : 'rtl' }}>
            <span style={{ color: 'rgb(136, 136, 136)', fontFamily: 'var(--font-secondary)', fontSize: '18px', fontWeight: 500, letterSpacing: '2.88px', textTransform: 'uppercase' }}>
              {isEn ? "Why" : "لماذا"}
            </span>
            <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: '32px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '8px' }}>
              {isEn ? "Invest In Dubai?" : "الاستثمار في دبي؟"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl relative">
            {WHY_INVEST.map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center justify-center p-8 group">
                {(idx + 1) % 4 !== 0 && <div className="absolute right-0 top-1/4 bottom-1/4 w-[1.5px] bg-gray-300 hidden md:block" />}
                {idx < 4 && <div className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-gray-300 hidden md:block" />}
                
                <div className="mb-4 h-[64px] w-[64px] relative transition-transform duration-500 group-hover:scale-110">
                  <CldImage src={item.publicId} alt={isEn ? item.labelEn : item.labelAr} width={64} height={64} className="object-contain" />
                </div>
                <p style={{ color: 'rgb(85, 85, 85)', fontFamily: 'var(--font-secondary)', fontSize: '13px', letterSpacing: '1.4px', lineHeight: '1.2', textTransform: 'uppercase', textAlign: 'center', fontWeight: 500 }}>
                  {isEn ? item.labelEn : item.labelAr}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}