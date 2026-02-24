// src/components/admin/NewsModal.tsx

"use client";

import React, { useState } from 'react';
import { X, Plus, Trash2, Type, Image as ImageIcon, Upload } from 'lucide-react';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import ClientOnlyAdmin from './ClientOnlyAdmin';
import { CldImage } from 'next-cloudinary';

export interface INews {
  _id?: string;
  title: { en: string; ar: string };
  slug: string;
  thumbnail: string;
  excerpt: { en: string; ar: string };
  publishedAt: string;
  blocks: { 
    type: 'text' | 'image'; 
    value: string | { en: string; ar: string } 
  }[];
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: INews) => void;
  initialData?: INews | null;
}

function NewsModalContent({ isOpen, onClose, onSave, initialData }: NewsModalProps) {
  const [formData, setFormData] = useState<INews>(() => {
    if (initialData) {
      return {
        ...initialData,
        publishedAt: new Date(initialData.publishedAt).toISOString().split('T')[0]
      };
    }
    return {
      title: { en: '', ar: '' },
      slug: '',
      thumbnail: '',
      excerpt: { en: '', ar: '' },
      publishedAt: new Date().toISOString().split('T')[0],
      blocks: []
    };
  });

  const addBlock = (type: 'text' | 'image') => {
    const newValue = type === 'text' ? { en: '', ar: '' } : '';
    setFormData(prev => ({ 
      ...prev, 
      blocks: [...prev.blocks, { type, value: newValue }] 
    }));
  };

  const updateTextBlock = (index: number, lang: 'en' | 'ar', val: string) => {
    setFormData(prev => {
      const newBlocks = [...prev.blocks];
      const currentBlock = newBlocks[index];
      const currentValue = typeof currentBlock.value === 'object' ? currentBlock.value : { en: '', ar: '' };
      
      newBlocks[index] = {
        ...currentBlock,
        value: { ...currentValue, [lang]: val }
      };
      
      return { ...prev, blocks: newBlocks };
    });
  };

  const updateImageBlock = (index: number, val: string) => {
    setFormData(prev => {
      const newBlocks = [...prev.blocks];
      newBlocks[index] = { ...newBlocks[index], value: val };
      return { ...prev, blocks: newBlocks };
    });
  };

  if (!isOpen) return null;

  // Shared class for all text inputs/textareas to ensure high contrast
  const inputClasses = "p-3 border rounded-lg w-full outline-none font-medium bg-white text-black focus:ring-1 focus:ring-[#BDA588] placeholder:text-gray-400 border-gray-300";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl font-medium">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
            {initialData ? 'Edit News Entry' : 'Create News Entry'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black"><X /></button>
        </div>

        {/* FEATURED THUMBNAIL */}
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
           <label className="block text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">Featured Thumbnail</label>
           <div className="flex items-center gap-6">
              {formData.thumbnail && (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-300 shadow-sm bg-white">
                  <CldImage 
                    width="128"
                    height="80"
                    src={formData.thumbnail} 
                    className="object-cover w-full h-full" 
                    alt="Preview" 
                  />
                </div>
              )}
            
              <CldUploadWidget 
                uploadPreset="danube_unsigned" 
                onSuccess={(result: CloudinaryUploadWidgetResults) => {
                  if (result.info && typeof result.info !== 'string') {
                    setFormData({...formData, thumbnail: result.info.public_id});
                  }
                }}
              >
                {({ open }) => (
                  <button type="button" onClick={() => open()} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all text-sm font-bold shadow-sm text-black">
                    <Upload size={16} /> {formData.thumbnail ? 'Change Image' : 'Upload Thumbnail'}
                  </button>
                )}
              </CldUploadWidget>
           </div>
        </div>

        {/* TITLE & SLUG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Title (EN)</label>
            <input className={inputClasses} value={formData.title.en} onChange={(e) => {
              const enTitle = e.target.value;
              const newSlug = enTitle.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
              setFormData({...formData, title: { ...formData.title, en: enTitle }, slug: newSlug});
            }} />
          </div>
          <div dir="rtl">
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase text-right">العنوان (AR)</label>
            <input className={`${inputClasses} text-right`} value={formData.title.ar} onChange={(e) => setFormData({...formData, title: { ...formData.title, ar: e.target.value }})} />
          </div>
        </div>

        {/* DATE FIELD */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Publish Date</label>
          <input type="date" className={inputClasses} value={formData.publishedAt} onChange={(e) => setFormData({...formData, publishedAt: e.target.value})} />
        </div>

        {/* EXCERPTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Excerpt / Summary (EN)</label>
            <textarea className={inputClasses} rows={2} value={formData.excerpt.en} onChange={(e) => setFormData({...formData, excerpt: { ...formData.excerpt, en: e.target.value }})} />
          </div>
          <div dir="rtl">
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase text-right">المقتطف (AR)</label>
            <textarea className={`${inputClasses} text-right`} rows={2} value={formData.excerpt.ar} onChange={(e) => setFormData({...formData, excerpt: { ...formData.excerpt, ar: e.target.value }})} />
          </div>
        </div>

        {/* CONTENT BLOCKS */}
        <div className="space-y-6 mb-8">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Detailed Article Content</label>
          {formData.blocks.map((block, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative group">
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, blocks: prev.blocks.filter((_, i) => i !== idx) }))} className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"><Trash2 size={14}/></button>
              
              <div className="flex items-center gap-2 mb-4 text-[#BDA588] font-bold text-xs uppercase">
                {block.type === 'text' ? <><Type size={16}/> Paragraph Block</> : <><ImageIcon size={16}/> Additional Image</>}
              </div>

              {block.type === 'text' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea className={inputClasses} placeholder="English content..." rows={4} value={(block.value as {en: string, ar: string}).en} onChange={(e) => updateTextBlock(idx, 'en', e.target.value)} />
                  <textarea dir="rtl" className={`${inputClasses} text-right`} placeholder="المحتوى العربي..." rows={4} value={(block.value as {en: string, ar: string}).ar} onChange={(e) => updateTextBlock(idx, 'ar', e.target.value)} />
                </div>
              ) : (
                <div className="flex items-center gap-4">
                   <CldUploadWidget 
                    uploadPreset="danube_unsigned" 
                    onSuccess={(res: CloudinaryUploadWidgetResults) => {
                      if (res.info && typeof res.info !== 'string') {
                        updateImageBlock(idx, res.info.public_id);
                      }
                    }}
                   >
                     {({ open }) => (
                       <button type="button" onClick={() => open()} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-bold text-sm shadow-sm hover:bg-gray-50 transition-colors text-black">
                         <Upload size={14}/> {block.value ? 'Change Image' : 'Upload Image'}
                       </button>
                     )}
                   </CldUploadWidget>
                   {block.value && <span className="text-xs text-gray-700 font-bold truncate max-w-xs bg-gray-200 px-2 py-1 rounded border border-gray-300">ID: {block.value as string}</span>}
                </div>
              )}
            </div>
          ))}
          
          <div className="flex gap-4">
            <button type="button" onClick={() => addBlock('text')} className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-[#BDA588] transition-all text-xs font-bold uppercase tracking-widest"><Plus size={16}/> ADD PARAGRAPH</button>
            <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-2 px-6 py-3 bg-white border border-black rounded-lg hover:bg-gray-100 transition-all text-xs font-bold uppercase tracking-widest text-black"><Plus size={16}/> ADD IMAGE</button>
          </div>
        </div>

        <button onClick={() => onSave(formData)} className="w-full bg-[#BDA588] text-white py-4 rounded-lg font-bold hover:bg-black transition-all duration-300 shadow-xl uppercase tracking-widest">
          {initialData ? 'Save Changes' : 'Publish Article'}
        </button>
      </div>
    </div>
  );
}

export default function NewsModal(props: NewsModalProps) {
  return (
    <ClientOnlyAdmin>
      <NewsModalContent key={props.initialData?._id || 'new'} {...props} />
    </ClientOnlyAdmin>
  );
}