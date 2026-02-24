// src/components/shared/Navbar.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { Phone, ChevronDown, Menu, X, Plus } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import AdminLoginModal from "../admin/AdminLoginModal";
import ClientOnlyAdmin from "@/components/admin/ClientOnlyAdmin"; // ADDED

/* =========================
    TYPES & DATA
========================= */
interface Project {
  _id: string;
  title: string;
  slug: string;
  status: "latest" | "ongoing" | "completed" | "hidden";
}

interface NavItem {
  name: string;
  type: "projects" | "list";
  basePath?: string;
  items?: string[];
}

const generateSlug = (name: string) => 
  name.toLowerCase()
    .replace("1%", "1")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const NAV_STRUCTURE = (isEn: boolean): NavItem[] => [
  {
    name: isEn ? "PROJECTS" : "المشاريع",
    type: "projects",
    basePath: "projects",
  },
  {
    name: isEn ? "DANUBE ASSIST" : "دانوب أسيست",
    type: "list",
    basePath: "assist",
    items: isEn 
      ? ["1% PAYMENT PLAN", "DANUBE MAP", "ADMIN PORTAL"] 
      : ["خطة دفع 1%", "خريطة دانوب", "بوابة المسؤول"],
  },
  {
    name: isEn ? "ABOUT US" : "معلومات عنا",
    type: "list",
    basePath: "about",
    items: isEn 
      ? ["COMPANY PROFILE", "LEADERSHIP TEAM", "MANAGEMENT TEAM", "OUR JOURNEY"] 
      : ["ملف الشركة", "فريق القيادة", "فريق الإدارة", "رحلتنا"],
  },
  {
    name: isEn ? "MEDIA" : "إعلام",
    type: "list",
    basePath: "media",
    items: isEn 
      ? ["NEWS", "VIDEO", "3D TOURS", "BLOGS"] 
      : ["أخبار", "فيديو", "جولات ثلاثية الأبعاد", "مدونات"],
  },
];

