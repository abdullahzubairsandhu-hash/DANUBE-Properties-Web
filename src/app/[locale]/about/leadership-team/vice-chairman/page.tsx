// src/app/[locale]/about/leadership-team/vice-chairman/page.tsx

import ViceChairmanClient from "./ViceChairmanClient";

export const metadata = {
  title: "Vice Chairman | Danube Properties",
  description: "Biography of Mr. Anis Sajan, Vice Chairman of Danube Group.",
};

export default async function ViceChairmanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ViceChairmanClient locale={locale} />;
}