// src/components/admin/AdminGalleryManager.tsx

"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Loader2, Images, X, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CloudinaryResult {
  info?: {
    public_id: string;
  };
}

export default function AdminGalleryManager({ 
  projectId, 
  currentImages 
}: { 
  projectId: string; 
  currentImages: string[]; 
}) {
  const { isAdmin, editMode } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  if (!isAdmin || !editMode) return null;

  const updateGallery = async (action: "add" | "delete", value: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/projects/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          field: action === "delete" ? "gallery4_delete" : "gallery4",
          value
        }),
      });
      if (res.ok) router.refresh();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="flex justify-center my-8">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-danube-gold text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all"
        >
          <Images size={20} />
          <span className="font-medium uppercase tracking-widest text-sm">Manage Scroll Gallery</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-black uppercase text-danube-navy">Gallery Layers</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Live Scroll Stack: {currentImages.length} items</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X /></button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentImages.map((img, idx) => (
                <div key={`${img}-${idx}`} className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden group shadow-md border border-gray-100">
                  <CldImage src={img} alt="Layer" fill className="object-cover" />
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">Layer {idx + 1}</div>
                  <button 
                    onClick={() => updateGallery("delete", img)}
                    disabled={isUpdating}
                    className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2"
                  >
                    <Trash2 size={24} />
                    <span className="text-[10px] font-bold uppercase">Remove</span>
                  </button>
                </div>
              ))}
              
              {/* UNLIMITED ADD BUTTON */}
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(res: unknown) => {
                  const result = res as CloudinaryResult;
                  if (result.info?.public_id) updateGallery("add", result.info.public_id);
                }}
              >
                {({ open }) => (
                  <button 
                    onClick={() => open?.()}
                    disabled={isUpdating}
                    className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-danube-gold hover:text-danube-gold hover:bg-danube-gold/5 transition-all"
                  >
                    <Plus size={32} />
                    <span className="text-xs mt-3 font-black uppercase tracking-widest">Add Layer</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>

            {isUpdating && (
              <div className="p-4 bg-danube-gold text-white flex items-center justify-center gap-3 animate-pulse">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Syncing Stack...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}