// src/app/[locale]/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";
import { 
  ProjectHero, 
  SpecBox, 
  WhyArea, 
  RevealGallery, 
  AmenitiesSlider, 
  ImageGallery, 
  MapSection, 
  FAQSection 
} from "@/components/project/ProjectComponents";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

export default async function ProjectMasterPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { slug, locale } = await params;
  const isEn = locale === 'en';
  const project = PROJECTS_DATA[slug];

  if (!project) notFound();

  // Logic for Dynamic CTA (Requirement #4)
  // Extracts year from string like "Dec 2029"
  const completionYear = parseInt(project.specs.completion.match(/\d{4}/)?.[0] || "0");
  const isSoldOut = project.specs.price.toLowerCase() === "sold out";
  
  const ctaText = isEn 
    ? (completionYear > 2026 ? "VIRTUAL TOUR" : "BOOK ONLINE")
    : (completionYear > 2026 ? "جولة افتراضية" : "احجز عبر الإنترنت");

  return (
    <main className="bg-white overflow-x-hidden">
      {/* 1. HERO SECTION (Requirement #1: Removed pt-[110px] so it slides under Navbar) */}
      <ProjectHero 
        mediaId={project.heroMediaId} 
        isVideo={project.heroIsVideo} 
      />

      {/* 2 & 3. CENTERED TITLE & DESCRIPTION */}
      <section className="relative py-24 px-8 max-w-[1440px] mx-auto text-center">
  <div className="mb-16">
    <h1 className="font-primary text-[40px] lg:text-[60px] text-danube-gold uppercase leading-tight">
      {project.title}
    </h1>
    
    <div className="font-inter-light text-[17px] lg:text-[20px] text-gray-500 mt-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
      {isEn 
        ? project.descEn.replaceAll('. ', '.\n\n') 
        : project.descAr.replaceAll('. ', '.\n\n')
      }
    </div>
  </div>

  {/* SPECS GRID: The Pro Way (Option A) */}
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 bg-transparent">
    {Object.entries(project.specs).map(([key, value], i) => {
      // 1. Define the dictionary for translations
      const labels: Record<string, { en: string; ar: string }> = {
        price: { en: "Starting Price", ar: "السعر المبدئي" },
        completion: { en: "Completion", ar: "التسليم" },
        paymentPlan: { en: "Payment Plan", ar: "خطة الدفع" },
        apartments: { en: "Apartments", ar: "الشقق" },
        bedrooms: { en: "Bedrooms", ar: "غرف النوم" },
        commercial: { en: "Commercial Units", ar: "وحدات تجارية" },
        location: { en: "Location", ar: "الموقع" },
      };

      // 2. Get the translation based on the key, fallback to key if not found
      const label = labels[key] 
        ? (isEn ? labels[key].en : labels[key].ar) 
        : key;

      return (
        <SpecBox 
          key={key} 
          label={label} 
          value={value} 
          idx={i} 
        />
      );
    })}
  </div>

  {/* DYNAMIC CTA BUTTON */}
  {!isSoldOut && (
    <div className="mt-20 flex justify-center">
      <button className="bg-danube-navy text-white px-16 py-5 font-secondary tracking-[3px] uppercase hover:bg-black transition-all text-[13px]">
        {ctaText}
      </button>
    </div>
  )}
</section>

      {/* 4. WHY AREA (Requirement #5: Distance grid inside) */}
      <WhyArea 
        area={project.specs.location} 
        items={project.areaReasons} 
        isEn={isEn} 
      />

      {/* 5. REVEAL GALLERY (Requirement #6: Clip-path logic) */}
      <RevealGallery 
      images={project.gallery4} 
      isEn={isEn}
      />

      {/* 6. AMENITIES SLIDER (Requirement #7: Treated as centered banner) */}
      <div className="bg-white py-10">
      <AmenitiesSlider 
  showcase={project.amenitiesShowcase || []} 
  icons={project.amenitiesIcons || []}
  isEn={isEn} 
/>
      </div>

      {/* 7. IMAGE GALLERY (Requirement #8: Infinite Slideshow) */}
      <ImageGallery 
        images={project.mediaGallery} 
        isEn={isEn}
        />

      {/* 8. MAP SECTION (Requirement #9: Reduced width) */}
      <MapSection iframeUrl={project.mapIframe} />

      {/* 9. FAQ SECTION */}
      <FAQSection faqs={project.faqs} isEn={isEn} />

      {/* 10. SHARED CONTACT & FOOTER (Requirement #10) */}
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}