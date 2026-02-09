// src/components/shared/Navbar.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { Phone, ChevronDown, MessageCircle, Menu, X } from "lucide-react";

/* =========================
    TYPES & DATA
========================= */
interface NavColumn {
  key: string;
  label: string;
  items: string[];
}

interface NavItem {
  name: string;
  type: "projects" | "list";
  columns?: NavColumn[];
  items?: string[];
  basePath?: string; 
}

const generateSlug = (name: string) => 
  name.toLowerCase()
    .replace("1%", "1") // This turns "1% PAYMENT PLAN" into "1-payment-plan"
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const NAV_STRUCTURE = (isEn: boolean): NavItem[] => [
  {
    name: isEn ? "PROJECTS" : "المشاريع",
    type: "projects",
    basePath: "projects",
    columns: [
      {
        key: "latest",
        label: isEn ? "LATEST LAUNCHES" : "أحدث الإطلاقات",
        items: ["SHAHRUKHZ", "BREEZ", "ASPIRZ", "SPARKLZ", "TIMZ", "BAYZ 102", "OASIZ", "OASIZ 2"],
      },
      {
        key: "ongoing",
        label: isEn ? "ONGOING PROJECTS" : "مشاريع مستمرة",
        items: ["DIAMONDZ", "BAYZ 101", "SPORTZ", "OCEANZ", "ELITZ 3", "ELITZ 2", "FASHIONZ", "VIEWZ", "ELITZ", "PETALZ", "SKYZ"],
      },
      {
        key: "completed",
        label: isEn ? "COMPLETED PROJECTS" : "مشاريع مكتملة",
        items: ["OPALZ", "GEMZ", "PEARLZ", "JEWELZ", "WAVEZ", "ELEGANZ", "OLIVZ", "ELZ", "LAWNZ", "BAYZ", "MIRACLZ", "RESORTZ", "GLAMZ", "STARZ"],
      },
    ],
  },
  {
    name: isEn ? "DANUBE ASSIST" : "دانوب أسيست",
    type: "list",
    basePath: "assist",
    items: ["1% PAYMENT PLAN", "DANUBE MAP", "BROKER PORTAL"],
  },
  {
    name: isEn ? "ABOUT US" : "معلومات عنا",
    type: "list",
    basePath: "about",
    items: ["COMPANY PROFILE", "LEADERSHIP TEAM", "MANAGEMENT TEAM", "OUR JOURNEY"],
  },
  {
    name: isEn ? "MEDIA" : "إعلام",
    type: "list",
    basePath: "media",
    items: ["NEWS", "VIDEO", "3D TOURS", "BLOGS"],
  },
];

export default function Navbar({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const menuData = NAV_STRUCTURE(isEn);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeProjectCol, setActiveProjectCol] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Reduced h-[110px] to h-[80px] for a slimmer look */}
      <nav className="fixed w-full top-0 left-0 z-[100] h-[65px] lg:h-[80px] border-b border-white/5 bg-black/60 ">
        <div className="max-w-[1440px] mx-auto h-full px-4 lg:px-8 flex justify-between items-center">
          
          {/* MOBILE MENU TOGGLE */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* LOGO - Adjusted width and height for the slimmer header */}
          <Link href={`/${locale}`} className="shrink-0 flex items-center">
  <div className="w-[160px] lg:w-[340px] h-[40px] lg:h-[70px] relative">
    <CldImage
      width="400" 
      height="80"
      src="danube-header-logo_udzvhz"
      alt="DANUBE PROPERTIES"
      className="object-contain w-full h-full cursor-pointer"
      priority
    />
  </div>
</Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center justify-center space-x-8 h-full">
            {menuData.map((menu) => (
              <div
                key={menu.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenMenu(menu.name)}
                onMouseLeave={() => {
                  setOpenMenu(null);
                  setActiveProjectCol(null);
                }}
              >
                <button className="flex items-center gap-1 text-[13px] font-medium uppercase transition-colors text-white hover:text-danube-gold tracking-wider">
                  {menu.name} 
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>

                {/* PROJECTS DROPDOWN */}
                {menu.type === "projects" && openMenu === menu.name && (
                  <div className="absolute top-full left-0 flex shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="w-[260px] bg-white border-r border-gray-100">
                      {menu.columns?.map((col) => (
                        <div
                          key={col.key}
                          onMouseEnter={() => setActiveProjectCol(col.key)}
                          className={`px-6 py-4 text-[11px] font-bold tracking-widest cursor-pointer uppercase transition-all ${activeProjectCol === col.key ? "bg-gray-50 text-danube-gold" : "text-gray-700"}`}
                        >
                          {col.label}
                        </div>
                      ))}
                    </div>
                    {activeProjectCol && (
                      <div className="w-[260px] p-6 bg-white flex flex-col gap-2.5">
                        {menu.columns?.find((c) => c.key === activeProjectCol)?.items.map((item) => (
                          <Link 
                            key={item} 
                            href={`/${locale}/projects/${generateSlug(item)}`} 
                            className="text-[10px] font-bold text-gray-400 hover:text-danube-navy tracking-widest uppercase block transition-colors"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* LIST DROPDOWN */}
                {menu.type === "list" && openMenu === menu.name && (
                  <ul className="absolute top-full left-0 py-3 bg-white shadow-xl min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
                    {menu.items?.map((item) => (
                      <li key={item} className="px-6 py-2.5 text-[11px] font-bold text-gray-700 hover:text-danube-gold tracking-widest uppercase cursor-pointer">
                        <Link href={`/${locale}/${menu.basePath}/${generateSlug(item)}`} className="block w-full">
                           {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* CTA TOOLS - Slimmer padding */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button className="flex items-center gap-2 border border-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
              <Phone size={14} />
              <span className="hidden xl:inline">CONTACT</span>
            </button>
            
            <Link
              href="https://wa.me/yournumber"
              target="_blank"
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 text-[11px] font-bold uppercase hover:bg-[#1ebd57] transition-all"
            >
              <MessageCircle size={15} />
              <span className="hidden xl:inline">WHATSAPP</span>
            </Link>

            <Link href={isEn ? "/ar" : "/en"} className="text-[12px] font-bold uppercase px-1 text-white hover:text-danube-gold">
              {isEn ? "AR" : "EN"}
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER OVERLAY (Unchanged logic) */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="relative w-[80%] h-full bg-[#0A1A2F] p-8 overflow-y-auto pt-24 shadow-2xl border-r border-white/5 text-left rtl:text-right">
          <div className="flex flex-col gap-8">
            {menuData.map((menu) => (
              <div key={menu.name} className="space-y-4">
                <p className="text-danube-gold text-[11px] font-bold tracking-[0.2em] uppercase">{menu.name}</p>
                <div className="flex flex-col gap-3 pl-2 border-l border-white/10">
                  {menu.type === "list" ? (
                    menu.items?.map(item => (
                      <Link 
                        key={item} 
                        href={`/${locale}/${menu.basePath}/${generateSlug(item)}`} 
                        className="text-white text-[13px] font-medium tracking-wide uppercase opacity-70 hover:opacity-100" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    ))
                  ) : (
                    menu.columns?.map(col => (
                      <div key={col.key} className="space-y-2 py-2">
                        <p className="text-white text-[11px] font-bold opacity-40 italic underline decoration-danube-gold">{col.label}</p>
                        <div className="flex flex-col gap-2 pl-4">
                          {col.items.map(item => (
                            <Link 
                              key={item} 
                              href={`/${locale}/projects/${generateSlug(item)}`}
                              className="text-white text-[12px] font-medium tracking-wide uppercase opacity-70" 
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}