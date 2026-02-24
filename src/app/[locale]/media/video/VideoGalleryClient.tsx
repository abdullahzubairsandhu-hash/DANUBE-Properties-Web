// src/app/[locale]/media/video/VideoGalleryClient.tsx

"use client";

import React, { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { Play, X, Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";
import { useAdmin } from "@/context/AdminContext";
import VideoModal, { IVideo } from "@/components/admin/VideoModal";

export default function VideoGalleryClient({ locale }: { locale: string }) {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<IVideo | null>(null);
  
  const { isAdmin } = useAdmin();
  const isEn = locale === 'en';

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/admin/video");
      const data = await res.json();
      setVideos(data);
    } catch (e) {
      console.error("Failed to fetch videos", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/video?id=${id}`, { method: "DELETE" });
    fetchVideos();
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <CldImage src="skyline_company-profile_tgvoja" alt="Hero" fill className="object-cover" priority />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-20 flex flex-col items-center text-center">
          <h1 className="font-primary text-[#BDA588] text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Video Gallery" : "معرض الفيديو"}
          </h1>
          <div className="w-24 h-1.5 bg-[#BDA588] mt-4"></div>
          
          <ClientOnlyAdmin>
            {isAdmin && (
              <button 
                onClick={() => { setEditingVideo(null); setIsModalOpen(true); }}
                className="mt-8 flex items-center gap-2 bg-[#BDA588] text-white px-6 py-3 rounded-full hover:bg-black transition-all shadow-lg"
              >
                <Plus size={20} /> ADD NEW VIDEO
              </button>
            )}
          </ClientOnlyAdmin>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#BDA588]" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {videos.map((video) => (
              <div key={video._id} className="group relative">
                <div className="cursor-pointer" onClick={() => setSelectedVideo(video.embedUrl)}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <CldImage
                      src={video.thumbnail}
                      alt={video.title[isEn ? 'en' : 'ar']}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-125">
                        <Play className="text-[#BDA588] fill-[#BDA588] w-6 h-6 ml-1" />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-6 font-primary text-black text-[20px] md:text-[22px] uppercase text-center tracking-wide group-hover:text-[#BDA588] transition-colors font-medium">
                    {video.title[isEn ? 'en' : 'ar']}
                  </h3>
                </div>

                {/* ADMIN TOOLS */}
                <ClientOnlyAdmin>
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button onClick={() => { setEditingVideo(video); setIsModalOpen(true); }} className="p-2 bg-white rounded-full text-blue-600 shadow-md hover:bg-gray-100"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(video._id!)} className="p-2 bg-white rounded-full text-red-600 shadow-md hover:bg-gray-100"><Trash2 size={16}/></button>
                    </div>
                  )}
                </ClientOnlyAdmin>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* VIDEO MODAL POPUP */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedVideo(null)} />
          <div className="relative w-full max-w-6xl aspect-video z-10 bg-black shadow-2xl rounded-xl overflow-hidden">
            <button onClick={() => setSelectedVideo(null)} className="absolute -top-12 right-0 text-white flex items-center gap-2 hover:text-[#BDA588] transition-colors group">
              <span className="uppercase text-sm font-bold tracking-widest">{isEn ? 'Close' : 'إغلاق'}</span>
              <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <iframe width="100%" height="100%" src={`${selectedVideo}?autoplay=1`} title="Player" frameBorder="0" allowFullScreen className="w-full h-full"></iframe>
          </div>
        </div>
      )}

      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchVideos} 
        editingVideo={editingVideo} 
      />

      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}