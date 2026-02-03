// src/components/home/HeroSection.tsx

"use client";

const HERO_DATA = (isEn: boolean) => ({
  videoUrl: "https://res.cloudinary.com/dwjtnaell/video/upload/v1769065081/SRK_danube_w5i94j.mp4",
  bannerTitle: isEn ? "LATEST LAUNCH" : "أحدث إطلاق",
  bannerProjectName: "SHAHRUKHZ BY DANUBE",
});

export default function HeroSection({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const data = HERO_DATA(isEn);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <section className="relative h-screen w-full overflow-hidden bg-black">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
    style={{ 
      // objectPosition: 'top' ensures the top of the video is the anchor
      objectPosition: 'center top',
      // translateY(38px) drops it by ~1cm
      // scale(1.05) ensures no black bars appear at the top after the drop
      transform: 'translateY(20px) scale(1.05)',
    }} 
  >
    <source src={data.videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  
  {/* Subtle overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
</section>

      <section className="bg-[#F9F9F9] py-24 px-6 flex flex-col items-center text-center">
        {/* LATEST LAUNCH TAG */}
        <span 
          style={{
            color: 'rgb(74, 75, 75)',
            fontFamily: 'var(--font-secondary)', // Use variable
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '3px',
            lineHeight: '19.5px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            display: 'block',
            width: '484px',
            maxWidth: '100%',
          }}
        >
          {data.bannerTitle}
        </span>
        
        {/* PROJECT TITLE */}
        <h2 
          style={{ 
            color: 'rgb(189, 165, 136)',
            fontFamily: 'var(--font-primary)', // Use variable
            fontSize: '39px', 
            fontWeight: 400,
            letterSpacing: '1.7px',
            lineHeight: '35px',
            height: '35px',
            textTransform: 'uppercase',
            width: '484px',
            maxWidth: '100%',
            marginBottom: '50px',
            display: 'block',
            textAlign: 'center'
          }}
        >
          {data.bannerProjectName}
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mt-8">
  {/* DISCOVER BUTTON */}
<button 
  suppressHydrationWarning
  style={{
    backgroundColor: 'rgb(85, 85, 85)',
    color: 'rgb(255, 255, 255)',
    width: '180px',
    height: '56px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', // Slightly more space for the leading icon
    padding: '0 30px',
    border: 'none',
    borderRadius: '0px',
    fontFamily: 'var(--font-secondary)',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    transition: 'all 0.4s ease',
    WebkitFontSmoothing: 'antialiased',
    boxSizing: 'border-box'
  }}
  className="hover:bg-black"
>
  {/* Icon now placed BEFORE the text */}
  <svg 
    width="13" 
    height="13" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>

  {isEn ? "DISCOVER" : "اكتشف"}
</button>

  {/* REGISTER INTEREST BUTTON */}
  <button 
    suppressHydrationWarning
    style={{
      backgroundColor: 'rgb(189, 165, 136)',
      color: 'rgb(255, 255, 255)',
      width: '240px', // Increased from 202px to fix the wrap issue
      height: '56px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 30px',
      border: 'none',
      borderRadius: '0px',
      fontFamily: 'var(--font-secondary)',
      fontSize: '13px', // Bumped by 1px
      fontWeight: 600,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap', // STOPS THE LINE BREAK
      transition: 'all 0.4s ease',
      WebkitFontSmoothing: 'antialiased',
      boxSizing: 'border-box'
    }}
    className="hover:opacity-90 shadow-sm"
  >
    {isEn ? "REGISTER INTEREST" : "سجل اهتمامك"}
  </button>
</div>
      </section>
    </div>
  );
}