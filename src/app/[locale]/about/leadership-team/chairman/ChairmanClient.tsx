// src/app/[locale]/about/leadership-team/chairman/ChairmanClient.tsx

"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/components/shared/Footer";

export default function ChairmanClient({ locale }: { locale: string }) {
    const isEn = locale === 'en';
    
    return (
        <main className="min-h-screen bg-gray-50 pt-48 pb-20 px-6">
            
            {/* 1. VISIONARY INFO CONTAINER */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 mb-32">
                {/* Change: Using a 12-column grid on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-12">
                    
                    {/* LEFT SIDE: IMAGE (Occupies 5 columns) */}
                    <div className="relative h-[600px] md:h-auto md:col-span-5 w-full">
                        <CldImage
                            src="chairman_xazql9"
                            alt="Mr. Rizwan Sajan"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>

                    {/* RIGHT SIDE: TEXT CONTENT (Occupies 7 columns) */}
                    <div className="p-10 md:p-16 lg:p-20 md:col-span-7 flex flex-col justify-center">
                        <div className="space-y-6">
                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "Rizwan Sajan, the Founder and Chairman of Danube Properties and the Danube Group, stands as a visionary force in the business world with over three decades of proven success. Celebrated for his entrepreneurial spirit and forward-looking leadership, Rizwan Sajan has played a crucial role in shaping the real estate landscape of Dubai and the Middle East."
                                    : "يقف رضوان ساجان، مؤسس ورئيس مجلس إدارة دانوب العقارية ومجموعة دانوب، كقوة رؤيوية في عالم الأعمال مع أكثر من ثلاثة عقود من النجاح المثبت. اشتهر بروحه الريادية وقيادته المتطلعة، وقد لعب رضوان ساجان دوراً حاسماً في تشكيل المشهد العقاري في دبي والشرق الأوسط."
                                }
                            </p>

                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "With a relentless drive to innovate and challenge the status quo, Rizwan’s leadership style is characterized by a hands-on approach, a deep commitment to excellence, and an unwavering belief in the power of perseverance. His ability to inspire and lead by example has fostered a culture of accountability, creativity and continued growth throughout the Danube Group."
                                    : "مع دافع لا يتوقف للابتكار وتحدي الوضع الراهن، يتميز أسلوب قيادة رضوان بنهج عملي، والتزام عميق بالتميز، وإيمان راسخ بقوة المثابرة. إن قدرته على الإلهام والقيادة بالقدوة قد عززت ثقافة المسؤولية والإبداع والنمو المستمر في جميع أنحاء مجموعة دانوب."
                                }
                            </p>

                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "Rizwan Sajan founded Danube Properties in 2014 with a vision to provide affordable luxury homes in Dubai. Under Rizwan Sajan’s leadership as Chairman, the company has grown into one of Dubai’s leading property developers."
                                    : "أسس رضوان ساجان شركة دانوب العقارية في عام 2014 برؤية لتوفير منازل فاخرة بأسعار معقولة في دبي. وتحت قيادته كرئيس لمجلس الإدارة، نمت الشركة لتصبح واحدة من أبرز المطورين العقاريين في دبي."
                                }
                            </p>

                            <p className="font-secondary text-gray-800 text-[18px] font-medium leading-relaxed">
                                {isEn 
                                    ? "Under Rizwan Sajan’s leadership, Danube Properties has grown into one of the most trusted real estate companies in Dubai and the UAE, delivering quality residential projects that embody the values of trust, integrity and progress. Rizwan Sajan’s vision has made Danube Properties synonymous with affordable luxury and customer-centric development."
                                    : "تحت قيادة رضوان ساجان، أصبحت دانوب العقارية واحدة من أكثر الشركات العقارية موثوقية في دبي والإمارات العربية المتحدة، حيث تقدم مشاريع سكنية عالية الجودة تجسد قيم الثقة والنزاهة والتقدم. جعلت رؤيته من دانوب العقارية مرادفاً للفخامة الميسورة والتطوير المرتكز على العملاء."
                                }
                            </p>
                        </div>

                        {/* SIGNATURE SECTION */}
                        <div className="mt-12 border-t border-gray-100 pt-8">
                            <h2 className="font-primary text-black text-[32px] uppercase">
                                Mr. Rizwan Sajan
                            </h2>
                            <p className="font-secondary text-danube-gold text-[18px] font-bold uppercase tracking-widest mt-1">
                                Founder & Chairman - Danube
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. SHARED COMPONENTS */}
            <div className="mt-20">
                <ContactSection locale={locale} />
                <Footer locale={locale} />
            </div>
        </main>
    );
}