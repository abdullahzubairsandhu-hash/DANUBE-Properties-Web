// src/context/AdminContext.tsx

"use client";

import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  toggleAdmin: (pass: string) => boolean;
  logout: () => void;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // 1. Admin Status (LocalStorage - Persists indefinitely)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('danube_admin_status') === 'authenticated';
    }
    return false;
  });

  // 2. Edit Mode (SessionStorage - Persists on refresh, clears when tab closes)
  const [editMode, setEditMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('danube_edit_mode') === 'true';
    }
    return false;
  });

  // Wrapper function to sync state with storage
  const handleSetEditMode = (val: boolean) => {
    setEditMode(val);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('danube_edit_mode', val.toString());
    }
  };

  const toggleAdmin = (pass: string) => {
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
      sessionStorage.removeItem('danube_edit_mode'); // Clean up edit mode too
    }
    window.location.href = '/'; 
  };

  return (
    <AdminContext.Provider 
      value={{ 
        isAdmin, 
        toggleAdmin, 
        logout, 
        editMode, 
        setEditMode: handleSetEditMode 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};