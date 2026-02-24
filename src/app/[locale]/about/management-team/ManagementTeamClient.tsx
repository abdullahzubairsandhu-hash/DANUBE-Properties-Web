// src/app/[locale]/about/management-team/ManagementTeamClient.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import AdminSectionWrapper from "@/components/admin/AdminSectionWrapper";
import AdminImageWrapper from "@/components/admin/AdminImageWrapper";

interface Manager {
  id: string;
  name: string;
  desig: string;
  image: string;
  p1: string;
  p2: string;
}

const getBaseManagers = (isEn: boolean): Manager[] => [
  {
    id: "manager_1",
    name: "Madhusudhan Rao",
    desig: "CEO - Danube Group",
    image: "madhu-1_sfbu2d",
    p1: isEn 
      ? "With over 35 years of experience across industries, and more than two decades at Danube Group, Madhusudhan Rao stands as a key pillar of the company’s growth. As CEO of Danube Group, he has played a vital role in shaping the group’s vision, streamlining operations, and driving strategic expansion across divisions."
      : "مع أكثر من 35 عاماً من الخبرة في مختلف القطاعات، وأكثر من عقدين في مجموعة دانوب، يعد مادوسودهان راو ركيزة أساسية لنمو الشركة. وبصفته الرئيس التنفيذي لمجموعة دانوب، لعب دوراً حيوياً في تشكيل رؤية المجموعة وتبسيط العمليات وقيادة التوسع الاستراتيجي عبر الأقسام.",
    p2: isEn
      ? "His leadership blends operational excellence with a deep commitment to people and performance, helping Danube scale new heights while staying true to its core values."
      : "تمزج قيادته بين التميز التشغيلي والالتزام العميق بالأفراد والأداء، مما يساعد دانوب على الوصول إلى آفاق جديدة مع البقاء وفية لقيمها الأساسية."
  },
  {
    id: "manager_2",
    name: "Ghayyour Ahmad",
    desig: "GM - Projects & Development",
    image: "ghayyour-1_mxvafb",
    p1: isEn
      ? "With over 25 years of experience in business strategies, project management, and construction, Ghayyour Ahmad is a driving force behind Danube Properties' success. As the General Manager for Projects and Development, he plays a pivotal role in ensuring timely project deliveries, exceeding expectations with high-quality, luxurious finishes."
      : "مع أكثر من 25 عاماً من الخبرة في استراتيجيات الأعمال وإدارة المشاريع والإنشاءات، يعد غيور أحمد قوة دافعة وراء نجاح دانوب العقارية. وبصفته المدير العام للمشاريع والتطوير، يلعب دوراً محورياً في ضمان تسليم المشاريع في الوقت المحدد، متجاوزاً التوقعات بتشطيبات فاخرة وعالية الجودة.",
    p2: isEn
      ? "His commitment to excellence extends beyond construction, and he fosters a focus on exceptional customer service, ensuring a seamless and positive experience for every homeowner."
      : "يمتد التزامه بالتميز إلى ما هو أبعد من البناء، حيث يعزز التركيز على خدمة العملاء الاستثنائية، مما يضمن تجربة سلسة وإإيجابية لكل مالك منزل."
  }
];

export default function ManagementTeamClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const [managers, setManagers] = useState<Manager[]>(() => getBaseManagers(isEn));
  const [isLoading, setIsLoading] = useState(true);

  // FETCH LOGIC
  const loadContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?locale=${locale}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const dbData: Record<string, string> = await res.json();
      
      if (dbData && Object.keys(dbData).length > 0) {
        const base = getBaseManagers(isEn);
        const merged = base.map((manager) => ({
          ...manager,
          name: dbData[`${manager.id}_name`] || manager.name,
          desig: dbData[`${manager.id}_desig`] || manager.desig,
          image: dbData[`${manager.id}_image`] || manager.image,
          p1: dbData[`${manager.id}_p1`] || manager.p1,
          p2: dbData[`${manager.id}_p2`] || manager.p2,
        }));
        setManagers(merged);
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
  const handleUpdate = async (index: number, field: keyof Manager, newValue: string) => {
    const managerId = managers[index].id;
    const contentKey = `${managerId}_${field}`;

    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: contentKey,
          locale: locale,
          value: newValue
        })
      });

      if (!response.ok) throw new Error("Database update failed");

      // Optimistic UI update
      setManagers(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: newValue };
        return updated;
      });
      
      return true;
    } catch (err) {
      console.error("Save failed:", err);
      return false;
    }
  };

  return (
    <main className={`min-h-screen bg-white pt-48 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="mb-24 flex flex-col items-center text-center">
          <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Management Team" : "فريق الإدارة"}
          </h1>
          <div className="w-24 h-1.5 bg-danube-gold mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {managers.map((manager, index) => (
            <div key={manager.id} className="flex flex-col items-center text-center">
              
              <AdminImageWrapper 
                onSave={async (newId: string) => {
                   await handleUpdate(index, 'image', newId);
                }}
              >
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                  <CldImage
                    src={manager.image}
                    alt={manager.name}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </AdminImageWrapper>

              <div className="mb-8 w-full flex flex-col items-center">
                <AdminSectionWrapper
                  contentKey={`${manager.id}_name`}
                  currentValue={manager.name}
                  onSave={async (val: string) => { await handleUpdate(index, 'name', val); }}
                >
                  <h2 className="font-primary text-black text-[28px] md:text-[36px] uppercase">
                    {manager.name}
                  </h2>
                </AdminSectionWrapper>

                <AdminSectionWrapper
                  contentKey={`${manager.id}_desig`}
                  currentValue={manager.desig}
                  onSave={async (val: string) => { await handleUpdate(index, 'desig', val); }}
                >
                  <p className="font-secondary text-danube-gold text-[16px] md:text-[18px] font-bold uppercase tracking-[0.2em] mt-2">
                    {manager.desig}
                  </p>
                </AdminSectionWrapper>
              </div>

              <div className="space-y-6 max-w-xl">
                <AdminSectionWrapper
                  contentKey={`${manager.id}_p1`}
                  currentValue={manager.p1}
                  onSave={async (val: string) => { await handleUpdate(index, 'p1', val); }}
                >
                  <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                    {manager.p1}
                  </p>
                </AdminSectionWrapper>

                <AdminSectionWrapper
                  contentKey={`${manager.id}_p2`}
                  currentValue={manager.p2}
                  onSave={async (val: string) => { await handleUpdate(index, 'p2', val); }}
                >
                  <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                    {manager.p2}
                  </p>
                </AdminSectionWrapper>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}