export default function Navbar({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const menuData = NAV_STRUCTURE(isEn);
  const { isAdmin, logout } = useAdmin();

  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeProjectCol, setActiveProjectCol] = useState<string>("latest");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        if (data.success) setDbProjects(data.data);
      } catch (err) {
        console.error("Navbar sync error:", err);
      }
    };
    fetchProjects();
  }, []);

  const getProjectsByStatus = (status: string) => 
    dbProjects.filter((p) => p.status === status);

  const projectColumns = [
    { key: "latest", label: isEn ? "LATEST LAUNCHES" : "أحدث الإطلاقات" },
    { key: "ongoing", label: isEn ? "ONGOING PROJECTS" : "مشاريع مستمرة" },
    { key: "completed", label: isEn ? "COMPLETED PROJECTS" : "مشاريع مكتملة" },
  ];

  return (
    <>
      <nav className="fixed w-full top-0 left-0 z-[100] h-[65px] lg:h-[80px] border-b border-white/5 bg-black/60 ">
        <div className="max-w-[1440px] mx-auto h-full px-4 lg:px-8 flex justify-between items-center">
          
          <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href={`/${locale}`} className="shrink-0">
            <div className="w-[160px] lg:w-[340px] h-[40px] lg:h-[70px] relative">
              <CldImage width="400" height="80" src="danube-header-logo_udzvhz" alt="DANUBE" className="object-contain w-full h-full" priority />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10 h-full">
            {menuData.map((menu) => (
              <div 
                key={menu.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenMenu(menu.name)}
                onMouseLeave={() => { setOpenMenu(null); setActiveProjectCol("latest"); }}
              >
                <button className="flex items-center gap-1.5 text-[14px] font-medium uppercase text-white hover:text-danube-gold transition-colors tracking-wider">
                  {menu.name} <ChevronDown className="w-4 h-4 opacity-50" />
                </button>

                {menu.type === "projects" && openMenu === menu.name && (
                  <div className="absolute top-[80px] left-0 flex shadow-2xl">
                    <div className="w-[280px] bg-white border-r border-gray-100">
                      {projectColumns.map((col) => (
                        <div
                          key={col.key}
                          onMouseEnter={() => setActiveProjectCol(col.key)}
                          className={`px-6 py-5 text-[12px] font-bold tracking-widest cursor-pointer uppercase transition-all ${activeProjectCol === col.key ? "bg-gray-50 text-danube-gold" : "text-gray-700 hover:text-danube-gold"}`}
                        >
                          {col.label}
                        </div>
                      ))}
                    </div>
                    
                    <div className="w-[300px] p-8 bg-white flex flex-col gap-3 min-h-[300px]">
                      <div className="flex-1 space-y-3">
                        {getProjectsByStatus(activeProjectCol).map((p) => (
                          <Link 
                            key={p._id} 
                            href={`/${locale}/projects/${p.slug}`} 
                            className="text-[11px] font-bold text-gray-400 hover:text-danube-gold tracking-widest uppercase block transition-colors"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>

                      {/* FIXED: Wrapped in ClientOnlyAdmin to stop Hydration Error */}
                      <ClientOnlyAdmin>
                        {isAdmin && (
                          <Link 
                            href={`/${locale}/admin/projects/new`}
                            className="mt-4 flex items-center justify-center gap-2 border-2 border-danube-navy text-danube-navy hover:bg-danube-navy hover:text-white py-3 text-[10px] font-bold tracking-widest transition-all"
                          >
                            <Plus size={14} /> {isEn ? "ADD PROJECT" : "إضافة مشروع"}
                          </Link>
                        )}
                      </ClientOnlyAdmin>
                    </div>
                  </div>
                )}

                {menu.type === "list" && openMenu === menu.name && (
                  <ul className="absolute top-[80px] left-0 py-4 bg-white shadow-xl min-w-[240px]">
                    {menu.items?.map((item, idx) => {
                      const isPortal = item === "ADMIN PORTAL" || item === "بوابة المسؤول";
                      return (
                        <li key={idx} className="px-6 py-3 text-[12px] font-bold text-gray-700 hover:text-danube-gold tracking-widest uppercase">
                          {isPortal ? (
                            /* FIXED: Wrapped specifically the portal button to avoid text mismatch */
                            <ClientOnlyAdmin>
                                <button onClick={() => isAdmin ? (confirm("Logout?") && logout()) : setIsModalOpen(true)} className="w-full text-left">
                                  {isAdmin ? (isEn ? "LOGOUT ADMIN" : "خروج المسؤول") : item}
                                </button>
                            </ClientOnlyAdmin>
                          ) : (
                            <Link href={`/${locale}/${menu.basePath}/${generateSlug(item)}`} className="block w-full">{item}</Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
              <Phone size={16} /> <span className="hidden xl:inline">{isEn ? "CONTACT" : "اتصال"}</span>
            </button>
            <Link href={isEn ? "/ar" : "/en"} className="text-[13px] font-bold uppercase px-2 text-white hover:text-danube-gold">
              {isEn ? "AR" : "EN"}
            </Link>
          </div>
        </div>
      </nav>

      <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-transform duration-500 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="relative w-[80%] h-full bg-[#0A1A2F] p-8 overflow-y-auto pt-24">
          <div className="flex flex-col gap-8">
            {menuData.map((menu) => (
              <div key={menu.name} className="space-y-4">
                <p className="text-danube-gold text-[12px] font-bold tracking-widest uppercase">{menu.name}</p>
                <div className={`flex flex-col gap-3 border-white/10 ${isEn ? "pl-4 border-l" : "pr-4 border-r"}`}>
                  {menu.type === "projects" ? (
                    projectColumns.map(col => (
                      <div key={col.key} className="space-y-2">
                        <p className="text-white/40 text-[10px] italic font-bold">{col.label}</p>
                        {getProjectsByStatus(col.key).map(p => (
                          <Link key={p._id} href={`/${locale}/projects/${p.slug}`} className="text-white text-[13px] opacity-70 block uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    ))
                  ) : (
                    menu.items?.map((item, idx) => (
                      <Link key={idx} href={`/${locale}/${menu.basePath}/${generateSlug(item)}`} className="text-white text-[13px] opacity-70 block uppercase" onClick={() => setIsMobileMenuOpen(false)}>{item}</Link>
                    ))
                  )}
                  {/* FIXED: Wrapped mobile admin link in ClientOnlyAdmin */}
                  {menu.type === "projects" && (
                    <ClientOnlyAdmin>
                      {isAdmin && (
                        <Link href={`/${locale}/admin/projects/new`} className="text-danube-gold font-bold text-[12px] pt-2" onClick={() => setIsMobileMenuOpen(false)}>
                          + ADD NEW PROJECT
                        </Link>
                      )}
                    </ClientOnlyAdmin>
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