// src/components/home/ContactSection.tsx
"use client";

import CldImage from "@/components/shared/CldImageWrapper";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+971",
    nationality: "",
    budget: "",
    unitType: "",
    timeline: ""
  });

  // 2. STATUS STATES
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const sortedCountries = useMemo(() => {
    return [...COUNTRY_DATA].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // 3. THE SUBMISSION HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: {
            countryCode: formData.countryCode,
            number: formData.phoneNumber
          },
          budget: formData.budget,
          unitType: formData.unitType,
          timeline: formData.timeline,
          nationality: formData.nationality,
          sourcePage: pathname // Automatically captures current URL
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        // Optional: Reset form after 3 seconds
        setTimeout(() => setStatus('idle'), 5000);
        setFormData({ ...formData, firstName: "", lastName: "", email: "", phoneNumber: "" });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };



  return (
    <section className={`relative w-full ${isSidebar ? "py-0 bg-white" : "py-24 bg-[#0A1A2F]"} overflow-hidden`}>
      <div className={`${isSidebar ? "w-full" : "max-w-7xl mx-auto px-6"} relative z-10`}>
        
        {/* HEADING */}
        <div className="text-center mb-16">
          {!isSidebar && (
            <span className="font-secondary text-[18px] font-medium tracking-[2.88px] uppercase block text-white/60">
              {isEn ? "Questions?" : "أسئلة؟"}
            </span>
          )}
          <h2 className="font-primary text-danube-gold text-[32px] lg:text-[42px] tracking-[1.5px] uppercase mt-2">
            {isSidebar 
              ? (isEn ? "Register Your Interest" : "سجل اهتمامك") 
              : (isEn ? "Get In Touch" : "تواصل معنا")}
          </h2>
        </div>

        <div className={`grid grid-cols-1 ${isSidebar ? "" : "lg:grid-cols-2 shadow-2xl rounded-sm overflow-hidden"} gap-0`}>
          
        <div className={`bg-white ${isSidebar ? "p-0" : "p-8 md:p-12"}`}>
            {status === 'success' ? (
              <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">✓</div>
                 <h3 className="font-primary text-2xl uppercase">Thank You!</h3>
                 <p className="font-secondary font-medium text-gray-600">Our sales advisor will contact you shortly.</p>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                
                {/* Row 1: Names */}
                <div className={`grid grid-cols-1 ${isSidebar ? "" : "md:grid-cols-2"} gap-8`}>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                    <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">First Name*</label>
                    <input 
                      type="text" required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="bg-white py-3 outline-none text-gray-800 font-medium" placeholder="John" 
                    />
                  </div>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                    <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Last Name*</label>
                    <input 
                      type="text" required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="bg-white py-3 outline-none text-gray-800 font-medium" placeholder="Doe" 
                    />
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
                          <option key={`${c.iso}-code`} value={c.code}>
                            {c.iso} {c.code}
                          </option>
                        ))}
                      </select>
                      <input 
                        type="tel" required 
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="flex-1 bg-white py-3 outline-none text-gray-800 font-medium" placeholder="50 123 4567" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                    <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Email*</label>
                    <input 
                      type="email" required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white py-3 outline-none text-gray-800 font-medium" placeholder="john@danube.com" 
                    />
                  </div>
                </div>

                {/* Row 3: Budget & Unit */}
                <div className={`grid grid-cols-1 ${isSidebar ? "" : "md:grid-cols-2"} gap-8`}>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                    <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Select Budget*</label>
                    <select 
                      required
                      value={formData.budget}
                      className="bg-white py-3 outline-none text-gray-700 cursor-pointer font-medium"
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="" disabled>Select Range</option>
                      <option value="1-2">AED 1M - AED 2M</option>
                      <option value="2-3">AED 2M - AED 3M</option>
                      <option value="3-5">AED 3M - AED 5M</option>
                      <option value="5plus">AED 5M+</option>
                    </select>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                    <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Select Unit Type*</label>
                    <select 
                      required
                      value={formData.unitType}
                      className="bg-white py-3 outline-none text-gray-700 cursor-pointer font-medium"
                      onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                    >
                      <option value="" disabled>Select Unit</option>
                      <option value="studio">Studio</option>
                      <option value="1br">1 Bedroom</option>
                      <option value="2br">2 Bedroom</option>
                      <option value="3br">3 Bedroom</option>
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
                      className="bg-white py-3 outline-none text-gray-700 cursor-pointer font-medium"
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    >
                      <option value="" disabled>Timeline</option>
                      <option value="60">Within 60 days</option>
                      <option value="90">Within 90 days</option>
                      <option value="90plus">After 90 days</option>
                    </select>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#BDA588]">
                    <label className="text-[11px] font-bold text-[#BDA588] uppercase tracking-wider">Nationality*</label>
                    <select 
                      required
                      value={formData.nationality}
                      className="bg-white py-3 outline-none text-gray-700 cursor-pointer font-medium"
                      onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    >
                      <option value="" disabled>Select Nationality</option>
                      {sortedCountries.map((c) => (
                        <option key={`${c.iso}-nat`} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-[60px] bg-[#555555] text-white font-bold tracking-[0.2em] text-[14px] uppercase transition-all duration-400 hover:bg-black shadow-lg disabled:opacity-50"
                >
                  {status === 'loading' ? (isEn ? "Processing..." : "جاري المعالجة...") : (isEn ? "Submit Request" : "إرسال الطلب")}
                </button>
                {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
              </form>
            )}
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