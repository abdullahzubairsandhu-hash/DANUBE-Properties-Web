// src/components/admin/AdminSectionWrapper.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Edit2, Check, X, Loader2 } from "lucide-react";

interface AdminSectionWrapperProps {
  children: React.ReactNode;
  contentKey: string;
  currentValue: string;
  onSave: (newValue: string) => Promise<void>;
}

export default function AdminSectionWrapper({ children, currentValue, onSave }: AdminSectionWrapperProps) {
  const { isAdmin } = useAdmin();
  const [hasMounted, setHasMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(currentValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setValue(currentValue);
  }, [currentValue]);

  // STEP 1: If not mounted, return ONLY children (Server HTML)
  if (!hasMounted) {
    return <>{children}</>;
  }

  // STEP 2: Only after mounting, check if user is Admin.
  // If not admin, return ONLY children.
  if (!isAdmin) {
    return <>{children}</>;
  }

  // STEP 3: If mounted AND admin, show the wrapper div
  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(value);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group border-2 border-transparent hover:border-danube-gold/30 transition-all duration-300 p-2 -m-2 rounded-lg">
      {isEditing ? (
        <div className="space-y-3 w-full">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 border border-danube-gold rounded bg-white text-black font-secondary font-medium"
            rows={4}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-danube-gold text-black px-4 py-1 rounded flex items-center gap-2 text-sm font-bold"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              SAVE
            </button>
            <button
              onClick={() => { setIsEditing(false); setValue(currentValue); }}
              className="bg-gray-200 text-black px-4 py-1 rounded flex items-center gap-2 text-sm font-bold"
            >
              <X size={14} /> CANCEL
            </button>
          </div>
        </div>
      ) : (
        <>
          {children}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 bg-danube-gold text-black p-1.5 rounded-full shadow-lg transition-opacity z-10"
          >
            <Edit2 size={14} />
          </button>
        </>
      )}
    </div>
  );
}