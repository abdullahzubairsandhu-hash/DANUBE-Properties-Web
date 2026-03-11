// src/app/[locale]/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
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
import AdminProjectBar from "@/components/admin/AdminProjectBar";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin";
import AdminEditableWrapper from "@/components/admin/AdminEditableWrapper";
import AdminGalleryManager from "@/components/admin/AdminGalleryManager"; // New Import

export default async function ProjectMasterPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { slug, locale } = await params;
  const isEn = locale === 'en';

  // 1. DYNAMIC FETCH FROM DATABASE
  await connectDB();
  const rawProject = await Project.findOne({ slug }).lean();

  if (!rawProject) notFound();

  /**
   * 2. SERIALIZATION FIX
   * MongoDB returns ObjectIDs and Buffers which Next.js Client Components 
   * cannot parse. This converts the document into a plain JSON object.
   */
  const project = JSON.parse(JSON.stringify(rawProject));
  const projectIdStr = project._id.toString();

  // 1. Logic for Status Change (called from the bar)
  async function handleStatusChange(newStatus: string) {
    'use server';
    await connectDB();
    await Project.findOneAndUpdate({ slug }, { status: newStatus });
  }

  // Logic for Dynamic CTA
  const completionValue = project.specs?.completion || "";
  const completionYear = parseInt(completionValue.match(/\d{4}/)?.[0] || "0");
  const isSoldOut = project.specs?.price?.toLowerCase() === "sold out";
  
  const ctaText = isEn 
    ? (completionYear > 2026 ? "VIRTUAL TOUR" : "BOOK ONLINE")
    : (completionYear > 2026 ? "جولة افتراضية" : "احجز عبر الإنترنت");

  return (
    <main className="bg-white overflow-x-hidden pb-24">

      {/* BAR IS NOW SELF-CONTAINED. 
          It handles its own "Edit" navigation. 
      */}
      <ClientOnlyAdmin>
      <AdminProjectBar 
        initialStatus={project.status} 
        slug={project.slug} 
        onStatusChange={handleStatusChange} 
      />
      </ClientOnlyAdmin>

      {/* 1. HERO SECTION */}
      <ClientOnlyAdmin>
      <ProjectHero 
        mediaId={project.heroMediaId} 
        isVideo={project.heroIsVideo} 
        slug={project.slug}           // Add this
        status={project.status}       // Add this
        projectId={project._id}
      />
      </ClientOnlyAdmin>

      <section className="relative py-24 px-8 max-w-[1440px] mx-auto text-center min-h-[450px]">
        <div className="mb-16">
        <ClientOnlyAdmin>
        <AdminEditableWrapper projectId={project._id} field="title" initialValue={project.title} type="text">
          <h1 className="font-primary text-[40px] lg:text-[60px] text-danube-gold uppercase leading-tight">
            {project.title}
          </h1>
          </AdminEditableWrapper>
          
          
          {/* Requirement: Always use font-medium for paragraphs */}
          <AdminEditableWrapper 
          projectId={project._id} 
          field={isEn ? "descEn" : "descAr"} 
          initialValue={isEn ? project.descEn : project.descAr}
          >
          <div className="font-medium text-[17px] lg:text-[20px] text-gray-500 mt-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {isEn 
              ? project.descEn?.replaceAll('. ', '.\n\n') 
              : project.descAr?.replaceAll('. ', '.\n\n')
            }
          </div>
          </AdminEditableWrapper>
          </ClientOnlyAdmin>
        </div>

        {/* SPECS GRID */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 bg-transparent">
          {Object.entries(project.specs || {}).map(([key, value], i) => {
            const labels: Record<string, { en: string; ar: string }> = {
              price: { en: "Starting Price", ar: "السعر المبدئي" },
              completion: { en: "Completion", ar: "التسليم" },
              paymentPlan: { en: "Payment Plan", ar: "خطة الدفع" },
              apartments: { en: "Apartments", ar: "الشقق" },
              location: { en: "Location", ar: "الموقع" },
            };

            const label = labels[key] 
              ? (isEn ? labels[key].en : labels[key].ar) 
              : key;

            return (
              <SpecBox 
                key={key} 
                label={label} 
                value={value as string} 
                idx={i} 
              />
            );
          })}
        </div>

        {!isSoldOut && (
          <div className="mt-20 flex justify-center">
            <button className="bg-danube-navy text-white px-16 py-5 font-secondary tracking-[3px] uppercase hover:bg-black transition-all text-[13px]">
              {ctaText}
            </button>
          </div>
        )}
      </section>

      {/* 4. WHY AREA - Now receiving serialized items */}
      <WhyArea 
        area={project.specs?.location} 
        items={project.areaReasons || []} 
        isEn={isEn} 
      />

     {/* 5. REVEAL GALLERY SECTION */}
<div className="relative">
  {/* The Static Manager: Stable, non-scrolling, and easy to click */}
  <ClientOnlyAdmin>
    <AdminGalleryManager 
    projectId={projectIdStr} 
    currentImages={project.gallery4 || []}
    />
  </ClientOnlyAdmin>

  {/* The Display: Clean, fast, and no longer "infected" by prop-drilling errors */}
  <RevealGallery 
    images={project.gallery4 || []} 
    isEn={isEn} 
  />
</div>

      {/* 6. AMENITIES SLIDER - IDs are now strings, fixing runtime errors */}
      <div className="bg-white py-10">
        <AmenitiesSlider 
          showcase={project.amenitiesShowcase || []} 
          icons={project.amenitiesIcons || []}
          isEn={isEn} 
        />
      </div>

      {/* 7. IMAGE GALLERY */}
      <ImageGallery images={project.mediaGallery || []} isEn={isEn} />

      {/* 8. MAP SECTION */}
      <MapSection iframeUrl={project.mapIframe} />

      {/* 9. FAQ SECTION */}
      <FAQSection faqs={project.faqs || []} isEn={isEn} />

      {/* 10. SHARED COMPONENTS */}
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}