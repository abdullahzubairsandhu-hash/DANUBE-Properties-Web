// src/app/[locale]/about/leadership-team/vice-chairman/ViceChairmanClient.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import AdminSectionWrapper from "@/components/admin/AdminSectionWrapper";
import AdminImageWrapper from "@/components/admin/AdminImageWrapper";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";

interface ViceChairmanContent {
  name: string;
  desig: string;
  image: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

const getBaseContent = (isEn: boolean): ViceChairmanContent => ({
  name: "Mr. Anis Sajan",
  desig: "Vice Chairman - Danube",
  image: "anis_sajan_zhcebv",
  p1: isEn 
    ? "Mr. Anis Sajan, Vice Chairman of the Danube Group, embodies visionary leadership in the real estate sector. His journey from sales manager at Eureka Forbes to design Danube Properties as a symbol of excellence reflects his unwavering commitment to innovation and quality." 
    : "يجسد السيد أنيس ساجان، نائب رئيس مجلس إدارة مجموعة دانوب، القيادة الرؤيوية في القطاع العقاري. إن رحلته من مدير مبيعات في يوريكا فوربس لتصميم دانوب العقارية كرمز للتميز تعكس التزامه الراسخ بالابتكار والجودة.",
  p2: isEn 
    ? "A dedicated family man and cricket lover, Mr. Sajan brings a dynamic perspective to his role, balancing business management with personal passions. Under his leadership, Danube Properties has become synonymous with innovative housing solutions, setting new standards for luxury and affordability." 
    : "بصفته رجلاً مخلصاً لعائلته ومحباً للكريكت، يضفي السيد ساجان منظوراً ديناميكياً على دوره، حيث يوازن بين إدارة الأعمال وشغفه الشخصي. وتحت قيادته، أصبحت دانوب العقارية مرادفاً للحلول السكنية المبتكرة، واضعة معايير جديدة للفخامة والقدرة على تحمل التكاليف.",
  p3: isEn 
    ? "Beyond Danube Properties, Mr. Sajan leads brands like Milano and Casa Milano that are revolutionizing the sanitary ware industry with a mix of functionality and elegance." 
    : "إلى جانب دانوب العقارية، يقود السيد ساجان علامات تجارية مثل ميلانو وكازا ميلانو التي تُحدث ثورة في صناعة الأدوات الصحية بمزيج من العملانية والأناقة.",
  p4: isEn 
    ? "With a keen eye for opportunity and a commitment to excellence, Mr Anis Sajan continues to shape the future of Danube Group, leaving a lasting impression on the industry and inspiring others to follow his lead." 
    : "بفضل نظرته الثاقبة للفرص والتزامه بالتميز، يواصل السيد أنيس ساجان تشكيل مستقبل مجموعة دانوب، تاركاً بصمة دائمة في الصناعة وملهماً الآخرين ليحذوا حذوه.",
});

export default function ViceChairmanClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const [content, setContent] = useState<ViceChairmanContent>(() => getBaseContent(isEn));
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?locale=${locale}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const dbData: Record<string, string> = await res.json();
      
      if (dbData && Object.keys(dbData).length > 0) {
        setContent(prev => ({
          ...prev,
          name: dbData.vice_name || prev.name,
          desig: dbData.vice_desig || prev.desig,
          image: dbData.vice_image || prev.image,
          p1: dbData.vice_p1 || prev.p1,
          p2: dbData.vice_p2 || prev.p2,
          p3: dbData.vice_p3 || prev.p3,
          p4: dbData.vice_p4 || prev.p4,
        }));
      }
    } catch (err) {
      console.error("Vice Chairman Sync Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleUpdate = async (field: keyof ViceChairmanContent, newValue: string) => {
    // Sanitization: Ensure we only save the Public ID
    const sanitizedValue = newValue.includes('/') 
      ? newValue.split('/').pop()?.split('.')[0] || newValue 
      : newValue;

    const contentKey = `vice_${field}`;
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: contentKey, locale, value: sanitizedValue })
      });
      if (res.ok) {
        setContent(prev => ({ ...prev, [field]: sanitizedValue }));
        return true;
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
    return false;
  };

  return (
    <ClientOnlyAdmin>
      <main className={`min-h-screen bg-gray-50 pt-48 pb-20 px-6 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* IMAGE SECTION - PERFECTED NESTING */}
            <div className="md:col-span-5 flex">
              <AdminImageWrapper onSave={async (id) => { await handleUpdate('image', id); }}>
                <div className="relative w-full h-full min-h-[600px]">
                  <CldImage 
                    src={content.image} 
                    alt={content.name} 
                    fill 
                    className="object-cover object-top" 
                    priority 
                  />
                </div>
              </AdminImageWrapper>
            </div>

            <div className="p-10 md:p-16 lg:p-20 md:col-span-7 flex flex-col justify-center">
              <div className="space-y-6">
                {(['p1', 'p2', 'p3', 'p4'] as const).map((pKey) => (
                  <AdminSectionWrapper
                    key={pKey}
                    contentKey={`vice_${pKey}`}
                    currentValue={content[pKey]}
                    onSave={async (val) => { await handleUpdate(pKey, val); }}
                  >
                    {/* font-medium applied as per guidelines */}
                    <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                      {content[pKey]}
                    </p>
                  </AdminSectionWrapper>
                ))}
              </div>

              <div className="mt-12 border-t border-gray-100 pt-8">
                <AdminSectionWrapper 
                  contentKey="vice_name" 
                  currentValue={content.name} 
                  onSave={async (val) => { await handleUpdate('name', val); }}
                >
                  <h2 className="font-primary text-black text-[32px] uppercase">
                    {content.name}
                  </h2>
                </AdminSectionWrapper>

                <AdminSectionWrapper 
                  contentKey="vice_desig" 
                  currentValue={content.desig} 
                  onSave={async (val) => { await handleUpdate('desig', val); }}
                >
                  <p className="font-secondary text-danube-gold text-[18px] font-bold uppercase tracking-widest mt-1">
                    {content.desig}
                  </p>
                </AdminSectionWrapper>
              </div>
            </div>
          </div>
        </div>
        <ContactSection locale={locale} />
        <Footer locale={locale} />
      </main>
    </ClientOnlyAdmin>
  );
}