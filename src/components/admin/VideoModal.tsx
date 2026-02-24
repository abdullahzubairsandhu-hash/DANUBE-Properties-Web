// src/components/admin/VideoModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

export interface IVideo {
  _id?: string;
  title: { en: string; ar: string };
  youtubeUrl: string;
  embedUrl: string;
  thumbnail: string;
  order: number;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingVideo: IVideo | null;
}

export default function VideoModal({ isOpen, onClose, onSuccess, editingVideo }: VideoModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IVideo>({
    title: { en: "", ar: "" },
    youtubeUrl: "",
    embedUrl: "",
    thumbnail: "",
    order: 0,
  });

  useEffect(() => {
    if (editingVideo) setFormData(editingVideo);
    else setFormData({ title: { en: "", ar: "" }, youtubeUrl: "", embedUrl: "", thumbnail: "", order: 0 });
  }, [editingVideo, isOpen]);

  const updateYoutubeLinks = (url: string) => {
    let embed = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      embed = `https://www.youtube.com/embed/${match[2]}`;
    }
    setFormData(prev => ({ ...prev, youtubeUrl: url, embedUrl: embed }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingVideo ? "PUT" : "POST";
      const res = await fetch("/api/admin/video", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error saving video:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {editingVideo ? "Edit Video Details" : "Add New Video"}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Title (EN)</label>
              <input 
                required 
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#BDA588] focus:border-transparent outline-none transition-all text-gray-900 font-medium" 
                value={formData.title.en} 
                onChange={e => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })} 
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Title (AR)</label>
              <input 
                required 
                dir="rtl"
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#BDA588] focus:border-transparent outline-none transition-all text-gray-900 font-medium" 
                value={formData.title.ar} 
                onChange={e => setFormData({ ...formData, title: { ...formData.title, ar: e.target.value } })} 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">YouTube URL</label>
            <input 
              required 
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#BDA588] focus:border-transparent outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
              value={formData.youtubeUrl} 
              onChange={e => updateYoutubeLinks(e.target.value)} 
            />
            {formData.embedUrl && (
              <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-tighter">✓ Embed URL generated automatically</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Cloudinary Thumbnail ID</label>
            <input 
              required 
              className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#BDA588] focus:border-transparent outline-none transition-all text-gray-900 font-medium" 
              value={formData.thumbnail} 
              onChange={e => setFormData({ ...formData, thumbnail: e.target.value })} 
            />
          </div>

          <div className="pt-4">
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-[#BDA588] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-black transition-all duration-300 shadow-lg disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                editingVideo ? "SAVE CHANGES" : "PUBLISH VIDEO"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}