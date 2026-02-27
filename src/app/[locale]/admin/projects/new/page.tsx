// src/app/[locale]/admin/projects/new/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  Loader2, 
  ChevronLeft,
  X,
  Plus,
  Trash2 
} from "lucide-react";
import Image from "next/image";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload"; 

// --- Types & Interfaces ---
interface AreaReason {
  icon: string;
  textEn: string;
  textAr: string;
}

interface AmenityItem {
  titleEn: string;
  titleAr: string;
  imageId: string;
}

interface FAQItem {
  qEn: string;
  aEn: string;
  qAr: string;
  aAr: string;
}

interface ProjectFormData {
  title: string;
  slug: string;
  heroMediaId: string;
  heroIsVideo: boolean;
  isLatestLaunch: boolean;
  descEn: string;
  descAr: string;
  mapIframe: string;
  specs: {
    price: string;
    completion: string;
    paymentPlan: string;
    apartments: string;
    commercial_units: string;
    location: string;
  };
  areaReasons: AreaReason[];
  gallery4: string[];
  amenitiesShowcase: AmenityItem[];
  amenitiesIcons: AmenityItem[];
  mediaGallery: string[];
  faqs: FAQItem[];
}

export interface SectionProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

const initialState: ProjectFormData = {
  title: "",
  slug: "",
  heroMediaId: "",
  heroIsVideo: false,
  isLatestLaunch: false,
  descEn: "",
  descAr: "",
  mapIframe: "",
  specs: { price: "", completion: "", paymentPlan: "", apartments: "", commercial_units: "", location: "" },
  areaReasons: [],
  gallery4: [],
  amenitiesShowcase: [],
  amenitiesIcons: [],
  mediaGallery: [],
  faqs: [],
};

