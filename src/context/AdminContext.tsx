// src/context/AdminContext.tsx

"use client";

import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  toggleAdmin: (pass: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // Directly initialize from localStorage. 
  // Because we use ClientOnlyAdmin in our components, 
  // we don't need to worry about the server-side mismatch here.
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('danube_admin_status') === 'authenticated';
    }
    return false;
  });

  const toggleAdmin = (pass: string) => {
    // Current simple auth logic
    if (pass === "danube2026") { 
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('danube_admin_status', 'authenticated');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('danube_admin_status');
    }
    // Force reload to home to clear any admin-only state from memory
    window.location.href = '/'; 
  };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};