// src/components/admin/AdminImageWrapper.tsx

"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ImageIcon, Loader2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import Script from "next/script";

// --- TYPE DEFINITIONS ---
interface CloudinaryResult {
  event: string;
  info: {
    public_id: string;
    [key: string]: unknown;
  };
}

interface CloudinaryWidget {
  open: () => void;
  close: () => void;
}

interface CloudinaryGlobal {
  createUploadWidget: (
    options: Record<string, unknown>,
    callback: (error: Error | null, result: CloudinaryResult) => void
  ) => CloudinaryWidget;
}

interface AdminImageWrapperProps {
  children: React.ReactNode;
  onSave: (newId: string) => Promise<void>;
}

export default function AdminImageWrapper({ children, onSave }: AdminImageWrapperProps) {
  const { isAdmin } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const openWidget = useCallback(() => {
    const cloudWin = window as Window & typeof globalThis & { cloudinary?: CloudinaryGlobal };
    
    // Safety check: ensure both script and env variables are ready
    if (!cloudWin.cloudinary || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error("Cloudinary widget not loaded or Cloud Name missing");
      return;
    }

    const widget = cloudWin.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, // FIXED: Now uses .env.local
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1.5,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          setIsUploading(true);
          try {
            // result.info.public_id is the unique string we save to MongoDB
            await onSave(result.info.public_id);
          } catch (err) {
            console.error("Failed to save image ID to database", err);
          } finally {
            setIsUploading(false);
            widget.close();
          }
        }
      }
    );
    widget.open();
  }, [onSave]);

  // THE FIX: If we aren't fully mounted OR not an admin, 
  // we return ONLY THE CHILDREN. No extra <div>.
  // This ensures the Server and Client match perfectly on the first pass.
  if (!hasMounted || !isAdmin) {
    return <>{children}</>;
  }

  // Once mounted AND admin is confirmed, we wrap it.
  return (
    <div className="relative group w-full">
      {children}
      
      <Script 
        src="https://upload-widget.cloudinary.com/global/all.js" 
        strategy="afterInteractive" 
      />
      
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 border-2 border-danube-gold/50 rounded-2xl">
        <button 
          type="button"
          disabled={isUploading}
          onClick={openWidget}
          className="bg-danube-gold text-black px-5 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-2xl hover:bg-white transition-colors disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ImageIcon size={18} />
          )}
          <span className="font-bold uppercase">
            {isUploading ? "Saving..." : "Change Image"}
          </span>
        </button>
      </div>
    </div>
  );
}