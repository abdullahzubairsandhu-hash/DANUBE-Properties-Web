// src/components/admin/ClientOnlyAdmin.tsx

"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// 1. Define the internal component
const ClientOnlyAdminComponent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// 2. Export it as a dynamic component with SSR disabled
// We use a named export and a default export to be safe
const ClientOnlyAdmin = dynamic(() => Promise.resolve(ClientOnlyAdminComponent), {
  ssr: false,
});

export default ClientOnlyAdmin;