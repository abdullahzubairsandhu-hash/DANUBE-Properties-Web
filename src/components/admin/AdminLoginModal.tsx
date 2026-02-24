// src/components/shared/AdminLoginModal.tsx

"use client";

import React, { useState } from 'react';
import { X, Lock, Mail } from 'lucide-react';
import { useAdmin } from "@/context/AdminContext";

export default function AdminLoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { toggleAdmin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default credentials check
    if (email === "admin@danube.com" && password === "danube2026") {
      toggleAdmin(password); // This sets the isAdmin state to true
      onClose();
      setError('');
    } else {
      setError('Invalid Admin Email or Password');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-gold/30 w-full max-w-md p-8 rounded-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
          <X size={20} />
        </button>
        
        <h2 className="text-gold text-xl font-secondary font-bold tracking-widest mb-6 uppercase text-center">Admin Authentication</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gold/50" size={18} />
            <input 
              type="email" 
              placeholder="Admin Email" 
              className="w-full bg-white/5 border border-white/10 p-3 pl-10 text-white font-medium outline-none focus:border-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gold/50" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-white/5 border border-white/10 p-3 pl-10 text-white font-medium outline-none focus:border-gold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          <button type="submit" className="w-full bg-gold text-black font-bold p-3 hover:bg-white transition-colors uppercase tracking-widest text-sm">
            Enter Portal
          </button>
        </form>
      </div>
    </div>
  );
}