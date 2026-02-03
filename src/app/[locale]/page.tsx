// src/app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import PropertyShowcase from "@/components/home/PropertyShowcase";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ContactSection from "@/components/shared/ContactSection";
import FounderSection from "@/components/home/FounderSection";
import BlogSection from "@/components/home/BlogSection";
import Footer from "@/components/shared/Footer";

// We make the Page function 'async' to handle Next.js 15 Promise-based params
export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  // Unwrapping the params promise
  const { locale } = await params;

  return (
    <main className="relative w-full overflow-x-hidden bg-white dark:bg-danube-navy">
      {/* 1. SHAHRUKHZ HERO (Video + Latest Launch Banner) */}
      <HeroSection locale={locale} />

      {/* 2. SHAHRUKHZ DEEP-DIVE (4 Full-screen Stacking Images) */}
      <PropertyShowcase locale={locale} />

      {/* 3. FEATURED PROPERTY PROJECTS (6 Full-screen Clickable Images) */}
      <FeaturedProjects locale={locale} />

      {/* 4. FOUNDER SECTION (Rizwan Sajan) */}
      <FounderSection locale={locale} />

      {/* 6. BLOG SECTION (4 News Cards) */}
      <BlogSection locale={locale} />

      {/* 5. GET IN TOUCH SECTION */}
      <ContactSection locale={locale} />

      {/* 7. FOOTER */}
      <Footer locale={locale} />
    </main>
  );
}