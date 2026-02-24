// src/data/projects.ts

export interface Amenity {
  imageId: string;
  titleEn: string;
  titleAr: string;
  icon?: string;
}

export interface Project {
  title: string;
  heroMediaId: string;
  heroIsVideo: boolean;
  descEn: string;
  descAr: string;
  specs: {
    price: string;
    completion: string;
    paymentPlan: string;
    apartments: string;
    [key: string]: string;
    location: string;
  };
  areaReasons: {
    icon: string;
    textEn: string;
    textAr: string;
  }[];
  gallery4: string[];
  
  // Notice the "?" - this makes them optional so Sparklz doesn't crash
  amenities?: Amenity[]; 
  amenitiesShowcase?: Amenity[];
  amenitiesIcons?: Amenity[];

  mediaGallery: string[];
  mapIframe: string;
  faqs: {
    qEn: string;
    aEn: string;
    qAr: string;
    aAr: string;
  }[];
}
  
  export const PROJECTS_DATA: Record<string, Project> = {
    
    "shahrukhz": {
    title: "SHAHRUKHZ BY DANUBE",
    heroMediaId: "baner_updated_srk_zemgre",
    heroIsVideo: true,
    descEn: "Rising on the iconic Sheikh Zayed Road, this premium 55-storey office tower offers unmatched visibility and seamless access in the heart of Dubai. Inspired by the self-made journey of Shahrukh Khan, Shahrukhz is a tribute to those who script their own destiny — a place for business leaders, founders and visionaries to build more than companies, to build empires. With world-class amenities curated for productivity, prestige and wellbeing…every detail elevates the way you work.",
    descAr: "يرتفع هذا البرج المكتبي الفاخر المكون من 55 طابقاً على طريق الشيخ زايد الشهير، ويوفر رؤية لا مثيل لها ووصولاً سلساً في قلب دبي. مستوحى من رحلة النجاح الذاتي للنجم شاروخان، يعد 'شاروخانز' تحية لأولئك الذين يسطرون قدرهم بأنفسهم - إنه مكان لقادة الأعمال والمؤسسين والرؤيويين لبناء ما هو أكثر من مجرد شركات، لبناء إمبراطوريات. مع مرافق عالمية المستوى مصممة للإنتاجية والرفاهية... كل تفصيل يرتقي بطريقة عملك.",
    specs: {
      price: "AED 1.9 MILLION",
      completion: "2029",
      paymentPlan: "Pay 1% Monthly",
      apartments: "615 Units",
      commercial_units: "Executive, Premium, Prestige",
      location: "Sheikh Zayed Road, Dubai"
    },
    areaReasons: [
      { icon: "palm-jumaierah-1_owooqu", textEn: "5 mins Palm Jumeirah", textAr: "5 دقائق من نخلة جميرا" },
      { icon: "marina-walk-1_nizm23", textEn: "8 mins Dubai Marina", textAr: "8 دقائق من دبي مارينا" },
      { icon: "3-mins-dubai-mall_logxd6", textEn: "8 mins Mall of Emirates", textAr: "8 دقائق من مول الإمارات" },
      { icon: "airport-1-1_ploonm", textEn: "20 mins Dubai Int. Airport", textAr: "20 دقيقة من مطار دبي الدولي" },
      { icon: "EXPO_c9iuew", textEn: "20 mins Dubai Expo", textAr: "20 دقيقة من إكسبو دبي" },
      { icon: "burj-al-arab_silfdr", textEn: "8 mins Burj Al Arab", textAr: "8 دقائق من برج العرب" },
    ],
    gallery4: [
      "banner1-2_Shahrukhz_Exterior_sghqze",
      "banner2-2_Shahrukhz_Grand_Lobby_mo8yzb",
      "banner4-2_Shahrukhz_Office_c4qhdk",
      "Entrance_asz7uf"
    ],
    // --- FOR THE HIGH-RES SLIDER ---
    amenitiesShowcase: [
      { 
        titleEn: "Sky Pool", 
        titleAr: "مسبح معلق", 
        imageId: "skypool-shahrukhz_ffddbl" 
      },
      { 
        titleEn: "Grand Lobby", 
        titleAr: "ردهة كبرى", 
        imageId: "banner2-2_Shahrukhz_Grand_Lobby_mo8yzb" 
      },
      { 
        titleEn: "Helipad", 
        titleAr: "مهبط مروحيات", 
        imageId: "banner3-2_Shahrukhz_Helipad_wj8xpn" 
      },
      { 
        titleEn: "Club House", 
        titleAr: "النادي الاجتماعي", 
        imageId: "club_house-shahrukhz_aqnj7t" 
      },
      { 
        titleEn: "Sky Lounge", 
        titleAr: "سكاي لاونج", 
        imageId: "skylounge-shahrukhz_lyf8pd" 
      },
      { 
        titleEn: "Exterior View", 
        titleAr: "العرض الخارجي", 
        imageId: "banner1-2_Shahrukhz_Exterior_sghqze" 
      },
    ],
    // --- FOR THE MODAL ICONS ---
    amenitiesIcons: [
      { titleEn: "Badminton Court", titleAr: "ملعب كرة الريشة", imageId: "BADMINTON-COURT_gokqyz" },
      { titleEn: "Board Room", titleAr: "غرفة الاجتماعات", imageId: "BOARD-ROOM_j3tcs7" },
      { titleEn: "Break Yard", titleAr: "ساحة الاستراحة", imageId: "BREAK-YARD_t3xqkx" },
      { titleEn: "Club House", titleAr: "النادي الاجتماعي", imageId: "Club-House-1_gywxk5" },
      { titleEn: "Cricket Court", titleAr: "ملعب كريكت", imageId: "cricket-court_escu9t" },
      { titleEn: "Indoor Gym", titleAr: "صالة رياضية داخلية", imageId: "indoor-gym_x6dzui" },
      { titleEn: "Drone Docking Station", titleAr: "محطة طائرات بدون طيار", imageId: "Drone-Docking-Station_ec8q33" },
      { titleEn: "E-Scooter Parking", titleAr: "مواقف سكوتر كهربائي", imageId: "E-Scooter-Parking_uroqsi" },
      { titleEn: "Electric Charging Station", titleAr: "شحن سيارات كهربائية", imageId: "Electric-Car-Charging-Stations_ghfupg" },
      { titleEn: "Helipad", titleAr: "مهبط مروحيات", imageId: "HELIPAD_dcx5aj" },
      { titleEn: "Lounge 33", titleAr: "لاونج 33", imageId: "LOUNGE-33_mahep7" },
      { titleEn: "Jogging Track", titleAr: "مسار الجري", imageId: "jogging-track_ptcjxa" },
      { titleEn: "Lounge 55", titleAr: "لاونج 55", imageId: "Lounge-55_sfxm5r" },
      { titleEn: "Meeting Room", titleAr: "غرفة اجتماعات", imageId: "MEETING-ROOM_mglcem" },
      { titleEn: "Multipurpose Hall", titleAr: "قاعة متعددة الأغراض", imageId: "Multipurpose-Hall-1_ziutv2" },
      { titleEn: "SRK Selfie Point", titleAr: "نقطة سيلفي SRK", imageId: "SRK-Selfie-Point_uithl5" },
      { titleEn: "Networking Hub", titleAr: "مركز تواصل", imageId: "NETWORKING-HUB_gosrxx" },
      { titleEn: "Padel Tennis", titleAr: "بادل تنس", imageId: "padal-tennis_yqkt8j" },
      { titleEn: "Podcast Studio", titleAr: "استوديو بودكاست", imageId: "PODCAST-STUDIO_ilwksy" },
      { titleEn: "Sky Pool", titleAr: "مسبح معلق", imageId: "SKY-POOL_ulfek8" },
      { titleEn: "Prayer Hall", titleAr: "مصلى", imageId: "prayer-hall_ezzmtj" },
      { titleEn: "Urban Park", titleAr: "حديقة حضرية", imageId: "URBAN-PARK_tcvr35" },
      { titleEn: "Tranquility Garden", titleAr: "حديقة الهدوء", imageId: "Tranquility-Garden_ttgo6f" },
      { titleEn: "Zen Garden", titleAr: "حديقة زين", imageId: "Zen-Garden-1_vzrq19" },
      { titleEn: "Valet Parking", titleAr: "خدمة صف السيارات", imageId: "Valet-Parking_ixtyhj" }
    ],
    mediaGallery: [
      "banner1-2_Shahrukhz_Exterior_sghqze",
      "banner2-2_Shahrukhz_Grand_Lobby_mo8yzb",
      "banner4-2_Shahrukhz_Office_c4qhdk",
      "2-1_tbvpbp",
      "1_fe6hfu",
      "3-1_cdbbl4",
      "5-1_u7x7cz"
    ],
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.17851002432!2d55.2721877!3d25.197197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDExJzQ5LjkiTiA1NcKwMTYnMTkuOSJF!5e0!3m2!1sen!2sae!4v1625645456789!5m2!1sen!2sae", 
    faqs: [
      { 
        qEn: "What type of units are available in Shahrukhz?", 
        aEn: "Shahrukhz offers a variety of commercial units including Executive, Premium, Prestige, and Standard offices.", 
        qAr: "ما هي أنواع الوحدات المتوفرة في شاروخانز؟", 
        aAr: "يوفر شاروخانز مجموعة متنوعة من الوحدات التجارية بما في ذلك المكاتب التنفيذية والمميزة والفاخرة والقياسية." 
      },
      { 
        qEn: "What is the payment plan?", 
        aEn: "The project features an attractive 1% monthly payment plan.", 
        qAr: "ما هي خطة الدفع؟", 
        aAr: "يتميز المشروع بخطة دفع جذابة بنسبة 1% شهرياً." 
      }
    ]
},
  };

  