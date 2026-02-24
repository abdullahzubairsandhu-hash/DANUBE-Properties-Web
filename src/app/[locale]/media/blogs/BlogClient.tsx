// src/app/[locale]/media/blog/BlogClient.tsx

"use client";

import React, { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";
import BlogModal, { IBlog } from "@/components/admin/BlogModal";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";
import { useAdmin } from "@/context/AdminContext";

export default function BlogClient({ locale }: { locale: string }) {
  const { isAdmin } = useAdmin();
  const isEn = locale === 'en';
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async (formData: IBlog) => {
    try {
      const isUpdate = !!formData._id;
      const res = await fetch('/api/admin/blog', {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchBlogs();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[#BDA588]" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-white pt-20">
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <CldImage src="skyline_company-profile_tgvoja" alt="Blogs" fill className="object-cover" priority />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-20 flex flex-col items-center text-center">
          <h1 className="font-primary text-[#BDA588] text-[45px] md:text-[65px] lg:text-[80px] uppercase tracking-tight leading-tight">
            {isEn ? "Blogs" : "المدونات"}
          </h1>
          <div className="w-24 h-1.5 bg-[#BDA588] mt-4 mb-8"></div>
          
          <ClientOnlyAdmin>
            {isAdmin && (
              <button 
                onClick={() => { setEditingBlog(null); setIsModalOpen(true); }}
                className="mt-8 flex items-center gap-2 bg-[#BDA588] text-white px-6 py-3 rounded-full hover:bg-black transition-all shadow-lg"
              >
                <Plus size={16} /> Add Blog Post
              </button>
            )}
          </ClientOnlyAdmin>
        </div>

        <div className="flex flex-col gap-12">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 pb-12 group">
              <div className="w-full md:w-1/3 relative aspect-video md:aspect-square lg:aspect-video rounded-sm overflow-hidden shadow-lg">
                <CldImage src={blog.thumbnail} alt="thumbnail" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="w-full md:w-2/3 flex flex-col">
                <div className="flex gap-4 items-center mb-3">
                  <span suppressHydrationWarning className="font-secondary text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                    {new Date(blog.publishedAt).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <h2 className="font-secondary text-black text-lg md:text-xl font-medium mb-4 leading-snug hover:text-[#BDA588] transition-colors line-clamp-2">
                    <Link href={`/${locale}/media/blogs/${blog.slug}`}>
                      {blog.title[isEn ? 'en' : 'ar']}
                    </Link>
                  </h2>
                  <ClientOnlyAdmin>
                    {isAdmin && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingBlog(blog); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-gray-100 rounded-full transition-colors"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(blog._id!)} className="p-2 text-red-600 hover:bg-gray-100 rounded-full transition-colors"><Trash2 size={16}/></button>
                  </div>
                    )}
                    </ClientOnlyAdmin>
                </div>

                <p className="font-secondary text-gray-600 text-sm md:text-base mb-6 font-medium line-clamp-2">
                  {blog.excerpt[isEn ? 'en' : 'ar']}
                </p>

                <Link href={`/${locale}/media/blogs/${blog.slug}`} className="bg-[#BDA588] text-white px-8 py-3 w-fit uppercase font-secondary tracking-widest text-xs hover:bg-black transition-colors duration-300 shadow-md">
                  {isEn ? "Read More" : "اقرأ المزيد"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} initialData={editingBlog} />
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}