export default function MasterProjectCreator() {
  const [formData, setFormData] = useState<ProjectFormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  }, [formData.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // MATCH THE FOLDER PATH: /api/admin/projects
    const apiUrl = `${window.location.origin}/api/admin/projects`;
  
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
  
      if (res.ok && result.success) {
        // Success! Move the user to the projects list
        router.push("/admin/projects"); 
      } else {
        // The server is reached but returned a validation error (e.g., missing slug)
        console.error("Server Error:", result.error);
        alert(`Validation Error: ${result.error || "Please check required fields."}`);
      }
    } catch (error) {
      // Network error
      console.error("Connection failed:", error);
      alert("Could not connect to the server. Please check your terminal for errors.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <header className="sticky top-0 z-[100] bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-primary text-danube-navy uppercase tracking-tighter">Create New Project</h1>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-danube-navy text-white px-8 py-3 rounded-sm font-bold uppercase text-[10px] tracking-[2px] hover:bg-black transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {isSubmitting ? "Saving..." : "Publish Project"}
        </button>
      </header>

      <main className="max-w-7xl mx-auto mt-12 px-8 space-y-6">
        <SectionCoreDetails formData={formData} setFormData={setFormData} />
        <SectionLocation formData={formData} setFormData={setFormData} />
        <SectionRevealGallery formData={formData} setFormData={setFormData} />
        <SectionAmenitiesShowcase formData={formData} setFormData={setFormData} />
        <SectionAmenitiesIcons formData={formData} setFormData={setFormData} />
        <SectionMediaGallery formData={formData} setFormData={setFormData} />
        <SectionFAQs formData={formData} setFormData={setFormData} />
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SectionCoreDetails({ formData, setFormData }: SectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Helper with strict typing for the key and value
  const updateSpec = (key: keyof typeof formData.specs, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specs: {
        ...prev.specs,
        [key]: value,
      },
    }));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <span className="bg-danube-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            01
          </span>
          <h2 className="text-lg font-primary text-danube-navy uppercase tracking-tighter">
            Core Identity & Specs
          </h2>
        </div>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      <div
        className={`${
          isOpen ? "max-h-[2000px] opacity-100 p-8" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 space-y-12`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputGroup
            label="Project Title"
            value={formData.title}
            onChange={(v: string) => setFormData({ ...formData, title: v })}
          />
          <InputGroup
            label="Slug (Auto)"
            value={formData.slug}
            onChange={Object.assign(() => {})} // "Masks" the function signature
            disabled
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          <div className="lg:col-span-2">
            <CloudinaryUpload
              label="Hero Media"
              value={formData.heroMediaId}
              onChange={(id: string | string[]) => 
                setFormData({ ...formData, heroMediaId: id as string })
              }
              multiple={false}
            />
          </div>
          <div className="p-6 border-2 border-dashed border-gray-100 flex flex-col gap-4 bg-gray-50/30">
            <Checkbox
              label="Hero is Video"
              checked={formData.heroIsVideo}
              onChange={(v: boolean) => setFormData({ ...formData, heroIsVideo: v })}
            />
            <Checkbox
              label="Latest Launch"
              checked={formData.isLatestLaunch}
              onChange={(v: boolean) => setFormData({ ...formData, isLatestLaunch: v })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
          <TextAreaGroup
            label="Description (EN)"
            value={formData.descEn}
            onChange={(v: string) => setFormData({ ...formData, descEn: v })}
          />
          <TextAreaGroup
            label="الوصف (AR)"
            value={formData.descAr}
            onChange={(v: string) => setFormData({ ...formData, descAr: v })}
            dir="rtl"
          />
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-50">
          <h3 className="text-xs font-bold text-danube-gold uppercase tracking-[3px]">
            Property Specs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {(Object.keys(formData.specs) as Array<keyof typeof formData.specs>).map(
              (key) => (
                <div key={key} className="space-y-2">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    className="w-full bg-gray-50 border-b border-gray-200 p-3 text-xs font-medium focus:bg-white focus:border-danube-gold outline-none"
                    value={formData.specs[key]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      updateSpec(key, e.target.value)
                    }
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLocation({ formData, setFormData }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const addPoint = () => {
    setFormData((prev) => ({
      ...prev,
      areaReasons: [...prev.areaReasons, { icon: "", textEn: "", textAr: "" }],
    }));
  };

  const removePoint = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      areaReasons: prev.areaReasons.filter((_, i: number) => i !== indexToRemove),
    }));
  };

  const updatePoint = (idx: number, field: "icon" | "textEn" | "textAr", value: string) => {
    const updated = [...formData.areaReasons];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, areaReasons: updated }));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <span className="bg-danube-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            02
          </span>
          <h2 className="text-lg font-primary text-danube-navy uppercase tracking-tighter">
            Location & Map
          </h2>
        </div>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      <div
        className={`${
          isOpen ? "max-h-[3000px] opacity-100 p-8" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold text-danube-gold uppercase tracking-[3px]">
            Area Proximity
          </h3>
          <button
            type="button"
            onClick={addPoint}
            className="text-[10px] bg-black text-white px-4 py-2 uppercase font-medium"
          >
            + Add Landmark
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.areaReasons.map((item: AreaReason, idx: number) => (
            <div
              key={idx}
              className="relative p-6 border border-gray-100 bg-gray-50/50 rounded-sm space-y-4 group"
            >
              <button
                type="button"
                onClick={() => removePoint(idx)}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
              >
                <X size={16} />
              </button>

              <CloudinaryUpload
                label={`Landmark ${idx + 1}`}
                value={item.icon}
                onChange={(id: string | string[]) => updatePoint(idx, "icon", id as string)}
                multiple={false}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputGroup
                  mini
                  label="Text (EN)"
                  value={item.textEn}
                  onChange={(v: string) => updatePoint(idx, "textEn", v)}
                />
                <InputGroup
                  mini
                  label="النص (AR)"
                  value={item.textAr}
                  onChange={(v: string) => updatePoint(idx, "textAr", v)}
                  dir="rtl"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-10 border-t border-gray-100">
          <TextAreaGroup
            label="Google Map Iframe Code"
            value={formData.mapIframe}
            onChange={(v: string) => setFormData((prev) => ({ ...prev, mapIframe: v }))}
          />
        </div>
      </div>
    </div>
  );
}

function SectionRevealGallery({ formData, setFormData }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <span className="bg-danube-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            03
          </span>
          <h2 className="text-lg font-primary text-danube-navy uppercase tracking-tighter">
            Reveal Gallery (Max 10)
          </h2>
        </div>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      <div
        className={`${
          isOpen ? "max-h-[1500px] opacity-100 p-8" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 space-y-6`}
      >
        <CloudinaryUpload
          label="Showcase Images"
          value={formData.gallery4}
          multiple={true}
          onChange={(ids: string | string[]) => {
            // Ensure we handle the array response correctly for multiple upload
            const idArray = Array.isArray(ids) ? ids : [ids];
            setFormData((prev) => ({
              ...prev,
              gallery4: idArray.slice(0, 10),
            }));
          }}
        />
        
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: 10 }).map((_, i: number) => (
            <div
              key={i}
              className={`h-1 rounded-full ${
                i < formData.gallery4.length ? "bg-danube-gold" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionAmenitiesShowcase({ formData, setFormData }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      amenitiesShowcase: [
        ...prev.amenitiesShowcase,
        { titleEn: "", titleAr: "", imageId: "" },
      ],
    }));
  };

  const removeItem = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      amenitiesShowcase: prev.amenitiesShowcase.filter((_, i: number) => i !== indexToRemove),
    }));
  };

  const updateItem = (
    idx: number,
    field: keyof AmenityItem,
    value: string
  ) => {
    const updated = [...formData.amenitiesShowcase];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, amenitiesShowcase: updated }));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <span className="bg-danube-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            04
          </span>
          <h2 className="text-lg font-primary text-danube-navy uppercase tracking-tighter">
            Amenities Showcase
          </h2>
        </div>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      <div
        className={`${
          isOpen ? "max-h-[5000px] opacity-100 p-8" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 space-y-8`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-danube-gold uppercase">Luxury Features</h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 text-[10px] bg-danube-navy text-white px-4 py-2 uppercase font-medium transition-all"
          >
            <Plus size={14} /> Add Showcase
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formData.amenitiesShowcase.map((item: AmenityItem, idx: number) => (
            <div
              key={idx}
              className="relative p-6 border border-gray-200 rounded-sm bg-gray-50/30 space-y-6 group hover:border-danube-gold transition-colors"
            >
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 z-20"
              >
                <Trash2 size={18} />
              </button>

              <CloudinaryUpload
                label={`Showcase Image ${idx + 1}`}
                value={item.imageId}
                onChange={(id: string | string[]) => updateItem(idx, "imageId", id as string)}
                multiple={false}
              />

              <div className="grid grid-cols-1 gap-4">
                <InputGroup
                  mini
                  label="Title (EN)"
                  value={item.titleEn}
                  onChange={(v: string) => updateItem(idx, "titleEn", v)}
                />
                <InputGroup
                  mini
                  label="العنوان (AR)"
                  value={item.titleAr}
                  onChange={(v: string) => updateItem(idx, "titleAr", v)}
                  dir="rtl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionAmenitiesIcons({ formData, setFormData }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      amenitiesIcons: [
        ...prev.amenitiesIcons,
        { titleEn: "", titleAr: "", imageId: "" },
      ],
    }));
  };

  const removeItem = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      amenitiesIcons: prev.amenitiesIcons.filter((_, i: number) => i !== idx),
    }));
  };

  const updateItem = (idx: number, field: keyof AmenityItem, value: string) => {
    const updated = [...formData.amenitiesIcons];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, amenitiesIcons: updated }));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <span className="bg-danube-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            05
          </span>
          <h2 className="text-lg font-primary text-danube-navy uppercase tracking-tighter">
            Amenities Icon List
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            {formData.amenitiesIcons.length} Icons
          </span>
          <ChevronDownIcon isOpen={isOpen} />
        </div>
      </button>

      <div
        className={`${
          isOpen ? "max-h-[8000px] opacity-100 p-8" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 space-y-6`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-danube-gold uppercase tracking-[3px]">
            Icon Repository
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 text-[10px] bg-black text-white px-4 py-2 uppercase font-medium"
          >
            <Plus size={14} /> Add Icon
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {formData.amenitiesIcons.map((item: AmenityItem, idx: number) => (
            <div
              key={idx}
              className="flex p-4 border border-gray-100 bg-gray-50/30 rounded-md relative group hover:shadow-md transition-all"
            >
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
              <div className="flex gap-4 items-start w-full">
                <div className="w-24 shrink-0">
                  <CloudinaryUpload
                    label=""
                    value={item.imageId}
                    onChange={(id: string | string[]) =>
                      updateItem(idx, "imageId", id as string)
                    }
                    multiple={false}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    className="w-full border-b border-gray-200 bg-transparent py-1 text-xs font-medium focus:border-danube-gold outline-none"
                    placeholder="Title (EN)"
                    value={item.titleEn}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateItem(idx, "titleEn", e.target.value)
                    }
                  />
                  <input
                    dir="rtl"
                    className="w-full border-b border-gray-200 bg-transparent py-1 text-xs font-medium focus:border-danube-gold outline-none text-right"
                    placeholder="العنوان (AR)"
                    value={item.titleAr}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateItem(idx, "titleAr", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionMediaGallery({ formData, setFormData }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = (ids: string | string[]) => {
    const idArray = Array.isArray(ids) ? ids : [ids];
    setFormData((prev) => ({ 
      ...prev, 
      mediaGallery: idArray 
    }));
  };

  const removeItem = (idToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      mediaGallery: prev.mediaGallery.filter((id) => id !== idToRemove),
    }));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <span className="bg-danube-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            06
          </span>
          <h2 className="text-lg font-primary text-danube-navy uppercase tracking-tighter">
            Full Media Gallery
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            {formData.mediaGallery.length} Assets
          </span>
          <ChevronDownIcon isOpen={isOpen} />
        </div>
      </button>

      <div
        className={`${
          isOpen ? "max-h-[3000px] opacity-100 p-8" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 space-y-6`}
      >
        <div className="bg-[#fdfbf7] border border-danube-gold/20 p-8 rounded-sm text-center">
          <CloudinaryUpload
            label="Bulk Upload Media"
            value={formData.mediaGallery}
            multiple={true}
            onChange={handleUpload}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {formData.mediaGallery.map((id: string, idx: number) => (
            <div
              key={`${id}-${idx}`}
              className="relative aspect-video bg-gray-100 rounded-sm overflow-hidden group border border-gray-100 shadow-sm"
            >
              {/* Next.js Optimized Image */}
              <Image
                src={`https://res.cloudinary.com/dwjtnaell/image/upload/c_thumb,w_300,g_auto/${id}`}
                alt={`Gallery item ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                unoptimized // Since we are already using Cloudinary transformations in the URL
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeItem(id)}
                  className="relative z-10 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionFAQs({ formData, setFormData }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { qEn: "", aEn: "", qAr: "", aAr: "" }],
    }));
  };

  const removeItem = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i: number) => i !== idx),
    }));
  };

  const updateItem = (idx: number, field: keyof FAQItem, value: string) => {
    const updated = [...formData.faqs];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, faqs: updated }));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <span className="bg-danube-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            07
          </span>
          <h2 className="text-lg font-primary text-danube-navy uppercase tracking-tighter">
            Project FAQs
          </h2>
        </div>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      <div
        className={`${
          isOpen ? "max-h-[5000px] opacity-100 p-8" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 space-y-8`}
      >
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h3 className="text-xs font-bold text-danube-gold uppercase">Q&A Management</h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 text-[10px] bg-black text-white px-4 py-2 uppercase font-medium"
          >
            <Plus size={14} /> Add FAQ
          </button>
        </div>

        {formData.faqs.map((faq: FAQItem, idx: number) => (
          <div
            key={idx}
            className="p-6 border border-gray-200 rounded-sm bg-gray-50/30 relative group"
          >
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <InputGroup
                  mini
                  label="Question (EN)"
                  value={faq.qEn}
                  onChange={(v: string) => updateItem(idx, "qEn", v)}
                />
                <TextAreaGroup
                  mini
                  label="Answer (EN)"
                  value={faq.aEn}
                  onChange={(v: string) => updateItem(idx, "aEn", v)}
                />
              </div>
              <div className="space-y-4">
                <InputGroup
                  mini
                  label="السؤال (AR)"
                  value={faq.qAr}
                  onChange={(v: string) => updateItem(idx, "qAr", v)}
                  dir="rtl"
                />
                <TextAreaGroup
                  mini
                  label="الإجابة (AR)"
                  value={faq.aAr}
                  onChange={(v: string) => updateItem(idx, "aAr", v)}
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- SHARED UI HELPERS ---

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  mini?: boolean;
  dir?: "ltr" | "rtl";
}

const InputGroup = ({ 
  label, 
  value, 
  onChange, 
  disabled = false, 
  mini = false, 
  dir = "ltr" 
}: InputGroupProps) => (
  <div className="space-y-2 flex-1">
    <label className={`${mini ? 'text-[9px]' : 'text-[10px]'} font-bold text-danube-navy/60 uppercase tracking-widest block ${dir === 'rtl' ? 'text-right' : ''}`}>
      {label}
    </label>
    <input 
      disabled={disabled} 
      value={value} 
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
      dir={dir}
      className={`w-full border-b-2 border-gray-200 p-3 ${mini ? 'text-xs' : 'text-sm'} font-medium text-danube-navy focus:border-danube-gold outline-none transition-all bg-gray-50 hover:bg-gray-100 disabled:opacity-50 ${dir === 'rtl' ? 'text-right' : ''}`} 
    />
  </div>
);

interface TextAreaGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  dir?: "ltr" | "rtl";
  mini?: boolean;
}

const TextAreaGroup = ({ 
  label, 
  value, 
  onChange, 
  dir = "ltr", 
  mini = false 
}: TextAreaGroupProps) => (
  <div className="space-y-2 flex-1">
    <label className={`${mini ? 'text-[9px]' : 'text-[10px]'} font-bold text-danube-navy/60 uppercase tracking-widest block ${dir === 'rtl' ? 'text-right' : ''}`}>
      {label}
    </label>
    <textarea 
      rows={mini ? 3 : 5} 
      value={value} 
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)} 
      dir={dir}
      className={`w-full border border-gray-200 p-4 ${mini ? 'text-xs' : 'text-sm'} font-medium text-danube-navy focus:ring-2 focus:ring-danube-gold/20 focus:border-danube-gold outline-none rounded-sm bg-gray-50 hover:bg-gray-100 transition-all ${dir === 'rtl' ? 'text-right' : ''}`} 
    />
  </div>
);

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input 
      type="checkbox" 
      checked={checked} 
      className="w-5 h-5 accent-danube-navy" 
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)} 
    />
    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">
      {label}
    </span>
  </label>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </span>
);