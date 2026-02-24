// src/app/[locale]/layout.tsx

import { Providers } from "@/components/Providers";
import Navbar from "@/components/shared/Navbar";
import { AdminProvider } from "@/context/AdminContext";
import "../globals.css";
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script'; // Import added

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-secondary',
});

const libertinus = localFont({
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
        <AdminProvider>
          <Providers>
            <Navbar locale={locale} />
            {children}
          </Providers>
        </AdminProvider>

        {/* Cloudinary Upload Widget Script */}
        <Script 
          src="https://upload-widget.cloudinary.com/global/all.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}