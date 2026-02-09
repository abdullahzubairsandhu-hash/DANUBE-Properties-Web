// src/app/[locale]/media/3d-tours/page.tsx

import ToursClient from "./ToursClient";

export const metadata = {
  title: "3D Tours | Danube Properties",
  description: "Experience our luxury properties through immersive virtual 3D tours.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  // We await the params here to ensure locale is correctly captured
  const { locale } = await params;
  
  return <ToursClient locale={locale} />;
}