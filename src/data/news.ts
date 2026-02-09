// src/data/news.ts

export interface ContentBlock {
    type: 'text' | 'image';
    value: string; // Paragraph text or Cloudinary image ID
  }
  
  export interface NewsArticle {
    id: string;
    slug: string;
    title: string;
    publishedAt: string;
    thumbnail: string;
    excerpt: string;
    blocks: ContentBlock[]; 
  }
  
  const sourceArticles = [
    {
      title: "Historic Milestone: ‘SHAHRUKHZ by Danube’ AED 2.1 Billion Development Completely SOLD OUT on Launch Day",
      slug: "shahrukhz-sold-out-milestone",
      thumbnail: "historic-milestone-shahrukhz-by-danube-aed-2-1-billion-development-completely-sold-out-on-launch-day_wayhf1",
      excerpt: "Danube’s head honcho proudly announced a complete sell out of ‘SHAHRUKHZ by Danube’, an AED 2.1 billion development on the launch day.",
      blocks: [
        { type: 'text' as const, value: "Dubai, December 9, 2025: Following the viral unveiling in Mumbai, the much-anticipated ‘SHAHRUKHZ by Danube’ – a premium commercial tower named in honour of Bollywood megastar Shah Rukh Khan – received a spectacular launch in Dubai in the presence of the iconic actor and Rizwan Sajan, Founder & Chairman of the Danube Group." },
        { type: 'text' as const, value: "“The record-breaking success of ‘SHAHRUKHZ by Danube’ is a proud moment for us. This overwhelming response is a clear reflection of the project’s unmatched value – from its prime location with seamless access to Dubai’s key destinations, to its world-class amenities and thoughtfully crafted design inspired by global luxury standards,” said Rizwan Sajan." },
        { type: 'image' as const, value: "historic-milestone-shahrukhz-by-danube-aed-2-1-billion-development-completely-sold-out-on-launch-day_wayhf1" },
        { type: 'text' as const, value: "Spanning over 1 million square feet of built-up area, ‘SHAHRUKHZ by Danube’ represents an iconic fusion of luxury, innovation, and star power. The tower sets a new benchmark for premium commercial real estate in Dubai." }
      ]
    },
    {
      title: "Shah Rukh Khan honored with Dubai’s newest landmark: ‘SHAHRUKHZ by Danube’",
      slug: "shah-rukh-khan-landmark-dubai",
      thumbnail: "shah-rukh-khan-honored-with-dubais-newest-landmark-shahrukhz-by-danube_nxoxo6",
      excerpt: "Danube Properties has announced the launch of ‘Shahrukhz by Danube’, a premium commercial tower named after Bollywood megastar Shah Rukh Khan.",
      blocks: [
        { type: 'text' as const, value: "In a unique global first, Danube Properties has announced the launch of ‘Shahrukhz by Danube’, a premium commercial tower named after Bollywood megastar Shah Rukh Khan. Rising majestically on Sheikh Zayed Road, the 55-storey tower is set to become one of Dubai’s most prestigious business landmarks." },
        { type: 'text' as const, value: "Shah Rukh Khan, speaking at the launch, said: “It is humbling and deeply touching to have a landmark in Dubai carry my name. Dubai has always been a special place for me- a city that celebrates dreams, ambition, and possibility.”" },
        { type: 'image' as const, value: "shah-rukh-khan-honored-with-dubais-newest-landmark-shahrukhz-by-danube_nxoxo6" }
      ]
    },
    {
      title: "Premium waterfront residences: Breez by Danube Becomes Dubai Maritime City’s tallest tower",
      slug: "breez-by-danube-maritime-city",
      thumbnail: "premium-waterfront-residences-breez-by-danube-becomes-dubai-maritime-citys-tallest-tower-with-panoramic-sea-views_qwimjf",
      excerpt: "Rising majestically as Dubai Maritime City’s tallest residential tower, Breez ushers in a new era of premium waterfront living.",
      blocks: [
        { type: 'text' as const, value: "Danube Properties continues to set new benchmarks in luxury and value-driven living with the launch of its latest project – Breez by Danube. Rising majestically as Dubai Maritime City’s tallest residential tower, Breez ushers in a new era of premium waterfront living." },
        { type: 'image' as const, value: "premium-waterfront-residences-breez-by-danube-becomes-dubai-maritime-citys-tallest-tower-with-panoramic-sea-views_qwimjf" },
        { type: 'text' as const, value: "Standing tall as a 60-storey tower with a built-up area of around 1.5 million sq. ft., Breez is designed as a landmark address. The development will feature more than 1,000 units." }
      ]
    },
    {
      title: "UAE: Golden Visa professionals set to drive Dubai property market, says Danube chief",
      slug: "golden-visa-professionals-dubai-market",
      thumbnail: "paying-rent-or-paying-emi-dubai_ebb9aq",
      excerpt: "UAE professionals holding a 10-year Golden Visa will be among the key drivers of Dubai’s property market, according to Rizwan Sajan.",
      blocks: [
        { type: 'text' as const, value: "UAE professionals holding a 10-year Golden Visa will be among the key drivers of Dubai’s property market in the coming years, according to Rizwan Sajan, chairman of Danube Properties. “Many medical professionals in the UAE have either received or qualify for the Golden Visa,” Sajan told Khaleej Times." },
        { type: 'text' as const, value: "Sajan predicts annual property price increases of 15–20 per cent over the next four to five years in key areas such as Downtown Dubai, Business Bay, and Al Furjan." }
      ]
    },
    {
      title: "Indian Aces 2025: Meet the Gulf’s most powerful Indian business leader",
      slug: "indian-aces-2025-rizwan-sajan",
      thumbnail: "indian-aces-2025_xzttem",
      excerpt: "Rizwan Sajan leads a diversified conglomerate with a presence in nine countries, including the UAE, Saudi Arabia, and India.",
      blocks: [
        { type: 'text' as const, value: "Rizwan Sajan leads a diversified conglomerate with a presence in nine countries, including the UAE, Saudi Arabia, Qatar, Oman, Bahrain, and India. The group operates over 25,000 products across building materials, home décor, and real estate sectors." },
        { type: 'text' as const, value: "Danube Properties has launched 34 projects with over 21,000 residential units. A notable achievement was the completion of the Opalz project five months ahead of schedule in April 2025." }
      ]
    },
    {
      title: "Ranked 10th in POWER 150: Recognized Among the Middle East’s Construction Elite",
      slug: "ranked-10th-power-150-construction",
      thumbnail: "ranked-10th-in-power-150-recognized-among-the-middle-easts-construction-elite_zupnpp",
      excerpt: "Under Rizwan Sajan’s guidance, Danube Properties launched seven new developments over the past 12 months.",
      blocks: [
        { type: 'text' as const, value: "Under Rizwan Sajan’s guidance, Danube Properties launched seven new developments over the past 12 months: Diamondz, Bayz101, Bayz102, Oasiz1, Oasiz2, Timez and Sparklz. Two of these towers surpass 100 floors." },
        { type: 'text' as const, value: "Operational excellence remains a hallmark of Sajan’s approach. In the last year, Danube delivered three major projects—Opalz, Gemz, and Pearlz—ahead of schedule by four to six months." }
      ]
    }
  ];
  
  export const newsData: NewsArticle[] = Array.from({ length: 20 }).map((_, i) => {
    const source = sourceArticles[i % sourceArticles.length];
    
    const date = new Date();
    date.setDate(date.getDate() - (i * 2)); // Spread dates realistically
    
    return {
      id: (i + 1).toString(),
      slug: i < 6 ? source.slug : `${source.slug}-${i}`, 
      title: source.title,
      publishedAt: date.toISOString(),
      thumbnail: source.thumbnail,
      excerpt: source.excerpt,
      blocks: source.blocks as ContentBlock[] // Explicitly cast the array to fix TS error
    };
  });