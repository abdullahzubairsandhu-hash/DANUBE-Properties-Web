// src/components/home/HeroSection.tsx

"use client";

import Link from "next/link";


interface HeroProps {
  locale: string;
  videoUrl: string;    // This is the Cloudinary Public ID
  projectName: string;
  slug: string;
}

export default function HeroSection({ locale, videoUrl, projectName, slug }: HeroProps) {
  const isEn = locale === "en";

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <section className="relative h-screen w-full overflow-hidden bg-black">
        {/* DYNAMIC VIDEO BACKGROUND */}
        <video
          autoPlay
          muted
          loop
          playsInline
          key={videoUrl} // Forces re-render if video changes
          className="absolute inset-0 h-full w-full object-cover"
          style={{ 
            objectPosition: 'center top',
            transform: 'translateY(20px) scale(1.05)',
          }} 
        >
          {/* Construct the Cloudinary URL dynamically */}
          <source 
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/${videoUrl}.mp4`} 
            type="video/mp4" 
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
      </section>

      <section className="bg-[#F9F9F9] py-24 px-6 flex flex-col items-center text-center">
        {/* LATEST LAUNCH TAG */}
        <span className="text-[#4A4B4B] font-secondary text-base font-medium tracking-[3px] uppercase mb-5 block w-[484px] max-w-full">
          {isEn ? "LATEST LAUNCH" : "أحدث إطلاق"}
        </span>
        
        {/* PROJECT TITLE + BY DANUBE */}
        <h2 className="text-[#BDA588] font-primary text-[39px] font-normal tracking-[1.7px] leading-[35px] uppercase mb-[50px] block w-[484px] max-w-full text-center">
          {projectName} {isEn ? "BY DANUBE" : "من دانوب"}
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mt-8">
          {/* DISCOVER BUTTON -> Links to the dynamic project page */}
          <Link href={`/${locale}/projects/${slug}`}>
            <button className="bg-[#555555] text-white w-[180px] h-[56px] cursor-pointer flex items-center justify-center gap-[10px] px-[30px] font-secondary text-[13px] font-600 tracking-[1.5px] uppercase transition-all hover:bg-black">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {isEn ? "DISCOVER" : "اكتشف"}
            </button>
          </Link>

          {/* REGISTER INTEREST BUTTON */}
          <button className="bg-[#BDA588] text-white w-[240px] h-[56px] cursor-pointer flex items-center justify-center px-[30px] font-secondary text-[13px] font-600 tracking-[1.5px] uppercase transition-all hover:opacity-90 shadow-sm">
            {isEn ? "REGISTER INTEREST" : "سجل اهتمامك"}
          </button>
        </div>
      </section>
    </div>
  );
}