// src/app/[locale]/admin/projects/page.tsx

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// 1. Interface for Project List data to eliminate 'any'
interface ProjectListDoc {
  _id: string;
  title: string;
  slug: string;
  isLatestLaunch: boolean;
  isFeatured: boolean;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectListDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data || []);
        }
      })
      .catch(err => console.error("Dashboard Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto text-black font-medium">
      <div className="flex justify-between items-center mb-10 border-b-2 border-danube-gold pb-6">
        <div>
          <h1 className="text-4xl font-primary text-danube-navy uppercase">Projects Control</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Database Management System</p>
        </div>
        
        {/* THE ADD PROJECT BUTTON */}
        <Link 
          href="/admin/projects/new"
          className="bg-danube-navy text-white px-8 py-4 text-sm font-secondary tracking-widest hover:bg-black transition-all shadow-lg"
        >
          + ADD NEW PROJECT
        </Link>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-danube-gold rounded-full"></div>
            <p className="text-sm uppercase">Syncing with MongoDB...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-20 text-center border-2 border-dashed rounded-lg bg-gray-50">
            <p className="text-gray-400 uppercase text-sm tracking-widest">No projects found in database.</p>
          </div>
        ) : (
            projects.map((p: ProjectListDoc) => (
                <div key={p._id} className="border p-6 flex justify-between items-center bg-white shadow-sm hover:border-danube-gold transition-all group">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold uppercase group-hover:text-danube-gold transition-colors">{p.title}</h2>
                            {p.isLatestLaunch && (
                                <span className="text-[10px] bg-danube-gold text-white px-2 py-0.5 rounded">LATEST</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 font-mono">/projects/{p.slug}</p>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Link 
                            href={`/en/projects/${p.slug}`} 
                            target="_blank"
                            className="text-xs font-bold text-gray-400 hover:text-danube-navy uppercase tracking-tighter"
                        >
                            View Live
                        </Link>
                        <button className="bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 p-2 rounded transition-colors text-xs font-bold uppercase">
                            Delete
                        </button>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}