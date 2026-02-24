// src/app/[locale]/about/leadership-team/chairman/ChairmanClient.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import AdminSectionWrapper from "@/components/admin/AdminSectionWrapper";
import AdminImageWrapper from "@/components/admin/AdminImageWrapper";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";

interface ChairmanContent {
  name: string;
  desig: string;
  image: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

const getBaseContent = (isEn: boolean): ChairmanContent => ({
  name: "Mr. Rizwan Sajan",
  desig: "Founder & Chairman - Danube",
  image: "chairman_xazql9",
  p1: isEn 
    ? "Rizwan Sajan, the Founder and Chairman of Danube Properties and the Danube Group, stands as a visionary force in the business world with over three decades of proven success. Celebrated for his entrepreneurial spirit and forward-looking leadership, Rizwan Sajan has played a crucial role in shaping the real estate landscape of Dubai and the Middle East."
    : "يقف رضوان ساجان، مؤسس ورئيس مجلس إدارة دانوب العقارية ومجموعة دانوب، كقوة رؤيوية في عالم الأعمال مع أكثر من ثلاثة عقود من النجاح المثبت. اشتهر بروحه الريادية وقيادته المتطلعة، وقد لعب رضوان ساجان دوراً حاسماً في تشكيل المشهد العقاري في دبي والشرق الأوسط.",
  p2: isEn 
    ? "With a relentless drive to innovate and challenge the status quo, Rizwan’s leadership style is characterized by a hands-on approach, a deep commitment to excellence, and an unwavering belief in the power of perseverance. His ability to inspire and lead by example has fostered a culture of accountability, creativity and continued growth throughout the Danube Group."
    : "مع دافع لا يتوقف للابتكار وتحدي الوضع الراهن، يتميز أسلوب قيادة رضوان بنهج عملي، والتزام عميق بالتميز، وإيمان راسخ بقوة المثابرة. إن قدرته على الإلهام والقيادة بالقدوة قد عززت ثقافة المسؤولية والإبداع والنمو المستمر في جميع أنحاء مجموعة دانوب.",
  p3: isEn 
    ? "Rizwan Sajan founded Danube Properties in 2014 with a vision to provide affordable luxury homes in Dubai. Under Rizwan Sajan’s leadership as Chairman, the company has grown into one of Dubai’s leading property developers."
    : "أسس رضوان ساجان شركة دانوب العقارية في عام 2014 برؤية لتوفير منازل فاخرة بأسعار معقولة في دبي. وتحت قيادته كرئيس لمجلس الإدارة، نمت الشركة لتصبح واحدة من أبرز المطورين العقاريين في دبي.",
  p4: isEn 
    ? "Under Rizwan Sajan’s leadership, Danube Properties has grown into one of the most trusted real estate companies in Dubai and the UAE, delivering quality residential projects that embody the values of trust, integrity and progress. Rizwan Sajan’s vision has made Danube Properties synonymous with affordable luxury and customer-centric development."
    : "تحت قيادة رضوان ساجان، أصبحت دانوب العقارية واحدة من أكثر الشركات العقارية موثوقية في دبي والإمارات العربية المتحدة، حيث تقدم مشاريع سكنية عالية الجودة تجسد قيم الثقة والنزاهة والتقدم. جعلت رؤيته من دانوب العقارية مرادفاً للفخامة الميسورة والتطوير المرتكز على العملاء."
});

export default function ChairmanClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const [content, setContent] = useState<ChairmanContent>(() => getBaseContent(isEn));
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?locale=${locale}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const dbData: Record<string, string> = await res.json();
      
      if (dbData && Object.keys(dbData).length > 0) {
        setContent(prev => ({
          ...prev,
          name: dbData.chairman_name || prev.name,
          desig: dbData.chairman_desig || prev.desig,
          image: dbData.chairman_image || prev.image,
          p1: dbData.chairman_p1 || prev.p1,
          p2: dbData.chairman_p2 || prev.p2,
          p3: dbData.chairman_p3 || prev.p3,
          p4: dbData.chairman_p4 || prev.p4,
        }));
      }
    } catch (err) {
      console.error("Chairman Sync Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleUpdate = async (field: keyof ChairmanContent, newValue: string) => {
    const contentKey = `chairman_${field}`;
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: contentKey, locale, value: newValue })
      });
      if (res.ok) {
        setContent(prev => ({ ...prev, [field]: newValue }));
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
            
            {/* IMAGE SECTION - FIXED LOGIC APPLIED HERE */}
            <div className="md:col-span-5 flex">
              <AdminImageWrapper onSave={async (id) => { await handleUpdate('image', id); }}>
                {/* We nest the relative height div INSIDE the wrapper, just like the Management page */}
                <div className="w-full h-full min-h-[600px]">
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
                    contentKey={`chairman_${pKey}`}
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
                  contentKey="chairman_name"
                  currentValue={content.name}
                  onSave={async (val) => { await handleUpdate('name', val); }}
                >
                  <h2 className="font-primary text-black text-[32px] uppercase">
                    {content.name}
                  </h2>
                </AdminSectionWrapper>

                <AdminSectionWrapper
                  contentKey="chairman_desig"
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