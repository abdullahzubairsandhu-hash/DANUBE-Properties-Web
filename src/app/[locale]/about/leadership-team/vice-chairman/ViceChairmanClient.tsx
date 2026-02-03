// src/app/[locale]/about/leadership-team/vice-chairman/ViceChairmanClient.tsx

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

export default function ViceChairmanClient({ locale }: { locale: string }) {
    const isEn = locale === 'en';
    
    return (
        <main className="min-h-screen bg-gray-50 pt-48 pb-20 px-6">
            
            <div className="max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12">
                    
                    {/* LEFT SIDE: IMAGE (5/12 for Portrait look) */}
                    <div className="relative h-[600px] md:h-auto md:col-span-5 w-full">
                        <CldImage
                            src="anis_sajan_zhcebv"
                            alt="Mr. Anis Sajan"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>

                    {/* RIGHT SIDE: TEXT CONTENT (7/12 for more width) */}
                    <div className="p-10 md:p-16 lg:p-20 md:col-span-7 flex flex-col justify-center">
                        <div className="space-y-6">
                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "Mr. Anis Sajan, Vice Chairman of the Danube Group, embodies visionary leadership in the real estate sector. His journey from sales manager at Eureka Forbes to design Danube Properties as a symbol of excellence reflects his unwavering commitment to innovation and quality."
                                    : "يجسد السيد أنيس ساجان، نائب رئيس مجلس إدارة مجموعة دانوب، القيادة الرؤيوية في القطاع العقاري. إن رحلته من مدير مبيعات في يوريكا فوربس لتصميم دانوب العقارية كرمز للتميز تعكس التزامه الراسخ بالابتكار والجودة."
                                }
                            </p>

                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "A dedicated family man and cricket lover, Mr. Sajan brings a dynamic perspective to his role, balancing business management with personal passions. Under his leadership, Danube Properties has become synonymous with innovative housing solutions, setting new standards for luxury and affordability."
                                    : "بصفته رجلاً مخلصاً لعائلته ومحباً للكريكت، يضفي السيد ساجان منظوراً ديناميكياً على دوره، حيث يوازن بين إدارة الأعمال وشغفه الشخصي. وتحت قيادته، أصبحت دانوب العقارية مرادفاً للحلول السكنية المبتكرة، واضعة معايير جديدة للفخامة والقدرة على تحمل التكاليف."
                                }
                            </p>

                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "Beyond Danube Properties, Mr. Sajan leads brands like Milano and Casa Milano that are revolutionizing the sanitary ware industry with a mix of functionality and elegance."
                                    : "إلى جانب دانوب العقارية، يقود السيد ساجان علامات تجارية مثل ميلانو وكازا ميلانو التي تُحدث ثورة في صناعة الأدوات الصحية بمزيج من العملانية والأناقة."
                                }
                            </p>

                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "With a keen eye for opportunity and a commitment to excellence, Mr Anis Sajan continues to shape the future of Danube Group, leaving a lasting impression on the industry and inspiring others to follow his lead."
                                    : "بفضل نظرته الثاقبة للفرص والتزامه بالتميز، يواصل السيد أنيس ساجان تشكيل مستقبل مجموعة دانوب، تاركاً بصمة دائمة في الصناعة وملهماً الآخرين ليحذوا حذوه."
                                }
                            </p>
                        </div>

                        {/* SIGNATURE SECTION */}
                        <div className="mt-12 border-t border-gray-100 pt-8">
                            <h2 className="font-primary text-black text-[32px] uppercase">
                                Mr. Anis Sajan
                            </h2>
                            <p className="font-secondary text-danube-gold text-[18px] font-bold uppercase tracking-widest mt-1">
                                Vice Chairman - Danube
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