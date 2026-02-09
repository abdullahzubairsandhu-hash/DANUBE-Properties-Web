// src/data/blogs.ts

export interface ContentBlock {
    type: 'text' | 'image';
    value: string;
  }
  
  export interface BlogArticle {
    id: string;
    slug: string;
    title: string;
    publishedAt: string;
    thumbnail: string;
    excerpt: string;
    blocks: ContentBlock[]; 
  }
  
  const sourceBlogs = [
    {
      title: "Alternate Investment Opportunities for US Expats: Why Dubai Real Estate is Your Safe Haven",
      slug: "alternate-investment-opportunities-us-expats",
      thumbnail: "off-plan-payment-plans-dubai_lzfdr9",
      excerpt: "For US expats seeking portfolio stability and geographic diversification, Dubai’s real estate has emerged as a financial haven.",
      blocks: [
        { type: 'text' as const, value: "As global financial markets grow increasingly volatile, US expatriates are actively reassessing how and where they deploy their capital. Traditional investment channels such as equities and domestic real estate in the US are facing rising pressure from inflation and geopolitical uncertainty." },
        { type: 'text' as const, value: "In this environment, property investment in Dubai has emerged as one of the most credible and data-backed alternative investment avenues available today. Foreign investors now account for over 40% of residential property ownership in Dubai." },
        { type: 'image' as const, value: "ChatGPT-Image-Feb-5-2026-12_33_5_xkbm7w" },
        { type: 'text' as const, value: "One of the strongest foundations lies in its tax structure. There is no capital gains tax on property sales, no annual property tax, and no income tax on residential rental earnings." },
        { type: 'image' as const, value: "output-1_giylnu" },
        { type: 'text' as const, value: "For US expatriates, investing abroad reduces dependency on domestic economic cycles. When aligned with credible developers like Danube Properties, the risks are significantly minimized." }
      ]
    },
    {
      title: "How is Rental Yield Calculated in Dubai Real Estate",
      slug: "how-rental-yield-calculated-dubai",
      thumbnail: "uae-golden-visa-advantages_pkocmp",
      excerpt: "Understanding the difference between gross and net rental yield is the foundation of successful real estate investment in Dubai.",
      blocks: [
        { type: 'text' as const, value: "At its most basic level, rental yield measures the income a property generates against its value. The standard formula is: (Annual Rental Income ÷ Property Price) × 100." },
        { type: 'text' as const, value: "Net yield reflects the income that remains after expenses including service charges, management fees, maintenance, and insurance. In Dubai, average operating expenses reduce gross yields by 1.5 to 2%." }
      ]
    },
    {
      title: "How to Build a Profitable Real Estate Portfolio in Dubai in 2026",
      slug: "build-profitable-real-estate-portfolio-2026",
      thumbnail: "salary-needed-to-buy-property-dubai_ute9c7",
      excerpt: "Building a portfolio in 2026 requires a shift from speculative momentum to data-driven, long-term asset management.",
      blocks: [
        { type: 'text' as const, value: "Dubai’s real estate has evolved into a data-driven ecosystem. In 2025, the market recorded transactions worth AED 917 billion, marking a 20% YoY growth." },
        { type: 'text' as const, value: "A well-structured portfolio balances rental income for cash flow, capital appreciation for growth, and liquidity for flexibility. We recommend a mix of high-yield rental assets and capital growth properties." }
      ]
    },
    {
      title: "Palm Jebel Ali vs. Palm Jumeirah: Which Waterfront Destination Truly Stands Out?",
      slug: "palm-jebel-ali-vs-palm-jumeirah",
      thumbnail: "palm-jebel-ali-vs-palm-jumeirah_oxqe4q",
      excerpt: "Comparing Dubai's two iconic palms involves understanding the shift from a stabilized luxury market to a massive new frontier.",
      blocks: [
        { type: 'text' as const, value: "Palm Jumeirah functions as a destination that enhances the UAE’s luxurious lifestyle and is a stabilized asset class. With rental yields between 5.5% and 7%, it remains a primary choice for capital preservation." },
        { type: 'text' as const, value: "Palm Jebel Ali’s relaunch in 2023 was recalibrated for a very different UAE. It is approximately twice the size of Palm Jumeirah, offering over 110 kilometres of waterfront properties." }
      ]
    },
    {
      title: "Mortgage Guide for Freelancers in the UAE: Requirements, Steps, and Tips for Approval",
      slug: "mortgage-guide-freelancers-uae",
      thumbnail: "uae-freelancer-mortgage-guide_wvqnfg",
      excerpt: "Traditional employment is no longer the only gateway to homeownership. Explore how freelancers can navigate the Dubai mortgage landscape.",
      blocks: [
        { type: 'text' as const, value: "With a growing freelance workforce spanning technology, design, and consulting, mortgages for independent professionals have become increasingly structured. Banks now focus on cash flow consistency rather than just fixed salaries." },
        { type: 'text' as const, value: "Most banks require a minimum monthly income starting from AED 15,000 to AED 20,000. Freelancers are expected to show a minimum of 12 to 24 months of consistent income and a valid trade license." },
        { type: 'text' as const, value: "Developers like Danube Properties simplify this further. Our 1% monthly payment plans align naturally with freelance income patterns, reducing upfront financial pressure." }
      ]
    },
    {
      title: "Dubai Property Market Outlook: Is the Next Cycle a Boom or a Slowdown?",
      slug: "dubai-property-market-outlook-2026",
      thumbnail: "dubai-property-market-outlook-2026_lm8tnx",
      excerpt: "As we move into 2026, the Dubai property market reflects maturity rather than speculation. We break down what to expect in the coming months.",
      blocks: [
        { type: 'text' as const, value: "Rising property prices and strong rental demand signal continued strength, though supply pressures raise valid questions about long-term value. Currently, average prices stand at approximately AED 1,750 per sq. ft." },
        { type: 'text' as const, value: "The apartment segment remains the backbone of the market, driven by population growth. Meanwhile, off-plan transactions account for over 70% of sales, indicating high confidence in future delivery." },
        { type: 'text' as const, value: "Success in 2026 is not about timing the market; it is about choosing the right developer and functional layouts that perform reliably across cycles." }
      ]
    }
  ];
  
  // Generate 12 blog posts (2 repetitions of the 6 articles)
  export const blogData: BlogArticle[] = Array.from({ length: 12 }).map((_, i) => {
    const source = sourceBlogs[i % sourceBlogs.length];
    const date = new Date();
    date.setDate(date.getDate() - (i * 3));
    
    return {
      id: `blog-${i + 1}`,
      slug: i < 6 ? source.slug : `${source.slug}-${i}`, 
      title: source.title,
      publishedAt: date.toISOString(),
      thumbnail: source.thumbnail,
      excerpt: source.excerpt,
      blocks: source.blocks as ContentBlock[]
    };
  });