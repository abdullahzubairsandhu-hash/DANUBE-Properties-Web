// src/app/[locale]/about/management-team/page.tsx

import ManagementTeamClient from "./ManagementTeamClient";

export const metadata = {
  title: "Management Team | Danube Properties",
  description: "Meet the executive management driving the operations of Danube Group.",
};

export default async function ManagementTeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ManagementTeamClient locale={locale} />;
}