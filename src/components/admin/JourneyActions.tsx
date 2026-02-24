// src/components/admin/JourneyActions.tsx

"use client";
import { Edit2, Trash2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface JourneyActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function JourneyActions({ onEdit, onDelete }: JourneyActionsProps) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-[30]">
      <button 
        onClick={(e) => { e.stopPropagation(); onEdit(); }}
        className="p-2 bg-white/90 hover:bg-danube-gold text-black rounded-full shadow-lg transition-colors"
      >
        <Edit2 size={16} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="p-2 bg-white/90 hover:bg-red-600 hover:text-white text-red-600 rounded-full shadow-lg transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}