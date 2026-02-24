// src/app/[locale]/about/our-jurney/JourneyClient.tsx 

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import { Building2, Home, Plus } from "lucide-react";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MilestoneModal, { IJourney } from "@/components/admin/MilestoneModal";
import JourneyActions from "@/components/admin/JourneyActions";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";
import { useAdmin } from "@/context/AdminContext";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyClient({ locale }: { locale: string }) {
  const { isAdmin } = useAdmin();
  const isEn = locale === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  const [milestones, setMilestones] = useState<IJourney[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IJourney | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. FETCH LOGIC WITH CHRONOLOGICAL SORTING
  const fetchJourney = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/journey');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // SORTING: Oldest Year -> Newest Year. 
        // Secondary sort uses 'order' for multiple projects in same year.
        const sortedData = data.sort((a: IJourney, b: IJourney) => {
          const yearA = parseInt(a.year);
          const yearB = parseInt(b.year);
          
          if (yearA !== yearB) {
            return yearA - yearB;
          }
          return (a.order || 0) - (b.order || 0);
        });
        
        setMilestones(sortedData);
      }
    } catch (error) {
      console.error("Database sync failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJourney();
  }, [fetchJourney]);

  // 2. CRUD HANDLERS
  const handleSave = async (formData: IJourney) => {
    try {
      const res = await fetch('/api/admin/journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        await fetchJourney();
      }
    } catch (error) {
      console.error("Error saving milestone:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmMsg = isEn 
      ? "Are you sure you want to delete this milestone?" 
      : "هل أنت متأكد أنك تريد حذف هذا المعلم؟";
      
    if (window.confirm(confirmMsg)) {
      try {
        const res = await fetch(`/api/admin/journey?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          await fetchJourney();
        }
      } catch (error) {
        console.error("Error deleting milestone:", error);
      }
    }
  };

  // 3. GSAP ANIMATIONS
  useEffect(() => {
    if (milestones.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 }, 
        { 
          scaleY: 1, 
          ease: "none", 
          scrollTrigger: {
            trigger: ".timeline-content",
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      const rows = gsap.utils.toArray<HTMLElement>(".timeline-row");
      rows.forEach((row) => {
        const card = row.querySelector(".journey-card");
        const info = row.querySelector(".journey-info");
        const icon = row.querySelector(".journey-icon");
        const isEven = row.classList.contains("row-even");
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          }
        });

        tl.fromTo(card, 
          { x: isEven ? -200 : 200, opacity: 0, rotate: isEven ? 10 : -10 },
          { x: 0, opacity: 1, rotate: isEven ? 2 : -2, duration: 1 }
        )
        .fromTo(info, 
          { x: isEven ? 100 : -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          "<"
        )
        .fromTo(icon, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.5"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [milestones]);

  return (
    <main 
      ref={containerRef} 
      className={`min-h-screen bg-white pt-48 overflow-x-hidden transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
    >
      <section className="max-w-7xl mx-auto px-6 mb-32">
        
        <div className="mb-40 flex flex-col items-center text-center">
          <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Our Journey" : "رحلتنا"}
          </h1>
          <div className="w-24 h-1.5 bg-danube-gold mt-4"></div>
          
          <ClientOnlyAdmin>
            {isAdmin && (
              <button 
                onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                className="mt-12 bg-black text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-danube-gold hover:text-black transition-all"
              >
                <Plus size={20} /> ADD NEW MILESTONE
              </button>
            )}
          </ClientOnlyAdmin>
        </div>

        <ClientOnlyAdmin>
          <div className="relative timeline-content">
            <div 
              ref={lineRef}
              className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-danube-gold origin-top z-0"
            ></div>

            <div className="space-y-48">
              {milestones.map((item, index) => {
                const isEven = index % 2 === 0;
                const title = isEn ? item.title.en : item.title.ar;
                const desc = isEn ? item.description.en : item.description.ar;

                return (
                  <div 
                    key={item._id} 
                    className={`timeline-row relative flex items-center justify-between w-full ${isEven ? 'flex-row-reverse row-even' : 'flex-row'}`}
                  >
                    <div className="journey-card w-[42%] z-10 relative">
                      {isAdmin && (
                        <JourneyActions 
                          onEdit={() => { setEditingItem(item); setIsModalOpen(true); }}
                          onDelete={() => handleDelete(item._id!)}
                        />
                      )}

                      {item.image ? (
                        <div className={`relative bg-white p-4 pb-14 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm transform transition-all duration-500 hover:scale-105 hover:z-20 ${isEven ? 'rotate-2' : '-rotate-2'}`}>
                          <div className={`absolute top-10 w-6 h-6 bg-white rotate-45 transform shadow-[-5px_5px_10px_rgba(0,0,0,0.02)] ${isEven ? '-left-3' : '-right-3'}`} />
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                            <CldImage src={item.image} alt={title} fill className="object-cover" />
                          </div>
                          <div className="mt-8 text-center px-2">
                            <h3 className="font-primary text-black text-[20px] md:text-[24px] uppercase leading-tight">
                              {title}
                            </h3>
                          </div>
                        </div>
                      ) : (
                        <div className={`relative bg-danube-gold/5 border-2 border-dashed border-danube-gold/30 p-10 rounded-2xl text-center flex flex-col items-center ${isEven ? 'rotate-1' : '-rotate-1'}`}>
                             <Home className="mb-4 text-danube-gold w-10 h-10" />
                             <h3 className="font-primary text-black text-[28px] uppercase">{title}</h3>
                             <p className="font-secondary text-gray-600 mt-2 font-medium">{desc}</p>
                        </div>
                      )}
                    </div>

                    <div className="journey-icon absolute left-1/2 transform -translate-x-1/2 z-20">
                      <div className="w-14 h-14 bg-danube-gold rounded-full flex items-center justify-center border-[6px] border-white shadow-xl">
                        <Building2 className="text-white w-6 h-6" />
                      </div>
                    </div>

                    <div className={`journey-info w-[42%] flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
                      <span className="font-primary text-danube-gold text-[38px] md:text-[48px] font-bold leading-none mb-4">
                        {item.year}
                      </span>
                      {item.image && (
                        <p className="font-secondary text-gray-700 text-[16px] md:text-[18px] font-medium max-w-md leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ClientOnlyAdmin>
      </section>

      <MilestoneModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        initialData={editingItem}
      />
      
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}