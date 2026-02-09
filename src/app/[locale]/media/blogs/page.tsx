// src/app/[locale]/media/blogs/page.tsx

import BlogClient from "./BlogClient";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BlogClient locale={locale} />;
}