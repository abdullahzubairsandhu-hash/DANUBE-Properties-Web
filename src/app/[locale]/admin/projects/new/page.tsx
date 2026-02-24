// src/app/[locale]/admin/projects/new/page.tsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MediaPicker from "@/components/admin/MediaPicker";

interface SpecData {
  price: string;
  completion: string;
  paymentPlan: string;
  apartments: string;
  location: string;
  commercial_units: string;
}

interface Amenity {
  imageId: string;
  titleEn: string;
  titleAr: string;
}

interface FAQ {
  qEn: string;
  aEn: string;
  qAr: string;
  aAr: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    isLatestLaunch: false,
    isFeatured: false,
    heroMediaId: "",
    heroIsVideo: false,
    descEn: "",
    descAr: "",
    specs: {
      price: "",
      completion: "",
      paymentPlan: "",
      apartments: "",
      location: "",
      commercial_units: ""
    } as SpecData,
    amenitiesIcons: [] as Amenity[],
    amenitiesShowcase: [] as Amenity[],
    gallery4: [] as string[],
    mediaGallery: [] as string[],
    faqs: [] as FAQ[],
    mapIframe: ""
  });

  // Dynamic Handlers
  const addAmenity = (type: 'amenitiesIcons' | 'amenitiesShowcase') => {
    const newItem = { imageId: "", titleEn: "", titleAr: "" };
    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  const addFAQ = () => {
    const newItem = { qEn: "", aEn: "", qAr: "", aAr: "" };
    setFormData({ ...formData, faqs: [...formData.faqs, newItem] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Project Published Successfully! 🚀");
        router.push(`/admin/projects`); 
      } else {
        throw new Error(result.error || "Failed to save project");
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Connection error";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white min-h-screen text-black font-medium">
      <div className="flex justify-between items-center mb-10 border-b-2 border-danube-gold pb-4">
        <h1 className="text-3xl font-primary text-danube-gold uppercase">Master Project Creator</h1>
        <button onClick={() => router.back()} className="text-xs font-bold tracking-widest text-gray-400 hover:text-black uppercase">← Cancel</button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-16">
        {/* 1. IDENTITY & HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-danube-navy bg-gray-100 p-2">1. Identity</h2>
            <input className="w-full border p-4 text-sm" placeholder="PROJECT TITLE" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <input className="w-full border p-4 text-sm" placeholder="SLUG (URL SAFE)" onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
            <div className="flex gap-6 p-4 border-2 border-dashed border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                    <input type="checkbox" className="w-4 h-4 accent-danube-gold" onChange={(e) => setFormData({...formData, isLatestLaunch: e.target.checked})} />
                    LATEST LAUNCH
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                    <input type="checkbox" className="w-4 h-4 accent-danube-gold" onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} />
                    FEATURED
                </label>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-danube-navy bg-gray-100 p-2">2. Hero Asset</h2>
            <MediaPicker label="Hero Image/Video" value={formData.heroMediaId} onChange={(id) => setFormData({...formData, heroMediaId: id as string})} />
            <label className="flex items-center gap-2 text-xs font-bold px-1">
                <input type="checkbox" className="w-4 h-4 accent-danube-navy" onChange={(e) => setFormData({...formData, heroIsVideo: e.target.checked})} />
                MARK AS VIDEO CONTENT
            </label>
          </div>
        </section>

        {/* 2. SPECIFICATIONS */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-danube-navy bg-gray-100 p-2">3. Property Specs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.keys(formData.specs).map((key) => (
              <div key={key}>
                <label className="text-[10px] uppercase font-bold text-gray-400">{key.replace('_', ' ')}</label>
                <input 
                  className="w-full border p-3 text-xs uppercase focus:border-danube-gold outline-none" 
                  placeholder="Value..." 
                  onChange={(e) => setFormData({...formData, specs: {...formData.specs, [key]: e.target.value}})}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3. AMENITIES DYNAMIC SECTION */}
        <section className="space-y-6">
          <div className="flex justify-between items-center bg-gray-100 p-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-danube-navy">4. Amenities Icons</h2>
            <button type="button" onClick={() => addAmenity('amenitiesIcons')} className="text-[10px] bg-danube-navy text-white px-3 py-1 hover:bg-black transition-all">+ ADD NEW</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.amenitiesIcons.map((item, idx) => (
              <div key={idx} className="border p-4 grid grid-cols-2 gap-2 bg-gray-50">
                <div className="col-span-2">
                   <MediaPicker label={`Icon ${idx+1}`} value={item.imageId} onChange={(id) => {
                     const newArr = [...formData.amenitiesIcons];
                     newArr[idx].imageId = id as string;
                     setFormData({...formData, amenitiesIcons: newArr});
                   }} />
                </div>
                <input placeholder="EN Title" className="border p-2 text-xs" onChange={(e) => {
                  const newArr = [...formData.amenitiesIcons];
                  newArr[idx].titleEn = e.target.value;
                  setFormData({...formData, amenitiesIcons: newArr});
                }} />
                <input placeholder="AR Title" dir="rtl" className="border p-2 text-xs" onChange={(e) => {
                  const newArr = [...formData.amenitiesIcons];
                  newArr[idx].titleAr = e.target.value;
                  setFormData({...formData, amenitiesIcons: newArr});
                }} />
              </div>
            ))}
          </div>
        </section>

        {/* 4. BULK GALLERIES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <MediaPicker label="Gallery 4 (Reveal)" multiple value={formData.gallery4} onChange={(ids) => setFormData({...formData, gallery4: ids as string[]})} />
           <MediaPicker label="Media Gallery (Full)" multiple value={formData.mediaGallery} onChange={(ids) => setFormData({...formData, mediaGallery: ids as string[]})} />
        </section>

        {/* 5. DYNAMIC FAQ SECTION */}
        <section className="space-y-6">
          <div className="flex justify-between items-center bg-gray-100 p-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-danube-navy">5. Project FAQs</h2>
            <button 
              type="button" 
              onClick={addFAQ} // Function is now used
              className="text-[10px] bg-danube-navy text-white px-3 py-1 hover:bg-black transition-all"
            >
              + ADD QUESTION
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.faqs.map((faq, idx) => (
              <div key={idx} className="border p-6 bg-gray-50 space-y-4 relative group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* English FAQ */}
                  <div className="space-y-2">
                    <input 
                      placeholder="Question (EN)" 
                      className="w-full border p-2 text-xs font-bold"
                      value={faq.qEn}
                      onChange={(e) => {
                        const newFaqs = [...formData.faqs];
                        newFaqs[idx].qEn = e.target.value;
                        setFormData({...formData, faqs: newFaqs});
                      }}
                    />
                    <textarea 
                      placeholder="Answer (EN)" 
                      className="w-full border p-2 text-xs h-20"
                      value={faq.aEn}
                      onChange={(e) => {
                        const newFaqs = [...formData.faqs];
                        newFaqs[idx].aEn = e.target.value;
                        setFormData({...formData, faqs: newFaqs});
                      }}
                    />
                  </div>
                  
                  {/* Arabic FAQ */}
                  <div className="space-y-2" dir="rtl">
                    <input 
                      placeholder="السؤال (AR)" 
                      className="w-full border p-2 text-xs font-bold"
                      value={faq.qAr}
                      onChange={(e) => {
                        const newFaqs = [...formData.faqs];
                        newFaqs[idx].qAr = e.target.value;
                        setFormData({...formData, faqs: newFaqs});
                      }}
                    />
                    <textarea 
                      placeholder="الإجابة (AR)" 
                      className="w-full border p-2 text-xs h-20"
                      value={faq.aAr}
                      onChange={(e) => {
                        const newFaqs = [...formData.faqs];
                        newFaqs[idx].aAr = e.target.value;
                        setFormData({...formData, faqs: newFaqs});
                      }}
                    />
                  </div>
                </div>
                
                {/* Remove Button */}
                <button 
                  type="button"
                  onClick={() => {
                    const newFaqs = formData.faqs.filter((_, i) => i !== idx);
                    setFormData({...formData, faqs: newFaqs});
                  }}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs font-bold p-1"
                >
                  REMOVE
                </button>
              </div>
            ))}
          </div>
        </section>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-danube-navy text-white py-6 text-sm font-secondary tracking-[5px] uppercase hover:bg-danube-gold transition-all disabled:opacity-50 sticky bottom-8 shadow-2xl"
        >
          {loading ? "Processing Data..." : "Finalize & Publish Project"}
        </button>
      </form>
    </div>
  );
}