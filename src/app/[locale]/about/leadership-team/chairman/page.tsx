// src/app/[locale]/about/leadership-team/chairman/page.tsx

import ChairmanClient from "./ChairmanClient";

export const metadata = {
  title: "Chairman | Danube Properties",
  description: "Biography of Mr. Rizwan Sajan, Founder & Chairman of Danube Group.",
};

// ADD 'async' here
export default async function ChairmanPage({ params }: { params: Promise<{ locale: string }> }) {
  // YOU MUST 'await' the params in Next.js 15
  const { locale } = await params;
  
  return <ChairmanClient locale={locale} />;
}