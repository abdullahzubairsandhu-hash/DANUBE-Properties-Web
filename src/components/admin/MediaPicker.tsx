// src/components/admin/MediaPicker.tsx

"use client";
import { useState } from "react";

interface MediaPickerProps {
  label: string;
  value: string | string[];
  onChange: (val: string | string[]) => void;
  multiple?: boolean;
}

export default function MediaPicker({ label, value, onChange, multiple = false }: MediaPickerProps) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'id' | 'upload'>('id');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedIds: string[] = [];

    try {
      // Process files one by one to ensure database/cloudinary sync
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        
        if (data.success) {
          uploadedIds.push(data.public_id);
        } else {
          console.error(`File ${i} failed:`, data.error);
        }
      }

      if (multiple) {
        const currentArray = Array.isArray(value) ? value : [];
        onChange([...currentArray, ...uploadedIds]);
      } else if (uploadedIds.length > 0) {
        onChange(uploadedIds[0]);
        setMode('id');
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Upload failed";
      console.error("MediaPicker Catch:", msg);
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idToRemove: string) => {
    if (Array.isArray(value)) {
      onChange(value.filter(id => id !== idToRemove));
    }
  };

  return (
    <div className="border p-4 rounded bg-gray-50 space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold uppercase text-gray-700">{label}</label>
        <div className="flex gap-2 text-xs">
          <button 
            type="button" 
            onClick={() => setMode('id')}
            className={`px-3 py-1 transition-all ${mode === 'id' ? 'bg-danube-navy text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            EXISTING ID
          </button>
          <button 
            type="button" 
            onClick={() => setMode('upload')}
            className={`px-3 py-1 transition-all ${mode === 'upload' ? 'bg-danube-navy text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            UPLOAD NEW
          </button>
        </div>
      </div>

      {mode === 'id' ? (
        <div className="space-y-2">
          {multiple && Array.isArray(value) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {value.map((id) => (
                <div key={id} className="bg-danube-gold text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
                  {id}
                  <button type="button" onClick={() => removeImage(id)} className="font-bold hover:text-black">×</button>
                </div>
              ))}
            </div>
          )}
          <input 
            className="w-full border p-2 text-sm font-medium focus:ring-1 focus:ring-danube-gold outline-none"
            placeholder={multiple ? "Add ID and press enter (coming soon)" : "Cloudinary Public ID"}
            value={Array.isArray(value) ? "" : value}
            onChange={(e) => !multiple && onChange(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 bg-white rounded-md">
          <input 
            type="file" 
            multiple={multiple}
            accept="image/*,video/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-danube-gold file:text-white hover:file:bg-black cursor-pointer"
          />
          {uploading && (
            <div className="mt-3 flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-danube-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[11px] text-danube-navy font-bold animate-pulse uppercase">Uploading Assets...</p>
            </div>
          )}
        </div>
      )}
      
      {!multiple && typeof value === 'string' && value && (
        <div className="flex items-center gap-2 mt-2 p-2 bg-green-50 rounded">
          <span className="text-[10px] text-green-700 font-bold uppercase underline">Active:</span>
          <p className="text-[10px] text-green-600 font-mono truncate">{value}</p>
        </div>
      )}
    </div>
  );
}