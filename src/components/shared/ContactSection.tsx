// src/components/home/ContactSection.tsx
"use client";

import CldImage from "@/components/shared/CldImageWrapper";
import { useState, useMemo } from "react";

const COUNTRY_DATA = [
  { name: "Afghanistan", code: "+93", iso: "AF" },
  { name: "Albania", code: "+355", iso: "AL" },
  { name: "Algeria", code: "+213", iso: "DZ" },
  { name: "Andorra", code: "+376", iso: "AD" },
  { name: "Angola", code: "+244", iso: "AO" },
  { name: "Argentina", code: "+54", iso: "AR" },
  { name: "Australia", code: "+61", iso: "AU" },
  { name: "Austria", code: "+43", iso: "AT" },
  { name: "Bahrain", code: "+973", iso: "BH" },
  { name: "Bangladesh", code: "+880", iso: "BD" },
  { name: "Belgium", code: "+32", iso: "BE" },
  { name: "Brazil", code: "+55", iso: "BR" },
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "China", code: "+86", iso: "CN" },
  { name: "Egypt", code: "+20", iso: "EG" },
  { name: "France", code: "+33", iso: "FR" },
  { name: "Germany", code: "+49", iso: "DE" },
  { name: "India", code: "+91", iso: "IN" },
  { name: "Italy", code: "+39", iso: "IT" },
  { name: "Jordan", code: "+962", iso: "JO" },
  { name: "Kuwait", code: "+965", iso: "KW" },
  { name: "Lebanon", code: "+961", iso: "LB" },
  { name: "Oman", code: "+968", iso: "OM" },
  { name: "Pakistan", code: "+92", iso: "PK" },
  { name: "Qatar", code: "+974", iso: "QA" },
  { name: "Russia", code: "+7", iso: "RU" },
  { name: "Saudi Arabia", code: "+966", iso: "SA" },
  { name: "Spain", code: "+34", iso: "ES" },
  { name: "Turkey", code: "+90", iso: "TR" },
  { name: "United Arab Emirates", code: "+971", iso: "AE" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "United States", code: "+1", iso: "US" },
];

