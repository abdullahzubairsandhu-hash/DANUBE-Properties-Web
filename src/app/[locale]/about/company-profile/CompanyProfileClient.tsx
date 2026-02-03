"use client";

//import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

const AWARDS = [
  "award-15_ly9ahb", "award-14_gtyp93", "award-13_giqyl7", "award-12_sngdi6",
  "award-11_ynp1rq", "award-10_pi9pks", "award-9_zwm4kt", "award-8_b00hjf",
  "award-7_pdi9ys", "award-6_k0qklr", "award-5_zj1hup", "award-4_mvnmbn",
  "award-3_xphvci", "award-2_lug54m", "award-1_wykl6h"
];

export function CompanyProfileClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  

  return (
    <main className="bg-white pt-20 overflow-hidden">
      {/* 1. TOP HERO IMAGE */}
      <section className="w-full flex justify-center -mt-12">
        <div className="relative w-full aspect-[683/200]">
          <CldImage 
            src="skyline_company-profile_tgvoja" 
            alt="Skyline" fill priority
            className="object-contain"
          />
        </div>
      </section>

      {/* 2. TITLE & BADGE */}
      <section className="relative flex justify-center items-center py-16 px-4">
        <h1 className="font-primary text-danube-gold text-[40px] md:text-[60px] lg:text-[75px] uppercase text-center">
          {isEn ? "Company Profile" : "ملف الشركة"}
        </h1>
        
        {/* Adjusted: w/h to 220px and moved in from the edge with right-8/right-20 */}
        <div className="absolute right-8 md:right-20 w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] shrink-0">
          <CldImage 
            src="1993_chysev" 
            alt="Since 1993" 
            fill 
            className="object-contain" 
          />
        </div>
      </section>

        {/* 3. PARAGRAPHS */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-12 mb-20">
      <p className="font-secondary text-gray-800 text-[18px] leading-[32px] font-medium">
        {isEn ? "Danube Group has grown from a single store started in Deira, Dubai 30 years ago to one of the most trusted and household brand in the Middle-East. The multi-million dollar Group has been consistently increasing its global footprint and annual revenue supported by ever-growing family of over 3,500 staff. Danube Group is head-quartered in Dubai and operates in 9 countries across Middle-East & Asia." 
    : "نمت مجموعة دانوب من متجر واحد بدأ في ديرة، دبي منذ 30 عاماً، لتصبح واحدة من أكثر العلامات التجارية الموثوقة والشهيرة في الشرق الأوسط. تواصل المجموعة التي تبلغ قيمتها ملايين الدولارات توسيع بصمتها العالمية وإيراداتها السنوية، مدعومة بعائلة متنامية تضم أكثر من 3500 موظف. يقع المقر الرئيسي لمجموعة دانوب في دبي، وتعمل في 9 دول عبر الشرق الأوسط وآسيا."
    }
    </p>
    <p className="font-secondary text-gray-800 text-[18px] leading-[32px] font-medium">
        {isEn ? "The Group owns many award winning business verticals. Danube Building Material is the No.1 Building Materials company of the region offering more than 25,000 products under one roof. Danube Home is the fastest growing furniture retail brand currently present across UAE, KSA, Oman, Bahrain, Qatar, Kuwait, India and Africa. Alucopanel is the only factory manufacturing A2 grade facade cladding panels in the UAE." 
    : "تمتلك المجموعة العديد من القطاعات التجارية الحائزة على جوائز مرموقة. تعتبر 'دانوب لمواد البناء' الشركة رقم 1 في المنطقة، حيث توفر أكثر من 25,000 منتج تحت سقف واحد. كما تُعد 'دانوب هوم' العلامة التجارية الأسرع نمواً في قطاع التجزئة للمفروشات، وتتواجد حالياً في الإمارات والسعودية وعمان والبحرين وقطر والكويت والهند وأفريقيا. أما 'ألوكوبانيل' فهو المصنع الوحيد في الإمارات الذي ينتج ألواح تكسية الواجهات من الفئة (A2)."
    }
    </p>
    <p className="font-secondary text-gray-800 text-[18px] leading-[32px] font-medium">
        {isEn ? "Danube Properties the property development arm of the business is rated amongst top 5 developers in the UAE. Company’s major achievement include on time delivery of exceptional quality assets with record sales success." 
    : "تُصنف 'دانوب العقارية'، وهي ذراع التطوير العقاري للمجموعة، ضمن قائمة أفضل 5 مطورين في دولة الإمارات العربية المتحدة. وتشمل الإنجازات الرئيسية للشركة تسليم أصول ذات جودة استثنائية في المواعيد المحددة، مع تحقيق نجاحات قياسية في المبيعات."
    }
    </p>
    <p className="font-secondary text-gray-800 text-[18px] leading-[32px] font-medium">
        {isEn ? "Backed by its consistent growth and immense consumer confidence Danube Group has received over 50 awards in different categories. The Groups philosophy is to deliver exceptional quality and build long lasting relationship." 
    : "بفضل نموها المستمر وثقة المستهلك الهائلة، حصلت مجموعة دانوب على أكثر من 50 جائزة في فئات مختلفة. تتمثل فلسفة المجموعة في تقديم جودة استثنائية وبناء علاقات طويلة الأمد."
    }
    </p>
      </section>

      
      {/* 4. VISION & MISSION */}
      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 mt-28 mb-24">
        {/* Vision - Now Centered */}
        <div className="space-y-4 text-center">
  <h2 className="font-primary text-danube-gold text-[32px] uppercase">
    {isEn ? "Vision" : "الرؤية"}
  </h2>
  <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
    {isEn 
      ? "To be a Leading Property Developer in the region delivering affordable and sustainable development with high standards of construction." 
      : "أن نكون مطوراً عقارياً رائداً في المنطقة من خلال تقديم مشاريع مستدامة وبأسعار معقولة مع الالتزام بأعلى معايير البناء."
    }
  </p>
</div>

        {/* Mission - Now Centered */}
        <div className="space-y-4 text-center">
  <h2 className="font-primary text-danube-gold text-[32px] uppercase">
    {isEn ? "Mission" : "المهمة"}
  </h2>
  <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
    {isEn 
      ? "Conduct value engineering for each project. Deliver quality construction at extremely competitive rate. On-Time Delivery of the projects." 
      : "إجراء الهندسة القيمية لكل مشروع. تقديم بناء عالي الجودة بأسعار تنافسية للغاية. تسليم المشاريع في المواعيد المحددة."
    }
  </p>
</div>
      </section>

      {/* 5. AWARDS CAROUSEL */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <h2 className="font-primary text-danube-gold text-[32px] uppercase text-center mb-12">
          {isEn ? "Awards & Recognition" : "الجوائز والتقدير"}
        </h2>
        
        {/* Container constrained to match "Our Group" width */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative flex overflow-hidden">
            {/* The Animation Track */}
            <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
              {[...AWARDS, ...AWARDS].map((id, idx) => (
                <div 
                  key={idx} 
                  /* Adjusted: w-[180px] and mx-4 to fit more badges in the view */
                  className="flex-none w-[160px] md:w-[180px] h-36 mx-4 md:mx-6 relative"
                >
                  <CldImage 
                    src={id} 
                    alt="Award" 
                    fill 
                    className="object-contain" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS for the smooth crawl */}
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: scroll 45s linear infinite; /* Slightly slowed to account for more items */
          }
        `}</style>
      </section>

      {/* 6. OUR GROUP */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center"> 
        {/* Changed py-24 to py-16 to reduce overall section height */}
        
        <h2 className="font-primary text-danube-gold text-[32px] uppercase mb-6">
          {isEn ? "Our Group" : "مجموعتنا"}
        </h2>
        {/* Changed mb-12 to mb-6 for a tighter fit with the image */}

        <div className="relative w-full aspect-[16/7]">
          <CldImage 
            src="danube-1_h7kbfv" 
            alt="Our Group" 
            fill 
            className="object-contain" 
          />
        </div>
      </section>

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}