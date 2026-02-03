// src/components/home/FounderSection.tsx

"use client";
import { CldImage } from 'next-cloudinary';

export default function FounderSection({ locale }: { locale: string }) {
  const isEn = locale === "en";
  
  return (
    <section className="relative min-h-screen w-full flex items-center bg-white dark:bg-danube-navy py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* IMAGE SIDE - RIZWAN SAJAN */}
        <div className="relative h-[70vh] md:h-[85vh] w-full group">
          <div className="absolute inset-0 border-[12px] border-danube-gold/10 -m-6 z-0 group-hover:m-0 transition-all duration-700"></div>
          
          <div className="relative h-full w-full overflow-hidden shadow-2xl z-10">
            <CldImage 
              src="rizwan-sajan-the-1-man_pxlavv" 
              alt="RIZWAN SAJAN"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
              priority
            />
          </div>

          {/* FLOATING BADGE */}
          <div className="absolute -bottom-8 -right-4 md:right-12 z-20 bg-danube-gold px-10 py-6 shadow-2xl">
            <p className="text-white font-black text-3xl md:text-4xl italic tracking-tighter uppercase">
              &quot;THE 1% MAN&quot;
            </p>
          </div>
        </div>

        {/* TEXT SIDE */}
        <div className="space-y-8 z-10">
          <div className="space-y-2">
            <div className="w-12 h-1 bg-danube-red mb-4"></div>
            <h4 className="text-danube-gold font-black tracking-[0.5em] uppercase text-xs">
              {isEn ? "FOUNDER & CHAIRMAN" : "المؤسس ورئيس مجلس الإدارة"}
            </h4>
            <h2 className="text-6xl md:text-8xl font-black italic text-danube-navy dark:text-white leading-[0.85] uppercase tracking-tighter">
              RIZWAN <br /> 
              <span className="text-danube-red">SAJAN</span>
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium max-w-xl uppercase tracking-tight">
            {isEn 
              ? "The visionary behind Danube Group's transformation into a global powerhouse. Built on the foundation of trust and the revolutionary 1% payment plan."
              : "المبتكر وراء تحول مجموعة دانوب إلى قوة عالمية. تأسست على ركيزة الثقة وخطة سداد 1٪ الثورية."}
          </p>

          <div className="pt-4">
            <button className="group flex items-center gap-4 text-danube-navy dark:text-white font-black tracking-[0.3em] text-xs uppercase transition-all">
              <span className="border-b-2 border-danube-red pb-1 group-hover:border-danube-gold transition-colors">
                {isEn ? "READ HIS STORY" : "اقرأ قصته"}
              </span>
              <div className="w-8 h-[2px] bg-danube-red group-hover:w-16 transition-all duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* BACKGROUND ACCENT TEXT */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-gray-50 dark:text-white/[0.02] select-none pointer-events-none z-0 uppercase italic">
        DANUBE
      </div>
    </section>
  );
}