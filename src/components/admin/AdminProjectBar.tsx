// src/components/admin/AdminProjectBar.tsx

"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Grid, Edit3, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

interface ProjectSummary {
  _id: string;
  title: string;
  slug: string;
  status: string;
}

interface AdminProjectBarProps {
  initialStatus: string;
  slug: string;
  onStatusChange: (newStatus: string) => Promise<void>;
}

export default function AdminProjectBar({ 
  initialStatus, 
  slug, 
  onStatusChange 
}: AdminProjectBarProps) {
  const { isAdmin, editMode, setEditMode } = useAdmin();
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [allProjects, setAllProjects] = useState<ProjectSummary[]>([]);
  const [fetchingProjects, setFetchingProjects] = useState(false);

  const params = useParams();
  const locale = (params?.locale as string) || "en";

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  

  const handleOpenGallery = async () => {
    setShowGallery(true);
    setFetchingProjects(true);
    try {
      const res = await fetch('/api/admin/projects');
      const result = await res.json();
      // Added logging to see what the API is actually returning
      console.log("Inventory Fetch Result:", result);
      if (result.success) {
        setAllProjects(result.data || []);
      }
    } catch (error: unknown) {
      console.error("Failed to load inventory:", error);
    } finally {
      setFetchingProjects(false);
    }
  };

  const handleUpdate = async (val: string) => {
    if (val === status) return;
    setLoading(true);
    try {
      await onStatusChange(val);
      setStatus(val);
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : "Update failed");
      setStatus(initialStatus);
    } finally {
      setLoading(false);
    }
  };

  

  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${projectTitle}"? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/admin/projects?id=${projectId}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        setAllProjects(prev => prev.filter(p => p._id !== projectId));
      } else {
        alert(result.error || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-danube-navy/95 backdrop-blur-xl text-white py-4 px-8 flex items-center justify-between border-t border-danube-gold/30 z-[9999] shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center">
             <div className={`absolute w-3 h-3 rounded-full blur-sm ${loading ? 'bg-danube-gold' : 'bg-green-500'}`} />
             <div className={`relative w-2 h-2 rounded-full ${loading ? 'bg-danube-gold animate-pulse' : 'bg-green-500'}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-[0.3em] text-danube-gold/80 uppercase leading-none mb-1">Management Console</span>
            <span className="text-[12px] font-medium tracking-wider text-white uppercase italic">Active: <span className="font-bold not-italic">{slug}</span></span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <label className="text-[9px] font-bold text-white/40 uppercase tracking-tighter">Status:</label>
            <select value={status} onChange={(e) => handleUpdate(e.target.value)} disabled={loading} className="bg-transparent text-[11px] font-bold text-danube-gold outline-none cursor-pointer uppercase tracking-widest">
              <option value="latest" className="text-black">Latest Launch</option>
              <option value="ongoing" className="text-black">Ongoing</option>
              <option value="completed" className="text-black">Completed</option>
              <option value="hidden" className="text-black">Archive / Hidden</option>
            </select>
          </div>

          <div className="h-8 w-[1px] bg-white/10" />

          <div className="flex items-center gap-6">
            {/* NEW: SURGICAL EDIT TOGGLE */}
            <button 
              onClick={() => setEditMode(!editMode)} 
              className={`group flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] transition-all px-3 py-1 rounded-sm border ${
                editMode 
                  ? "bg-danube-gold text-black border-danube-gold" 
                  : "text-white border-white/20 hover:border-danube-gold"
              }`}
            >
              <Edit3 size={15} /> {editMode ? "FINISH EDITING" : "SURGICAL EDIT"}
            </button>
            <button onClick={handleOpenGallery} className="group flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] hover:text-danube-gold transition-all">
              <Grid size={15} className="text-white" /> ALL PROJECTS
            </button>
          </div>
          {loading && <RefreshCw size={14} className="animate-spin text-danube-gold ml-2" />}
        </div>
      </div>

      {/* GALLERY MODAL */}
      {showGallery && (
        <div className="fixed inset-0 z-[10000] bg-danube-navy/95 backdrop-blur-md p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-light text-white tracking-tighter uppercase">Project <span className="font-bold text-danube-gold">Inventory</span></h2>
              <button onClick={() => setShowGallery(false)} className="p-3 hover:bg-white/10 rounded-full transition-all">
                <X size={30} className="text-white" />
              </button>
            </div>

            {fetchingProjects ? (
              <div className="flex justify-center py-20"><RefreshCw className="animate-spin text-danube-gold" size={40} /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProjects.length === 0 && <p className="text-white/40 col-span-full text-center">No projects found in inventory.</p>}
                {allProjects.map((p) => (
                  <div key={p._id} className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-danube-gold/50 transition-all group flex flex-col justify-between min-h-[150px]">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-bold text-white uppercase truncate pr-2">{p.title}</h4>
                        <button 
                        onClick={() => handleDeleteProject(p._id, p.title)}
                        className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <X size={14} /> {/* Or use Trash2 from lucide-react */}
                          </button>
                          </div>
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{p.status}</p>
                          </div>
                          <Link 
                          href={`/${locale}/projects/${p.slug}`} 
                          onClick={() => setShowGallery(false)}
                          className="mt-4 text-[10px] font-bold text-danube-gold hover:text-white flex items-center gap-2 transition-colors"
                          >
                            <Edit3 size={12}/> OPEN PROJECT
                            </Link>
                        </div>
                  ))}
             </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}