// src/app/[locale]/about/leadership-team/managing-director/page.tsx

import ManagingDirectorClient from "./ManagingDirectorClient";

export const metadata = {
  title: "Group Managing Director | Danube Properties",
  description: "Biography of Mr. Adel Sajan, Group Managing Director of Danube Group.",
};

export default async function ManagingDirectorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ManagingDirectorClient locale={locale} />;
}