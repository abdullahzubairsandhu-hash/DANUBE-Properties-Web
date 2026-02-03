// src/app/[locale]/payment-plan/PaymentPlanClient.tsx

"use client";

import { useRef } from "react";
import { CldImage } from "next-cloudinary";
import ContactSection  from "@/components/shared/ContactSection";
import Footer  from "@/components/shared/Footer";

export function PaymentPlanClient({ locale }: { locale: string }) {
  const contactRef = useRef<HTMLDivElement>(null);
  const isEn = locale === 'en';

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-white pt-20">
      {/* 1. TOP IMAGE SECTION */}
      <section className="w-full flex justify-center bg-white -mt-10">
        <div 
          onClick={scrollToContact}
          className="relative cursor-pointer group overflow-hidden w-full aspect-[683/200]"
        >
          <CldImage 
            src="1percent_payment_r3sbgk" 
            alt="1% Payment Plan Header" 
            fill 
            priority
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </section>

      {/* 2. HEADING */}
      <section className="text-center py-16">
        <h1 className="font-primary text-danube-gold text-[40px] md:text-[60px] lg:text-[75px] uppercase leading-tight tracking-tight px-4">
          {isEn ? "1% PAYMENT PLAN" : "خطة دفع 1٪"}
        </h1>
      </section>

      {/* 3. PARAGRAPHS */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-24 lg:mb-32">
          <p className="font-secondary text-gray-600 text-[16px] md:text-[18px] leading-[32px] font-medium">
            {isEn ? "Rizwan Sajan, Founder and Chairman of Danube Group, started his journey from being a milk seller to building a billion-dollar conglomerate in the UAE, and now he is responsible for building dream houses for expats in the Middle East with his revolutionary 1% payment plan. He is a Forbes award-winning entrepreneur and is known as the 1% Man in Dubai." : "بدأ رضوان ساجان، مؤسس ورئيس مجلس إدارة مجموعة دانوب، رحلته من بائع حليب إلى بناء تكتل شركات بمليارات الدولارات في دولة الإمارات العربية المتحدة، وهو الآن مسؤول عن بناء منازل الأحلام للوافدين في الشرق الأوسط من خلال خطة دفع 1٪ الثورية. إنه رائد أعمال حائز على جوائز من فوربس ومعروف في دبي باسم 'رجل الـ 1٪'."}
          </p>
        </div>

        <div className="mb-24 lg:mb-32">
          <p className="font-secondary text-gray-600 text-[16px] md:text-[18px] leading-[32px] font-medium">
            {isEn ? "The 1% payment plan is a way to fulfill the aspirations of every expat in Dubai to possess their own dream home and relish the luxuries this vibrant city has to offer. Apart from a small down payment of around 20%, the buyers have to make a monthly payment of 1%, and the balance is collected once the building is ready. For more than a decade, Danube Properties has delivered over 15,000 apartments via this plan." : "تُعد خطة دفع الـ 1٪ وسيلة لتحقيق تطلعات كل وافد في دبي لامتلاك منزل أحلامه والاستمتاع بمظاهر الرفاهية التي تقدمها هذه المدينة النابضة بالحياة. فبصرف النظر عن دفعة أولى صغيرة تبلغ حوالي 20٪، يتعين على المشترين سداد دفعات شهرية بنسبة 1٪ فقط، ويتم تحصيل المبلغ المتبقي عند جاهزية المبنى. وعلى مدار أكثر من عقد من الزمان، نجحت دانوب العقارية في تسليم أكثر من 15,000 شقة من خلال هذه الخطة."}
          </p>
        </div>

        <div className="mb-32 lg:mb-48">
          <p className="font-secondary text-gray-600 text-[16px] md:text-[18px] leading-[32px] font-medium">
            {isEn ? "Danube Properties is the first developer in the region to start this revolutionary 1% payment plan. It exemplifies the commitment to providing affordable luxury to investors looking to buy apartments in the UAE. The property market in the UAE, particularly in Dubai, has seen significant growth, and this plan offers an attractive option for those who wish to buy an apartment with flexible installments. This innovative approach allows many to turn their dreams of owning property into reality, making it easier to secure an apartment in this thriving region." : "تعتبر دانوب العقارية أول مطور عقاري في المنطقة يطلق خطة دفع 1٪ الثورية هذه، والتي تجسد الالتزام بتوفير الرفاهية بأسعار معقولة للمستثمرين الراغبين في شراء شقق في دولة الإمارات. لقد شهد سوق العقارات في الإمارات، ولا سيما في دبي، نمواً كبيراً، وتقدم هذه الخطة خياراً جذاباً لأولئك الذين يرغبون في شراء شقة بأقساط مرنة. يتيح هذا النهج المبتكر للكثيرين تحويل أحلامهم في امتلاك العقارات إلى حقيقة، مما يسهل عملية تأمين شقة في هذه المنطقة المزدهرة."}
          </p>
        </div>
      </section>

      {/* 4. CONTACT & FOOTER (Inside Client for Scroll Logic) */}
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}