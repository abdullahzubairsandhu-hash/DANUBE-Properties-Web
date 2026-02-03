// src/app/[locale]/payment-plan/page.tsx

import { Metadata } from "next";
import { PaymentPlanClient } from "./PaymentPlanClient";

export const metadata: Metadata = {
  title: "1% Payment Plan | Danube Properties",
  description: "Learn about the revolutionary 1% payment plan by Rizwan Sajan.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PaymentPlanClient locale={locale} />;
}