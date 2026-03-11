// src/components/home/FeaturedProjects.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CldImage from "@/components/shared/CldImageWrapper";
import { Trash2, Plus, X } from "lucide-react"; 
import { CldUploadWidget, CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from "next-cloudinary";

gsap.registerPlugin(ScrollTrigger);

interface HomeItem {
  _id: string;
  publicId: string;
  slug: string;
}

const WHY_INVEST = [
  { labelEn: "Safest city in the world", labelAr: "المدينة الأكثر أماناً في العالم", publicId: "saftycity_lhqlvw" },
  { labelEn: "Fastest growing Economy", labelAr: "الاقتصاد الأسرع نمواً", publicId: "grow_atjyqa" },
  { labelEn: "High Capital Appreciation", labelAr: "ارتفاع قيمة رأس المال", publicId: "highcapacity_dysm0c" },
  { labelEn: "Ease of Investment", labelAr: "سهولة الاستثمار", publicId: "investment_dflc0s" },
  { labelEn: "Freehold Ownership", labelAr: "تملك حر", publicId: "freehold_bfjwkm" },
  { labelEn: "100% Tax free income", labelAr: "دخل معفى من الضرائب بنسبة 100%", publicId: "taxfree_vnrfqc" },
  { labelEn: "Long-term Golden Visa", labelAr: "تأشيرة ذهبية طويلة الأمد", publicId: "longterm_ghjdl5" },
  { labelEn: "WorldWide Connectivity", labelAr: "اتصال عالمي", publicId: "worldwide_luvmof" },
];

// Note: Ensure your parent page.tsx passes setIsModalOpen from here to PropertyShowcase
export default function FeaturedProjects({ 
  locale, 
  initialData, 
  isModalOpen, 
  setIsModalOpen 
}: { 
  locale: string, 
  initialData: HomeItem[], 
  isModalOpen: boolean, 
  setIsModalOpen: (val: boolean) => void 
}) {
  const [featuredItems, setFeaturedItems] = useState<HomeItem[]>(initialData);
  const mainContainer = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isEn = locale === 'en';

  useEffect(() => {
    if (!featuredItems || featuredItems.length === 0) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${(featuredItems.length + 1) * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        featuredItems.forEach((_, index) => {
          tl.to(`.project-img-${index}`, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1,
            ease: "none"
          }, index);

          tl.to(`.project-img-${index}`, {
            autoAlpha: 0,
            duration: 0.1
          }, index + 1);
        });

        tl.from(".why-invest-content", { opacity: 0, y: 80, duration: 1 }, featuredItems.length);
        tl.from(".invest-card", { opacity: 0, y: 40, stagger: 0.1, duration: 0.6 }, "-=0.5");
      }, mainContainer);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [featuredItems]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    ScrollTrigger.getAll().forEach(t => t.kill());
    await fetch(`/api/home-featured?id=${id}`, { method: 'DELETE' });
    setFeaturedItems(prev => prev.filter(item => item._id !== id));
  };

  const handleUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
  const info = result.info as CloudinaryUploadWidgetInfo;
  const slug = prompt("Enter project slug:");
  if (!slug || !info?.public_id) return;
  
  // 1. Kill all GSAP triggers BEFORE the state update to prevent layout shifting
  ScrollTrigger.getAll().forEach(t => t.kill());

  const res = await fetch('/api/home-featured', {
    method: 'POST',
    body: JSON.stringify({ publicId: info.public_id, slug })
  });
  
  const newItem = await res.json();
  
  // 2. LIFO Logic: Put the new item at the START of the array [index 0]
  setFeaturedItems(prev => [newItem, ...prev]);
  
  // 3. Optional: Refresh ScrollTrigger after React finishes rendering
  setTimeout(() => ScrollTrigger.refresh(), 100);
};

  return (
    <div ref={mainContainer} className="relative w-full bg-[#F9F9F9] overflow-hidden">
      <div ref={triggerRef} className="relative w-full h-screen">
        {featuredItems.map((project, index) => (
          <div key={project._id} className={`project-img-${index} absolute inset-0 w-full h-full`} style={{ zIndex: 40 - index, clipPath: 'inset(0 0 0% 0)' }}>
            <Link href={`/${locale}/projects/${project.slug}`} className="group block relative w-full h-full cursor-pointer">
              <CldImage src={project.publicId} alt="Featured" fill className="object-cover object-top" priority={index < 2} />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            </Link>
          </div>
        ))}

        <div className="why-invest-content absolute inset-0 w-full h-full bg-[#F9F9F9] z-10 flex flex-col items-center justify-center">
          <div className="text-center mt-6 mb-8">
            <span className="text-[#888] font-medium tracking-[2.88px] uppercase text-[18px]">{isEn ? "Why" : "لماذا"}</span>
            <h2 className="text-danube-gold font-primary text-[32px] tracking-[1.5px] uppercase mt-2">{isEn ? "Invest In Dubai?" : "الاستثمار في دبي؟"}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl relative px-4">
            {WHY_INVEST.map((item, idx) => (
              <div key={idx} className="invest-card relative flex flex-col items-center justify-center p-8 group">
                {(idx + 1) % 4 !== 0 && <div className="absolute right-0 top-1/4 bottom-1/4 w-[1.5px] bg-gray-200 hidden md:block" />}
                {idx < 4 && <div className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-gray-200 hidden md:block" />}
                <div className="mb-4 h-[64px] w-[64px] relative transition-transform duration-500 group-hover:scale-110">
                  <CldImage src={item.publicId} alt="Icon" width={64} height={64} className="object-contain" />
                </div>
                <p className="font-medium uppercase text-center text-[12px] tracking-widest text-[#555]">{isEn ? item.labelEn : item.labelAr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-2xl font-bold text-slate-900">Manage Home Gallery</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-900 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <CldUploadWidget uploadPreset="danube_unsigned" onSuccess={handleUploadSuccess}>
                {({ open }) => (
                  <button onClick={() => open()} className="border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center h-48 hover:border-danube-gold hover:bg-slate-50 transition-all">
                    <Plus size={32} className="text-slate-400" />
                    <span className="text-sm mt-3 font-semibold text-slate-600">Add New Image</span>
                  </button>
                )}
              </CldUploadWidget>

              {featuredItems.map((item) => (
                <div key={item._id} className="relative group rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                  <CldImage src={item.publicId} width={400} height={300} alt={item.slug} className="object-cover h-48 w-full" />
                  <div className="absolute top-3 right-3">
                    <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}