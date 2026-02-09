// src/app/[locale]/media/video/page.tsx

import VideoGalleryClient from "./VideoGalleryClient";

export const metadata = {
  title: "Video Gallery | Danube Properties",
  description: "Watch our latest project launches, construction updates, and brand videos.",
};

export default async function VideoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <VideoGalleryClient locale={locale} />;
}