// src/app/[locale]/about/leadership-team/managing-director/ManagingDirectorClient.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import AdminSectionWrapper from "@/components/admin/AdminSectionWrapper";
import AdminImageWrapper from "@/components/admin/AdminImageWrapper";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";

interface MDContent {
  name: string;
  desig: string;
  image: string;
  p1: string;
  p2: string;
}

const getBaseContent = (isEn: boolean): MDContent => ({
  name: "Mr. Adel Sajan",
  desig: "Group Managing Director",
  image: "adel_sajan_vnpqd5",
  p1: isEn 
    ? "A young, visionary and charismatic leader who has been one of the key factors in Danube’s strategic growth since 2009 with the founding of Danube Buildmart, now renamed Danube Home." 
    : "قائد شاب، طموح ومؤثر، كان أحد العوامل الرئيسية في النمو الاستراتيجي لشركة دانوب منذ عام 2009 مع تأسيس دانوب بيلدمارت، التي تغير اسمها الآن إلى دانوب هوم.",
  p2: isEn 
    ? "Under his leadership, Danube operates in major cities worldwide." 
    : "تحت قيادته، تعمل دانوب في مدن كبرى حول العالم.",
});

export default function ManagingDirectorClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const [content, setContent] = useState<MDContent>(() => getBaseContent(isEn));
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?locale=${locale}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const dbData: Record<string, string> = await res.json();
      
      if (dbData && Object.keys(dbData).length > 0) {
        setContent(prev => ({
          ...prev,
          name: dbData.md_name || prev.name,
          desig: dbData.md_desig || prev.desig,
          image: dbData.md_image || prev.image,
          p1: dbData.md_p1 || prev.p1,
          p2: dbData.md_p2 || prev.p2,
        }));
      }
    } catch (err) {
      console.error("MD Sync Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleUpdate = async (field: keyof MDContent, newValue: string) => {
    // Sanitization: Ensure only Public ID is saved
    const sanitizedValue = newValue.includes('/') 
      ? newValue.split('/').pop()?.split('.')[0] || newValue 
      : newValue;

    const contentKey = `md_${field}`;
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
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
            
            {/* IMAGE SECTION - PERFECTED NESTING & FLEX STRETCH */}
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

            <div className="p-10 md:p-16 lg:p-20 md:col-span-7 flex flex-col">
              <div className="flex-grow flex flex-col justify-center space-y-6">
                {(['p1', 'p2'] as const).map((pKey) => (
                  <AdminSectionWrapper
                    key={pKey}
                    contentKey={`md_${pKey}`}
                    currentValue={content[pKey]}
                    onSave={async (val) => { await handleUpdate(pKey, val); }}
                  >
                    <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                      {content[pKey]}
                    </p>
                  </AdminSectionWrapper>
                ))}
              </div>

              <div className="mt-12 border-t border-gray-100 pt-8">
                <AdminSectionWrapper 
                  contentKey="md_name" 
                  currentValue={content.name} 
                  onSave={async (val) => { await handleUpdate('name', val); }}
                >
                  <h2 className="font-primary text-black text-[32px] uppercase">
                    {content.name}
                  </h2>
                </AdminSectionWrapper>

                <AdminSectionWrapper 
                  contentKey="md_desig" 
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