export default function ContactSection({ locale, isSidebar = false }: { locale: string, isSidebar?: boolean }) {
  const isEn = locale === "en";
  
  const [formData, setFormData] = useState({
    countryCode: "+971",
    nationality: "",
    budget: "",
    unitType: "",
    timeline: ""
  });

  // Fixed the sorting logic and utilized useMemo correctly
  const sortedCountries = useMemo(() => {
    return [...COUNTRY_DATA].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <section className={`relative w-full ${isSidebar ? "py-0 bg-white" : "py-24 bg-[#0A1A2F]"} overflow-hidden`}>
      <div className={`${isSidebar ? "w-full" : "max-w-7xl mx-auto px-6"} relative z-10`}>
        
        {/* HEADING */}
        <div className="text-center mb-16">
          {!isSidebar && (
            <span style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-secondary)', fontSize: '18px', fontWeight: 500, letterSpacing: '2.88px', textTransform: 'uppercase', display: 'block' }}>
              {isEn ? "Questions?" : "أسئلة؟"}
            </span>
          )}
          <h2 style={{ color: 'rgb(189, 165, 136)', fontFamily: 'var(--font-primary)', fontSize: isSidebar ? '32px' : '42px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '8px' }}>
            {isSidebar 
              ? (isEn ? "Register Your Interest" : "سجل اهتمامك") 
              : (isEn ? "Get In Touch" : "تواصل معنا")}
          </h2>
        </div>

        <div className={`grid grid-cols-1 ${isSidebar ? "" : "lg:grid-cols-2 shadow-2xl rounded-sm overflow-hidden"} gap-0`}>
          
        <div className={`bg-white ${isSidebar ? "p-0" : "p-8 md:p-12"}`}>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              
              {/* Row 1: Names */}
              <div className={`grid grid-cols-1 ${isSidebar ? "" : "md:grid-cols-2"} gap-8`}>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">First Name*</label>
                  <input type="text" required className="bg-white py-3 outline-none text-gray-800" placeholder="John" />
                </div>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Last Name*</label>
                  <input type="text" required className="bg-white py-3 outline-none text-gray-800" placeholder="Doe" />
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className={`grid grid-cols-1 ${isSidebar ? "" : "md:grid-cols-2"} gap-8`}>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Phone Number*</label>
                  <div className="flex gap-2">
                    <select 
                      value={formData.countryCode}
                      onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                      className="bg-white py-3 outline-none text-gray-700 font-medium cursor-pointer w-[100px]"
                    >
                      {sortedCountries.map((c) => (
                        <option key={`${c.iso}-code`} value={c.code} className="bg-white text-black">
                          {c.iso} {c.code}
                        </option>
                      ))}
                    </select>
                    <input type="tel" required className="flex-1 bg-white py-3 outline-none text-gray-800" placeholder="50 123 4567" />
                  </div>
                </div>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Email*</label>
                  <input type="email" required className="bg-white py-3 outline-none text-gray-800" placeholder="john@danube.com" />
                </div>
              </div>

              {/* Row 3: Budget & Unit */}
              <div className={`grid grid-cols-1 ${isSidebar ? "" : "md:grid-cols-2"} gap-8`}>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Select Budget*</label>
                  <select 
                    required
                    value={formData.budget}
                    className="bg-white py-3 outline-none text-gray-700 cursor-pointer"
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  >
                    <option value="" disabled>Select Range</option>
                    <option value="1-2" className="bg-white text-black">AED 1M - AED 2M</option>
                    <option value="2-3" className="bg-white text-black">AED 2M - AED 3M</option>
                    <option value="3-5" className="bg-white text-black">AED 3M - AED 5M</option>
                    <option value="5plus" className="bg-white text-black">AED 5M+</option>
                  </select>
                </div>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Select Unit Type*</label>
                  <select 
                    required
                    value={formData.unitType}
                    className="bg-white py-3 outline-none text-gray-700 cursor-pointer"
                    onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                  >
                    <option value="" disabled>Select Unit</option>
                    <option value="studio" className="bg-white text-black">Studio</option>
                    <option value="1br" className="bg-white text-black">1 Bedroom</option>
                    <option value="2br" className="bg-white text-black">2 Bedroom</option>
                    <option value="3br" className="bg-white text-black">3 Bedroom</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Timeline & Nationality */}
              <div className={`grid grid-cols-1 ${isSidebar ? "" : "md:grid-cols-2"} gap-8`}>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Purchase Timeline*</label>
                  <select 
                    required
                    value={formData.timeline}
                    className="bg-white py-3 outline-none text-gray-700 cursor-pointer"
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  >
                    <option value="" disabled>Timeline</option>
                    <option value="60" className="bg-white text-black">Within 60 days</option>
                    <option value="90" className="bg-white text-black">Within 90 days</option>
                    <option value="90plus" className="bg-white text-black">After 90 days</option>
                  </select>
                </div>
                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                  <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Nationality*</label>
                  <select 
                    required
                    value={formData.nationality}
                    className="bg-white py-3 outline-none text-gray-700 cursor-pointer"
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                  >
                    <option value="" disabled>Select Nationality</option>
                    {sortedCountries.map((c) => (
                      <option key={`${c.iso}-nat`} value={c.name} className="bg-white text-black">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Captcha Disclaimer */}
              <div className="bg-gray-50 p-4 border-l-4 border-blue-500 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" required className="w-5 h-5 accent-blue-600" />
                  <span className="text-sm font-medium text-gray-700">I&apos;m not a robot</span>
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Turnstile Security</div>
              </div>

              {/* Formal Disclaimer */}
              <div className="bg-gray-50 p-5 border border-gray-200">
                <p className="text-[12px] leading-[1.6] text-gray-600 italic">
                  <span className="font-bold text-gray-800 not-italic">Disclaimer:</span> Danube Properties values your privacy and will use the contact information you provide solely for communicating with you about our products and services. By clicking the submit button, you consent to our sales agents contacting you via phone calls, emails, and WhatsApp messages. You have the right to opt out of these communications at any time. For more details, please review our comprehensive Privacy Policy.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full h-[60px] bg-[#555555] text-white font-bold tracking-[0.2em] text-[14px] uppercase transition-all duration-400 hover:bg-black shadow-lg"
              >
                {isEn ? "Submit Request" : "إرسال الطلب"}
              </button>
            </form>
          </div>

          {!isSidebar && (
          <div className="relative hidden lg:block h-full min-h-[750px] bg-gray-200">
            <CldImage 
              src="skyline_get-in-touch_vkeujg" 
              alt="Dubai Skyline" 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          )}

        </div>
      </div>
    </section>
  );
}