// src/app/[locale]/about/our-journey/page.tsx

import JourneyClient from "./JourneyClient";

export const metadata = {
  title: "Our Journey | Danube Properties",
  description: "A trip down memory lane: The history and milestones of Danube Group.",
};

export default async function JourneyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <JourneyClient locale={locale} />;
}