// src/components/admin/CloudinaryUpload.tsx

'use client';

import React from 'react';
import { Upload, X } from 'lucide-react';
import Script from 'next/script';
import Image from 'next/image';

interface CloudinaryResultInfo {
  public_id: string;
  secure_url: string;
  [key: string]: unknown;
}

interface CloudinaryEvent {
  event: string;
  info: CloudinaryResultInfo;
}

// Fixed line 33: Explicitly defining the createUploadWidget signature
type CreateUploadWidget = (
  options: Record<string, unknown>,
  callback: (error: Error | null, result: CloudinaryEvent) => void
) => { open: () => void };

interface CloudinaryUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  label: string;
}

export default function CloudinaryUpload({ value, onChange, multiple = false, label }: CloudinaryUploadProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleUpload = () => {
    // Cast window to include the typed Cloudinary function
    const cloudWin = window as typeof window & { 
      cloudinary: { createUploadWidget: CreateUploadWidget } 
    };
    if (!cloudWin.cloudinary) return;

    const widget = cloudWin.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url"],
        multiple: multiple,
      },
      (error: Error | null, result: CloudinaryEvent) => {
        if (!error && result && result.event === "success") {
          if (multiple) {
            const currentArray = Array.isArray(value) ? value : [];
            onChange([...currentArray, result.info.public_id]);
          } else {
            onChange(result.info.public_id);
          }
        }
      }
    );
    widget.open();
  };

  const removeImage = (idToRemove: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter(id => id !== idToRemove));
    } else {
      onChange("");
    }
  };

  return (
    <div className="space-y-2">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="afterInteractive" />
      
      {/* Fixed: Removed font-bold to stop the conflict with font-medium */}
      <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-medium">
        {label}
      </label>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {multiple && Array.isArray(value) ? (
          value.map((id) => (
            <div key={id} className="relative w-20 h-20 bg-gray-100 rounded border group overflow-hidden">
              <Image 
                src={`https://res.cloudinary.com/${cloudName}/image/upload/c_thumb,w_200,g_face/${id}`} 
                alt="Gallery Preview"
                fill
                className="object-cover"
              />
              <button 
                type="button"
                onClick={() => removeImage(id)} 
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <X size={12}/>
              </button>
            </div>
          ))
        ) : value && !Array.isArray(value) && (
          <div className="relative w-32 h-20 bg-gray-100 rounded border group overflow-hidden">
             <Image 
               src={`https://res.cloudinary.com/${cloudName}/image/upload/c_thumb,w_400,g_face/${value}`} 
               alt="Hero Preview"
               fill
               className="object-cover"
             />
             <button 
                type="button"
                onClick={() => removeImage(value as string)} 
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-10"
              >
                <X size={12}/>
              </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleUpload}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded hover:border-danube-gold text-xs tracking-widest transition-all font-medium uppercase"
      >
        <Upload size={14} /> {multiple ? "ADD IMAGES" : "SELECT MEDIA"}
      </button>
    </div>
  );
}