// src/app/[locale]/about/company-profile/CompanyProfileClient.tsx

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import AdminSectionWrapper from "@/components/admin/AdminSectionWrapper";
import AdminImageWrapper from "@/components/admin/AdminImageWrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  "award-15_ly9ahb", "award-14_gtyp93", "award-13_giqyl7", "award-12_sngdi6",
  "award-11_ynp1rq", "award-10_pi9pks", "award-9_zwm4kt", "award-8_b00hjf",
  "award-7_pdi9ys", "award-6_k0qklr", "award-5_zj1hup", "award-4_mvnmbn",
  "award-3_xphvci", "award-2_lug54m", "award-1_wykl6h"
];

interface ProfileContent {
  skyline: string;
  badge: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  vision: string;
  mission: string;
  groupImg: string;
}

const getBaseContent = (isEn: boolean): ProfileContent => ({
  skyline: "skyline_company-profile_tgvoja",
  badge: "1993_chysev",
  p1: isEn ? "Danube Group has grown from a single store started in Deira, Dubai 30 years ago..." : "نمت مجموعة دانوب من متجر واحد بدأ في ديرة، دبي منذ 30 عاماً...",
  p2: isEn ? "The Group owns many award winning business verticals..." : "تمتلك المجموعة العديد من القطاعات التجارية الحائزة على جوائز مرموقة...",
  p3: isEn ? "Danube Properties the property development arm..." : "تُصنف 'دانوب العقارية'، وهي ذراع التطوير العقاري للمجموعة...",
  p4: isEn ? "Backed by its consistent growth and immense consumer confidence..." : "بفضل نموها المستمر وثقة المستهلك الهائلة...",
  vision: isEn ? "To be a Leading Property Developer in the region..." : "أن نكون مطوراً عقارياً رائداً في المنطقة...",
  mission: isEn ? "Conduct value engineering for each project..." : "إجراء الهندسة القيمية لكل مشروع...",
  groupImg: "danube-1_h7kbfv"
});

export function CompanyProfileClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const mainRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState<ProfileContent>(() => getBaseContent(isEn));
  const [isLoading, setIsLoading] = useState(true);

  // FETCH LOGIC
  const loadContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?locale=${locale}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const dbData: Record<string, string> = await res.json();
      
      if (dbData && Object.keys(dbData).length > 0) {
        const base = getBaseContent(isEn);
        setContent({
          skyline: dbData.profile_skyline || base.skyline,
          badge: dbData.profile_badge || base.badge,
          p1: dbData.profile_p1 || base.p1,
          p2: dbData.profile_p2 || base.p2,
          p3: dbData.profile_p3 || base.p3,
          p4: dbData.profile_p4 || base.p4,
          vision: dbData.profile_vision || base.vision,
          mission: dbData.profile_mission || base.mission,
          groupImg: dbData.profile_groupImg || base.groupImg,
        });
      }
    } catch (err) {
      console.error("Critical: Database sync failed", err);
    } finally {
      setIsLoading(false);
    }
  }, [locale, isEn]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // UPDATE LOGIC
  const handleUpdate = async (field: keyof ProfileContent, newValue: string) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: `profile_${field}`,
          locale: locale,
          value: newValue
        })
      });

      if (!response.ok) throw new Error("Database update failed");

      setContent(prev => ({ ...prev, [field]: newValue }));
      return true;
    } catch (err) {
      console.error("Save failed:", err);
      return false;
    }
  };

  // GSAP Animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-skyline", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-skyline",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(badgeRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut"
      });

      gsap.from(".reveal-text", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 85%"
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isLoading, content]);

  return (
    <main ref={mainRef} className={`bg-white pt-20 overflow-hidden transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* 1. HERO IMAGE */}
      <section className="w-full flex justify-center -mt-12">
        <AdminImageWrapper onSave={async (id) => { await handleUpdate('skyline', id); }}>
          <div className="hero-skyline relative w-full aspect-[683/200]">
            <CldImage src={content.skyline} alt="Skyline" fill priority className="object-contain" />
          </div>
        </AdminImageWrapper>
      </section>

      {/* 2. TITLE & BADGE */}
      <section className="relative flex justify-center items-center py-16 px-4">
        <h1 className="font-primary text-danube-gold text-[40px] md:text-[60px] lg:text-[75px] uppercase text-center">
          {isEn ? "Company Profile" : "ملف الشركة"}
        </h1>
        <div ref={badgeRef} className="absolute right-8 md:right-20 w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] z-10">
          <AdminImageWrapper onSave={async (id) => { await handleUpdate('badge', id); }}>
            <div className="relative w-full h-full">
              <CldImage src={content.badge} alt="Since 1993" fill className="object-contain" />
            </div>
          </AdminImageWrapper>
        </div>
      </section>

      {/* 3. PARAGRAPHS */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-12 mb-20">
        {(['p1', 'p2', 'p3', 'p4'] as const).map((key) => (
          <AdminSectionWrapper 
            key={key} 
            contentKey={`profile_${key}`} 
            currentValue={content[key]} 
            onSave={async (val) => { await handleUpdate(key, val); }}
          >
            <p className="reveal-text font-secondary text-gray-800 text-[18px] leading-[32px] font-medium">
              {content[key]}
            </p>
          </AdminSectionWrapper>
        ))}
      </section>

      {/* 4. VISION & MISSION */}
      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 mt-28 mb-24">
        {(['vision', 'mission'] as const).map((key) => (
          <div key={key} className="info-card space-y-4 text-center p-8 bg-gray-50/50 rounded-xl">
            <h2 className="font-primary text-danube-gold text-[32px] uppercase">
              {isEn ? key : (key === 'vision' ? 'الرؤية' : 'المهمة')}
            </h2>
            <AdminSectionWrapper 
              contentKey={`profile_${key}`} 
              currentValue={content[key]} 
              onSave={async (val) => { await handleUpdate(key, val); }}
            >
              <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                {content[key]}
              </p>
            </AdminSectionWrapper>
          </div>
        ))}
      </section>

      {/* 5. AWARDS (Static) */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <h2 className="font-primary text-danube-gold text-[32px] uppercase text-center mb-12">
          {isEn ? "Awards & Recognition" : "الجوائز والتقدير"}
        </h2>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex animate-infinite-scroll">
            {[...AWARDS, ...AWARDS].map((id, idx) => (
              <div key={idx} className="flex-none w-[160px] md:w-[180px] h-36 mx-6 relative">
                <CldImage src={id} alt="Award" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR GROUP */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center"> 
        <h2 className="font-primary text-danube-gold text-[32px] uppercase mb-6">
          {isEn ? "Our Group" : "مجموعتنا"}
        </h2>
        <AdminImageWrapper onSave={async (id) => { await handleUpdate('groupImg', id); }}>
          <div className="reveal-text relative w-full aspect-[16/7]">
            <CldImage src={content.groupImg} alt="Our Group" fill className="object-contain" />
          </div>
        </AdminImageWrapper>
      </section>

      <ContactSection locale={locale} />
      <Footer locale={locale} />

      <style jsx>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-infinite-scroll { display: flex; width: max-content; animation: scroll 45s linear infinite; }
      `}</style>
    </main>
  );
}