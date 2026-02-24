// src/components/admin/AdminProjectBar.tsx

"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Layout } from "lucide-react";

interface AdminProjectBarProps {
  initialStatus: string;
  slug: string;
  onStatusChange: (newStatus: string) => Promise<void>;
}

export default function AdminProjectBar({ initialStatus, slug, onStatusChange }: AdminProjectBarProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  // Sync state if the database/prop changes (Prevents the reset on refresh)
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleUpdate = async (val: string) => {
    if (val === status) return; // Don't trigger if no change
    
    setLoading(true);
    try {
      await onStatusChange(val);
      setStatus(val); // Optimistic UI update
    } catch (error: unknown) {
      console.error("Update failed, reverting status:", error );
      setStatus(initialStatus); // Revert on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-black/80 text-white py-4 px-6 flex items-center justify-between border-t border-danube-gold/50 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-danube-gold animate-pulse' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`} />
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
          PROJECT MANAGER — <span className="text-danube-gold">{slug}</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold opacity-50 uppercase tracking-widest">Move To:</label>
          <select 
            value={status}
            onChange={(e) => handleUpdate(e.target.value)}
            disabled={loading}
            className="bg-transparent border-b border-white/20 text-[11px] font-bold px-1 py-1 outline-none focus:border-danube-gold cursor-pointer transition-colors"
          >
            <option value="latest" className="text-black font-medium">LATEST LAUNCH</option>
            <option value="ongoing" className="text-black font-medium">ONGOING</option>
            <option value="completed" className="text-black font-medium">COMPLETED</option>
            <option value="hidden" className="text-black font-medium">HIDDEN</option>
          </select>
        </div>

        <button className="flex items-center gap-2 text-[11px] font-bold hover:text-danube-gold transition-colors tracking-widest">
          <Layout size={14} /> EDIT CONTENT
        </button>
        
        {loading && <RefreshCw size={14} className="animate-spin text-danube-gold" />}
      </div>
    </div>
  );
}