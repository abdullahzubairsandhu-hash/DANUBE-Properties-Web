// src/components/shared/Footer.tsx

"use client";

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { CldImage } from 'next-cloudinary';

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.91l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer({ locale }: { locale: string }) {
  const isEn = locale === "en";

  // Data structure mapped for dual-language support
  const footerSections = [
    {
      titleEn: "About Us",
      titleAr: "من نحن",
      links: ["Company Profile", "Founders Message", "Leadership team", "Management team", "Our journey", "Careers", "Sitemap", "Contact"]
    },
    {
      titleEn: "Projects",
      titleAr: "المشاريع",
      links: ["Latest Launches", "Ongoing Projects", "Completed Projects"]
    },
    {
      titleEn: "Danube Assist",
      titleAr: "مساعدة دانوب",
      links: ["1% Payment Plan", "Broker Portal"]
    },
    {
      titleEn: "Media",
      titleAr: "الإعلام",
      links: ["News", "Video", "Blog", "Investment", "Golden Visa"]
    },
    {
      titleEn: "Support",
      titleAr: "الدعم",
      links: ["After Sales Support", "Sales Support"]
    },
    {
      titleEn: "Latest Launches",
      titleAr: "أحدث الإطلاقات",
      links: ["Shahrukhz", "Breez", "Aspirz", "Sparklz", "Timez", "Bayz 102", "Oasiz", "Oasiz 2"]
    },
    {
      titleEn: "Popular Areas",
      titleAr: "مناطق شهيرة",
      links: ["Al Furjan", "Al Warsan", "Arjan", "Business Bay", "Downtown", "Dubai Maritime City", "Dubai Science Park", "Dubai Studio City", "International City", "Jumeirah Lake Towers (JLT)", "Jumeirah Village Circle (JVC)", "Jumeirah Village Triangle (JVT)", "Liwan", "Marina", "Sports City", "Dubai Silicon Oasis"]
    },
    {
      titleEn: "Recent Searches",
      titleAr: "عمليات البحث الأخيرة",
      links: ["Apartments For Sale Dubai", "Studio Apartments For Sale Dubai", "One Bedroom Apartments Sale Dubai", "Two Bedroom Apartments Sale Dubai", "Three Bedroom Apartments Sale Dubai", "Four Bedroom Apartments Sale Dubai", "Off Plan Apartments Dubai", "Ready To Move Apartments Dubai", "Villas For Sale Dubai", "Duplexes for sale Dubai", "Penthouses For Sale Dubai", "Apartments with Swimming Pool", "Apartments near Metro", "Apartments with water view", "Apartments with Balcony"]
    }
  ];

  return (
    <footer className="bg-danube-navy text-white pt-20 pb-10" style={{ direction: isEn ? 'ltr' : 'rtl' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        
        {/* TOP PLANE: LOGO & SOCIALS */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-16">
          <CldImage 
            width="300" 
            height="100" 
            src="danube-header-logo_udzvhz" 
            alt="DANUBE PROPERTIES" 
            className="brightness-0 invert object-contain"
          />
          <div className="flex gap-8 mt-8 md:mt-0" style={{ direction: 'ltr' }}>
            <Link href="https://www.facebook.com/danubeproperties/" target="_blank" className="hover:text-danube-gold transition-colors"><Facebook size={22} /></Link>
            <Link href="https://x.com/danubeprop" target="_blank" className="hover:text-danube-gold transition-colors"><XIcon size={20} /></Link>
            <Link href="https://www.instagram.com/danubeproperties/" target="_blank" className="hover:text-danube-gold transition-colors"><Instagram size={22} /></Link>
            <Link href="https://ae.linkedin.com/company/danubeproperties" target="_blank" className="hover:text-danube-gold transition-colors"><Linkedin size={22} /></Link>
            <Link href="https://www.youtube.com/user/danubeproperties" target="_blank" className="hover:text-danube-gold transition-colors"><Youtube size={22} /></Link>
          </div>
        </div>

        {/* LINKS GRID: 4 COLUMNS, AUTOMATIC 2 ROWS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mb-20">
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="font-secondary font-bold text-[13px] tracking-[0.2em] text-white uppercase border-b border-white/5 pb-4 inline-block w-full">
                {isEn ? section.titleEn : section.titleAr}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      href="#" 
                      className="font-secondary text-[11px] text-gray-400 hover:text-white transition-colors uppercase tracking-wider block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM PLANE: COPYRIGHT & POLICIES */}
        <div className="border-t border-white/10 pt-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="font-secondary text-[11px] text-gray-500 uppercase tracking-widest">
            © 2026 {isEn ? "DANUBE PROPERTIES. ALL RIGHTS RESERVED." : "دانوب العقارية. جميع الحقوق محفوظة."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-secondary text-[11px] text-gray-500 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">{isEn ? "TERMS CONDITIONS" : "الشروط والأحكام"}</Link>
            <Link href="#" className="hover:text-white transition-colors">{isEn ? "COOKIE POLICY" : "سياسة الكوكيز"}</Link>
            <Link href="#" className="hover:text-white transition-colors">{isEn ? "PRIVACY POLICY" : "سياسة الخصوصية"}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}