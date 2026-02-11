// src/components/project/ProjectComponents.tsx

"use client";

import React, { useRef, useState, useEffect } from "react";
// Swapping Framer Motion for GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CldImage } from "next-cloudinary";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import 'next-cloudinary/dist/cld-video-player.css';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  // We manually build the Cloudinary URL to ensure high quality and "shimmer"
  const videoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto,e_improve:outdoor,cs_srgb/${mediaId}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax scale effect on the hero media as you scroll
      gsap.to(mediaRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        scale: 1.2,
        ease: "none"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[80vh] lg:h-screen bg-black overflow-hidden">
      <div ref={mediaRef} className="w-full h-full">
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
      </div>
    </section>
  );
}

// 2. SPECS GRID
export function SpecBox({ label, value, idx }: { label: string; value: string; idx: number }) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This ensures the animation only runs once when the card scrolls into view
    gsap.fromTo(boxRef.current, 
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.95 
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8,
        delay: idx * 0.1, // This recreates the "stagger" effect
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 90%",
          toggleActions: "play none none none" // Plays once and stays visible
        }
      }
    );
  }, [idx]);

  return (
    <div 
      ref={boxRef}
      className="relative flex flex-col items-center justify-center p-10 group bg-transparent"
      style={{ opacity: 0 }} // Initial state for GSAP to take over
    >
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cleanedArea = area.split(',')[0].trim();

  useEffect(() => {
    // Ensure GSAP works even if the elements are already in view
    const ctx = gsap.context(() => {
      
      // 1. Title Fade Up
      gsap.fromTo(headerRef.current, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 95%",
          }
        }
      );

      // 2. Staggered Grid Reveal
      // We target the individual items directly for better control
      gsap.fromTo(".area-item", 
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".area-grid",
            start: "top 90%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white flex flex-col items-center overflow-hidden">
      {/* Set initial opacity to 1 so they show up even if JS fails, 
          GSAP will immediately snap them to 0 when the effect runs */}
      <div ref={headerRef} className="text-center mb-16 opacity-100">
        <span className="font-secondary text-gray-400 text-[16px] lg:text-[18px] tracking-[4px] uppercase block mb-3 font-medium">
          {isEn ? "Why ?" : "لماذا ؟"}
        </span>
        <h2 className="font-primary text-danube-gold text-[35px] lg:text-[50px] uppercase leading-tight">
          {cleanedArea}
        </h2>
      </div>

      <div className="area-grid grid grid-cols-2 md:grid-cols-3 w-full max-w-5xl px-6">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="area-item relative flex flex-col items-center p-12 transition-all duration-500 hover:bg-gray-50/50 opacity-100"
          >
            {(idx + 1) % 3 !== 0 && (
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gray-200 hidden md:block" />
            )}
            {idx < 3 && items.length > 3 && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gray-200 hidden md:block" />
            )}
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
            <p className="font-secondary text-[12px] lg:text-[14px] tracking-[2px] text-gray-500 uppercase text-center leading-relaxed max-w-[150px] font-medium">
              {isEn ? item.textEn : item.textAr}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

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
  const imageRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // 1. Cinematic Slide Transition
  const handleTransition = (nextIdx: number) => {
    // Fade out current image slightly
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.4,
      onComplete: () => {
        setCurrent(nextIdx);
        // Fade in new image with a slow scale-down (Ken Burns)
        gsap.fromTo(imageRef.current, 
          { opacity: 0, scale: 1.2 },
          { opacity: 0.8, scale: 1, duration: 1.5, ease: "power2.out" }
        );
      }
    });
  };

  const next = () => handleTransition(current === showcase.length - 1 ? 0 : current + 1);
  const prev = () => handleTransition(current === 0 ? showcase.length - 1 : current - 1);

  // 2. Modal Icon Animation
  useEffect(() => {
    if (showModal) {
      gsap.fromTo(".amenity-icon-card", 
        { opacity: 0, y: 20, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: 0.05, 
          duration: 0.5, 
          ease: "back.out(1.7)",
          delay: 0.2 
        }
      );
    }
  }, [showModal]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* FULL SCREEN SLIDER */}
      <div className="relative w-full h-full">
        <div ref={imageRef} className="absolute inset-0 w-full h-full">
          <CldImage 
            src={showcase[current].imageId} 
            alt="Amenity" 
            fill 
            className="object-cover opacity-80" 
          />
        </div>
        
        {/* Navigation Controls */}
        <button onClick={prev} className="absolute left-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-danube-gold transition-all hover:scale-110 active:scale-95">
          <ChevronLeft size={60} strokeWidth={1} />
        </button>
        <button onClick={next} className="absolute right-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-danube-gold transition-all hover:scale-110 active:scale-95">
          <ChevronRight size={60} strokeWidth={1} />
        </button>

        {/* Floating Label */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-12 py-4 text-center min-w-[300px] z-20">
          <span className="font-primary text-white text-[24px] lg:text-[32px] uppercase tracking-[4px]">
            {isEn ? showcase[current].titleEn : showcase[current].titleAr}
          </span>
        </div>
      </div>

      {/* MODAL TRIGGER */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <button 
          onClick={() => setShowModal(true)}
          className="text-white border-b border-white pb-1 font-secondary text-[12px] tracking-[2px] uppercase hover:text-danube-gold hover:border-danube-gold transition-all"
        >
          {isEn ? "View All Amenities" : "عرض جميع المرافق"}
        </button>
      </div>

      {/* THE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div ref={modalContentRef} className="relative bg-white w-full max-w-4xl p-12 max-h-[85vh] overflow-y-auto rounded-sm shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-black hover:rotate-90 transition-transform z-50">
              <X size={32} />
            </button>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              {icons.map((amt, i) => (
                <div key={i} className="amenity-icon-card flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 relative transition-transform duration-500 group-hover:scale-110">
                    <CldImage src={amt.imageId} width={64} height={64} alt="icon" className="object-contain" />
                  </div>
                  <span className="font-secondary text-[11px] text-gray-500 uppercase text-center font-medium tracking-wider">
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
  const mainContainer = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create the timeline for the scroll sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=400%", // Matches your 420vh feel (4 images + 1 banner)
          pin: true,
          scrub: 1,
        }
      });

      // 1. IMAGE WIPE SEQUENCE
      // Loop through the first 4 images
      images.slice(0, 4).forEach((_, index) => {
        tl.to(`.gallery-img-${index}`, {
          clipPath: 'inset(0 0 100% 0)',
          ease: "none",
          duration: 1
        }, index); // Each starts at its own second in the timeline
      });

      // 2. FINAL AMENITIES BANNER REVEAL
      tl.fromTo(".amenities-banner", 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          ease: "power2.out" 
        }, 
        "-=0.5" // Start slightly before the last image finish wiping
      );

    }, mainContainer);

    return () => ctx.revert();
  }, [images]);

  return (
    <div ref={mainContainer} className="relative w-full bg-black overflow-hidden">
      <div ref={triggerRef} className="relative w-full h-screen">
        
        {/* GALLERY IMAGES */}
        {images.slice(0, 4).map((img, index) => (
          <div
            key={index}
            className={`gallery-img-${index} absolute inset-0 w-full h-full`}
            style={{
              zIndex: 20 - index,
              clipPath: 'inset(0 0 0% 0)', // Start fully visible
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
        ))}

        {/* FINAL LAYER: THE AMENITIES BANNER */}
        <div className="amenities-banner absolute inset-0 w-full h-full bg-black z-[5] flex items-center justify-center text-center">
          <div>
            <h2 className="font-primary text-danube-gold text-[60px] lg:text-[120px] uppercase leading-tight tracking-tight">
              {isEn ? "Amenities" : "المرافق"}
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

// 7. MEDIA GALLERY
export function ImageGallery({ images, isEn }: { images: string[]; isEn: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Double images for seamless loop
  const loopImages = [...images, ...images];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading Reveal
      gsap.from(".gallery-header", {
        scrollTrigger: {
          trigger: ".gallery-header",
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // 2. Scroll-Linked Parallax Movement
      // As you scroll down, the marquee shifts horizontally, 
      // adding an extra layer of motion to the automatic CSS animation.
      gsap.to(marqueeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Smoothly ties the movement to the scrollbar
        },
        x: -200, // Moves the entire row left as you scroll down
        ease: "none"
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden bg-white">
      {/* 1. CENTERED HEADINGS */}
      <div className="gallery-header text-center mb-16 px-6">
        <span className="font-secondary text-gray-400 text-[16px] lg:text-[18px] tracking-[4px] uppercase block mb-3 font-medium">
          {isEn ? "Media" : "إعلام"}
        </span>
        <h2 className="font-primary text-danube-gold text-[35px] lg:text-[50px] uppercase leading-tight">
          {isEn ? "Image Gallery" : "معرض الصور"}
        </h2>
      </div>

      {/* 2. INFINITE MARQUEE */}
      <div className="relative flex cursor-grab active:cursor-grabbing">
        <div 
          ref={marqueeRef}
          className="flex animate-marquee whitespace-nowrap"
        >
          {loopImages.map((img, i) => (
            <div 
              key={i} 
              className="relative w-[350px] h-[220px] lg:w-[450px] lg:h-[280px] mx-3 shrink-0 group overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500"
            >
              <CldImage 
                src={img} 
                alt={`Gallery ${i}`} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
              />
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. SCROLL LOGIC & KEYFRAMES */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 50s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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