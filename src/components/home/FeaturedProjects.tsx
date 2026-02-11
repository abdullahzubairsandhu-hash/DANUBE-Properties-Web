// src/components/home/FeaturedProjects.tsx

"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CldImage from "@/components/shared/CldImageWrapper";

gsap.registerPlugin(ScrollTrigger);

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
  const mainContainer = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isEn = locale === 'en';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=700%", // Adjusted for 6 images + 1 grid layer
          pin: true,
          scrub: 1,
        }
      });

      // 1. PROJECT IMAGES REVEAL (6 Images)
      FEATURED_PROJECTS.forEach((_, index) => {
        // Slide away/Clip image
        tl.to(`.project-img-${index}`, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1,
          ease: "none"
        }, index);

        // Hide it completely so it's not clickable behind other layers
        tl.to(`.project-img-${index}`, {
          autoAlpha: 0,
          duration: 0.1
        }, index + 1);
      });

      // 2. REVEAL WHY INVEST CONTENT
      tl.from(".why-invest-content", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power2.out"
      }, FEATURED_PROJECTS.length);

      // 3. STAGGERED GRID ICONS
      tl.from(".invest-card", {
        opacity: 0,
        y: 40,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.5");

    }, mainContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainer} className="relative w-full bg-[#F9F9F9] overflow-hidden">
      <div ref={triggerRef} className="relative w-full h-screen">
        
        {/* PROJECT IMAGES */}
        {FEATURED_PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className={`project-img-${index} absolute inset-0 w-full h-full`}
            style={{
              zIndex: 40 - index,
              clipPath: 'inset(0 0 0% 0)',
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
                className="object-cover object-top" 
                priority={index < 2} 
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            </Link>
          </div>
        ))}

        {/* WHY INVEST LAYER */}
        <div className="why-invest-content absolute inset-0 w-full h-full bg-[#F9F9F9] z-10 flex flex-col items-center justify-center">
          <div className="text-center mt-6 mb-8" style={{ direction: isEn ? 'ltr' : 'rtl' }}>
            <span style={{ color: 'rgb(136, 136, 136)', fontFamily: 'var(--font-secondary)', fontSize: '18px', fontWeight: 500, letterSpacing: '2.88px', textTransform: 'uppercase' }}>
              {isEn ? "Why" : "لماذا"}
            </span>
            <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: '32px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '8px' }}>
              {isEn ? "Invest In Dubai?" : "الاستثمار في دبي؟"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl relative px-4">
            {WHY_INVEST.map((item, idx) => (
              <div key={idx} className="invest-card relative flex flex-col items-center justify-center p-8 group">
                {(idx + 1) % 4 !== 0 && <div className="absolute right-0 top-1/4 bottom-1/4 w-[1.5px] bg-gray-200 hidden md:block" />}
                {idx < 4 && <div className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-gray-200 hidden md:block" />}
                
                <div className="mb-4 h-[64px] w-[64px] relative transition-transform duration-500 group-hover:scale-110">
                  <CldImage src={item.publicId} alt={isEn ? item.labelEn : item.labelAr} width={64} height={64} className="object-contain" />
                </div>
                <p className="font-medium" style={{ color: 'rgb(85, 85, 85)', fontFamily: 'var(--font-secondary)', fontSize: '12px', letterSpacing: '1.4px', lineHeight: '1.2', textTransform: 'uppercase', textAlign: 'center' }}>
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