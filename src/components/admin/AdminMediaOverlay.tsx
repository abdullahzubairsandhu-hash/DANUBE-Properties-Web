// src/components/admin/AdminMediaOverlay.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { CldUploadWidget } from "next-cloudinary";
import { Loader2, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CloudinaryResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string;
  };
}

interface AdminMediaOverlayProps {
  projectId: string;
  field: string; 
  label?: string;
  variant?: "corner" | "center" | "bar";
}

export default function AdminMediaOverlay({ 
  projectId, 
  field, 
  label = "Edit Media",
  variant = "corner" 
}: AdminMediaOverlayProps) {
  const { isAdmin, editMode } = useAdmin();
  const [isUpdating, setIsUpdating] = useState(false);
  const [shouldShow, setShouldShow] = useState(false); // Surgical visibility control
  const router = useRouter();

  // 1. Post-Hydration Sync: Only decide to show the button after mounting
  // This kills the 'Server/Client HTML mismatch' error for good.
  useEffect(() => {
    if (isAdmin && editMode) {
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  }, [isAdmin, editMode]);

  if (!shouldShow) return null;

  const handleUploadSuccess = async (result: unknown) => {
    // 2. Strict validation of the incoming prop
    if (!projectId || projectId === "undefined" || projectId === "") {
      alert("Error: Missing Project Context. Please refresh the page.");
      console.error("Missing Project ID at handleUploadSuccess. Field:", field);
      return;
    }

    if (
      typeof result === "object" && 
      result !== null && 
      "info" in result && 
      typeof (result as CloudinaryResult).info === "object"
    ) {
      const uploadResult = result as CloudinaryResult;
      const newId = uploadResult.info.public_id;
      
      setIsUpdating(true);

      try {
        const res = await fetch("/api/projects/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, field, value: newId }),
        });

        if (res.ok) {
          // Force Next.js to pull the new data
          router.refresh();
        } else {
          const errorData = await res.json();
          console.error("Update failed:", errorData.error);
        }
      } catch (error) {
        console.error("Failed to update media:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const styles = {
    corner: "absolute top-32 right-12 z-[70]", 
    center: "absolute inset-0 flex items-center justify-center z-[70] bg-black/40 opacity-0 hover:opacity-100 transition-opacity",
    bar: "absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md z-[70] flex justify-center"
  };

  return (
    <div className={styles[variant]}>
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
        options={{
          maxFiles: 1,
          resourceType: "auto",
          styles: {
            palette: {
              window: "#0B1221",
              sourceBg: "#0B1221",
              windowBorder: "#C19C5C",
              tabIcon: "#C19C5C",
              inactiveTabIcon: "#FFFFFF",
              menuIcons: "#C19C5C",
              link: "#C19C5C",
              action: "#C19C5C",
              inProgress: "#C19C5C",
              complete: "#20B832",
              error: "#FF4646",
              textDark: "#000000",
              textLight: "#FFFFFF"
            }
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); 
              open();
            }}
            disabled={isUpdating}
            className="flex items-center gap-3 bg-white hover:bg-danube-gold hover:text-white text-black px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all active:scale-95 group border border-white/20"
          >
            {isUpdating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            )}
            <span className="text-[13px] uppercase tracking-[0.1em] font-medium">
              {isUpdating ? "Processing..." : label}
            </span>
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}