import { Metadata } from "next";
import { CompanyProfileClient } from "./CompanyProfileClient";

export const metadata: Metadata = {
  title: "Company Profile | Danube Properties",
  description: "The legacy of Danube Properties since 1993.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CompanyProfileClient locale={locale} />;
}