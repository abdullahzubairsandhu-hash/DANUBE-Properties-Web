// src/components/admin/MilestoneModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import Script from "next/script";

// Define the interface to kill the 'any' errors
export interface IJourney {
  _id?: string;
  year: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string | null;
  type: 'milestone' | 'project';
  order: number;
}

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IJourney) => Promise<void>;
  initialData?: IJourney | null;
}

export default function MilestoneModal({ isOpen, onClose, onSave, initialData }: MilestoneModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IJourney>({
    year: "",
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    image: null,
    type: "project",
    order: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        year: "",
        title: { en: "", ar: "" },
        description: { en: "", ar: "" },
        image: null,
        type: "project",
        order: 0
      });
    }
  }, [initialData, isOpen]);

  const handleUpload = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cloudWin = window as any;
    if (!cloudWin.cloudinary) return;

    const widget = cloudWin.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url"],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1.33,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: Error | null, result: any) => {
        if (!error && result && result.event === "success") {
          setFormData(prev => ({ ...prev, image: result.info.public_id }));
        }
      }
    );
    widget.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="afterInteractive" />
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-primary text-2xl text-danube-gold uppercase">
            {initialData ? "Edit Journey Entry" : "Add New Milestone"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold uppercase mb-2">Year</label>
              <input 
                type="text" required value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 ring-danube-gold outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase mb-2">Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as 'milestone' | 'project'})}
                className="w-full p-3 border rounded-lg outline-none font-medium"
              >
                <option value="project">Project (Polaroid)</option>
                <option value="milestone">Milestone (Text Box)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold border-b pb-1 text-danube-gold">English Content</h3>
            <input 
              placeholder="Title (EN)" required value={formData.title.en}
              onChange={(e) => setFormData({...formData, title: {...formData.title, en: e.target.value}})}
              className="w-full p-3 border rounded-lg font-medium"
            />
            <textarea 
              placeholder="Description (EN)" rows={3} value={formData.description.en}
              onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
              className="w-full p-3 border rounded-lg font-medium"
            />
          </div>

          <div className="space-y-4" dir="rtl">
            <h3 className="font-bold border-b pb-1 text-danube-gold text-right">المحتوى العربي</h3>
            <input 
              placeholder="العنوان" required value={formData.title.ar}
              onChange={(e) => setFormData({...formData, title: {...formData.title, ar: e.target.value}})}
              className="w-full p-3 border rounded-lg font-secondary font-medium"
            />
            <textarea 
              placeholder="الوصف" rows={3} value={formData.description.ar}
              onChange={(e) => setFormData({...formData, description: {...formData.description, ar: e.target.value}})}
              className="w-full p-3 border rounded-lg font-secondary font-medium"
            />
          </div>

          <div className="pt-4 border-t">
            <button 
              type="button" onClick={handleUpload}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-danube-gold hover:bg-gray-50 transition-all flex flex-col items-center gap-2"
            >
              {formData.image ? (
                <span className="text-green-600 font-bold">Image Selected: {formData.image}</span>
              ) : (
                <>
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-sm uppercase font-bold text-gray-500">Upload Project Image</span>
                </>
              )}
            </button>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-danube-gold text-black py-4 rounded-xl font-bold uppercase hover:bg-black hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : (initialData ? "Update Entry" : "Save Milestone")}
          </button>
        </form>
      </div>
    </div>
  );
}