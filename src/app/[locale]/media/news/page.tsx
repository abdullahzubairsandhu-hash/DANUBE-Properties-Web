// src/app/[locale]/media/news/page.tsx

import NewsClient from "./NewsClient";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <NewsClient locale={locale} />;
}