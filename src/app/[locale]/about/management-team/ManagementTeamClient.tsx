// src/app/[locale]/about/management-team/ManagementTeamClient.tsx

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

export default function ManagementTeamClient({ locale }: { locale: string }) {
  const isEn = locale === 'en';

  const managers = [
    {
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
      name: "Ghayyour Ahmad",
      desig: "GM - Projects & Development",
      image: "ghayyour-1_mxvafb",
      p1: isEn
        ? "With over 25 years of experience in business strategies, project management, and construction, Ghayyour Ahmad is a driving force behind Danube Properties' success. As the General Manager for Projects and Development, he plays a pivotal role in ensuring timely project deliveries, exceeding expectations with high-quality, luxurious finishes."
        : "مع أكثر من 25 عاماً من الخبرة في استراتيجيات الأعمال وإدارة المشاريع والإنشاءات، يعد غيور أحمد قوة دافعة وراء نجاح دانوب العقارية. وبصفته المدير العام للمشاريع والتطوير، يلعب دوراً محورياً في ضمان تسليم المشاريع في الوقت المحدد، متجاوزاً التوقعات بتشطيبات فاخرة وعالية الجودة.",
      p2: isEn
        ? "His commitment to excellence extends beyond construction, and he fosters a focus on exceptional customer service, ensuring a seamless and positive experience for every homeowner."
        : "يمتد التزامه بالتميز إلى ما هو أبعد من البناء، حيث يعزز التركيز على خدمة العملاء الاستثنائية، مما يضمن تجربة سلسة وإيجابية لكل مالك منزل."
    }
  ];

  return (
    <main className="min-h-screen bg-white pt-48">
      <section className="max-w-7xl mx-auto px-6 mb-32">
        
        {/* CENTERED HEADING SECTION */}
        <div className="mb-24 flex flex-col items-center text-center">
          <h1 className="font-primary text-danube-gold text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Management Team" : "فريق الإدارة"}
          </h1>
          <div className="w-24 h-1.5 bg-danube-gold mt-4"></div>
        </div>

        {/* CENTERED MANAGERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {managers.map((manager, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              
              {/* Image Container - CHANGED TO LANDSCAPE (3/2 ratio) */}
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                <CldImage
                  src={manager.image}
                  alt={manager.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Identity - Centered */}
              <div className="mb-8">
                <h2 className="font-primary text-black text-[28px] md:text-[36px] uppercase">
                  {manager.name}
                </h2>
                <p className="font-secondary text-danube-gold text-[16px] md:text-[18px] font-bold uppercase tracking-[0.2em] mt-2">
                  {manager.desig}
                </p>
              </div>

              {/* Bio Paragraphs - Centered & font-medium */}
              <div className="space-y-6 max-w-xl">
                <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                  {manager.p1}
                </p>
                <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                  {manager.p2}
                </p>
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