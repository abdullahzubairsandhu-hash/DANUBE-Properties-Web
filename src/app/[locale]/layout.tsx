// src/app/layout.tsx

import { Providers } from "@/components/Providers";
import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-secondary',
});

const libertinus = localFont({
  // This path assumes the file is at src/fonts/LibertinusSans-Regular.woff
  src: '../../fonts/LibertinusSans-Regular.woff', 
  variable: '--font-primary',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${libertinus.variable} ${inter.variable} bg-white dark:bg-danube-navy antialiased`}>
        <Providers>
          <Navbar locale={locale} />
          {children}
        </Providers>
      </body>
    </html>
  );
}