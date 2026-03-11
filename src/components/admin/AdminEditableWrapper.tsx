// src/components/admin/AdminEditableWrapper.tsx

"use client";
import { useState, useEffect } from "react";
import { Check, X, Edit3 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface Props {
  projectId: string;
  field: string;
  initialValue: string;
  children: React.ReactNode;
  type?: "text" | "textarea";
}

export default function AdminEditableWrapper({ projectId, field, initialValue, children, type = "textarea" }: Props) {
  const { isAdmin, editMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setValue(initialValue); }, [initialValue]);

  if (!isAdmin) return <>{children}</>;

  const handleSave = async () => {
    if (value === initialValue) { setIsEditing(false); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/projects/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, field, value }),
      });
      if (res.ok) {
        setIsEditing(false);
        window.location.reload();
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className={`relative transition-all duration-300 rounded-xl
      ${editMode ? "ring-2 ring-danube-gold/40 bg-danube-gold/5 p-4 m-[-1rem]" : "p-0"}
    `}>
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full min-w-[300px] z-[100] bg-white p-4 shadow-2xl rounded-lg border-2 border-danube-gold">
          {type === "textarea" ? (
            <textarea 
              className="w-full p-3 text-black font-medium border border-gray-200 focus:border-danube-gold outline-none text-sm leading-relaxed rounded" 
              value={value} onChange={(e) => setValue(e.target.value)} rows={6} autoFocus
            />
          ) : (
            <input 
              className="w-full p-3 text-black font-medium border border-gray-200 focus:border-danube-gold outline-none text-sm rounded" 
              value={value} onChange={(e) => setValue(e.target.value)} autoFocus
            />
          )}
          <div className="flex gap-2 justify-end mt-2">
            <button onClick={handleSave} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition-colors">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <Check size={18}/>}
            </button>
            <button onClick={() => { setIsEditing(false); setValue(initialValue); }} className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-colors">
              <X size={18}/>
            </button>
          </div>
        </div>
      ) : (
        <>
          {children}
          {/* ICON LOGIC: ONLY shows if editMode is TRUE */}
          {editMode && (
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-2 bg-danube-gold text-black p-2 rounded-full shadow-xl z-[60] hover:scale-110 active:scale-95 transition-transform border-2 border-white"
            >
              <Edit3 size={16} strokeWidth={2.5} />
            </button>
          )}
        </>
      )}
    </div>
  );
}