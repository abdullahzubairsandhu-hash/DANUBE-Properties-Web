// src/app/[locale]/about/leadership-team/page.tsx

import LeadershipClient from "./LeadershipClient";

export const metadata = {
  title: "Our Leadership | Danube Properties",
  description: "Meet the visionaries behind Danube Group.",
};

export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <LeadershipClient locale={locale} />;
  }