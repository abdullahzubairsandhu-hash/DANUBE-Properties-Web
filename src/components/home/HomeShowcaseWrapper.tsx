// src/components/home/HomeShowcaseWrapper.tsx

"use client";

import { useState } from "react";
import PropertyShowcase from "./PropertyShowcase";
import FeaturedProjects from "./FeaturedProjects";

interface HomeItem {
    _id: string;
    publicId: string;
    slug: string;
  }

interface HomeShowcaseWrapperProps {
  locale: string;
  gallery: string[];
  projectSlug: string;
  featuredItems: HomeItem[];
}

export default function HomeShowcaseWrapper({ 
  locale, 
  gallery, 
  projectSlug, 
  featuredItems 
}: HomeShowcaseWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PropertyShowcase 
        locale={locale} 
        images={gallery} 
        slug={projectSlug} 
        onAdminClick={() => setIsModalOpen(true)} // This triggers the modal
      />
      <FeaturedProjects 
        locale={locale} 
        initialData={featuredItems} 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
      />
    </>
  );
}