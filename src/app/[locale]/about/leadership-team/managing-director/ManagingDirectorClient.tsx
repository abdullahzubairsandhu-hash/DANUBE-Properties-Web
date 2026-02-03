// src/app/[locale]/about/leadership-team/managing-director/ManagingDirectorClient.tsx

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

export default function ManagingDirectorClient({ locale }: { locale: string }) {
    const isEn = locale === 'en';
    
    return (
        <main className="min-h-screen bg-gray-50 pt-48 pb-20 px-6">
            
            <div className="max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
                    
                    {/* LEFT SIDE: IMAGE (Consistent 5/12 Portrait split) */}
                    <div className="relative h-[600px] md:h-auto md:col-span-5 w-full">
                        <CldImage
                            src="adel_sajan_vnpqd5"
                            alt="Mr. Adel Sajan"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>

                    {/* RIGHT SIDE: TEXT CONTENT (7/12 split) */}
                    <div className="p-10 md:p-16 lg:p-20 md:col-span-7 flex flex-col">
                        
                        {/* Centered Text Container */}
                        <div className="flex-grow flex flex-col justify-center space-y-6">
                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "A young, visionary and charismatic leader who has been one of the key factors in Danube’s strategic growth since 2009 with the founding of Danube Buildmart, now renamed Danube Home."
                                    : "قائد شاب، طموح ومؤثر، كان أحد العوامل الرئيسية في النمو الاستراتيجي لشركة دانوب منذ عام 2009 مع تأسيس دانوب بيلدمارت، التي تغير اسمها الآن إلى دانوب هوم."
                                }
                            </p>

                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "Under his leadership, Danube operates in major cities worldwide."
                                    : "تحت قيادته، تعمل دانوب في مدن كبرى حول العالم."
                                }
                            </p>
                        </div>

                        {/* SIGNATURE SECTION (Stays at the bottom) */}
                        <div className="mt-12 border-t border-gray-100 pt-8">
                            <h2 className="font-primary text-black text-[32px] uppercase">
                                Mr. Adel Sajan
                            </h2>
                            <p className="font-secondary text-danube-gold text-[18px] font-bold uppercase tracking-widest mt-1">
                                Group Managing Director
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ContactSection locale={locale} />
            <Footer locale={locale} />
        </main>
    );
}