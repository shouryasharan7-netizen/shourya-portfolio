"use client";

import React, { useState, useRef } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import {
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Sidebar,
  FileText,
  Upload,
  CheckCircle2,
  Award,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import {
  PERSONAL_INFO,
  ROLES_DATA,
  PROJECTS_DATA,
  RECOGNITIONS_DATA,
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
} from "@/data/portfolioData";

interface PreviewAppProps {
  onClose: () => void;
  onMinimize: () => void;
}

export function PreviewApp({ onClose, onMinimize }: PreviewAppProps) {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [customPdfUploaded, setCustomPdfUploaded] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setCustomPdfUploaded(url);
      soundEngine.playWindowClick();
    }
  };

  const handlePrintDownload = () => {
    soundEngine.playWindowClick();
    window.print();
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1A1A22] text-zinc-100 rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* macOS Preview Window Titlebar & Toolbar */}
      <div className="h-11 bg-[#262630] border-b border-black/40 flex items-center justify-between px-3.5 select-none flex-shrink-0">
        {/* Left: Window Controls + Sidebar Toggle */}
        <div className="flex items-center gap-3">
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity"
              title="Close"
              aria-label="Close"
            />
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity"
              title="Minimize"
              aria-label="Minimize"
            />
            <button
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 transition-opacity"
              title="Zoom"
              aria-label="Zoom"
            />
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1 rounded hover:bg-white/10 transition-colors ${
              sidebarOpen ? "text-amber-400 bg-white/5" : "text-zinc-400"
            }`}
            title="Toggle Thumbnails Sidebar"
          >
            <Sidebar className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Window Title */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium truncate max-w-xs sm:max-w-md">
          <FileText className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <span className="truncate">
            {customPdfUploaded ? "Custom_Resume.pdf" : "Shourya_Sharan_Resume_Official.pdf"}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">({zoomLevel}%)</span>
        </div>

        {/* Right Toolbar Tools */}
        <div className="flex items-center gap-2">
          {/* Page Navigator */}
          <div className="flex items-center bg-black/30 rounded px-1.5 py-0.5 border border-white/5 text-[11px] font-mono text-zinc-300">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-0.5 hover:text-white disabled:opacity-30"
              title="Previous Page"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="px-1.5">{currentPage} / 2</span>
            <button
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
              className="p-0.5 hover:text-white disabled:opacity-30"
              title="Next Page"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Zoom Buttons */}
          <button
            onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
            className="p-1 rounded hover:bg-white/10 text-zinc-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
            className="p-1 rounded hover:bg-white/10 text-zinc-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Upload Custom PDF button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono border border-white/10 transition-colors"
            title="Upload custom resume PDF"
          >
            <Upload className="w-3 h-3 text-sky-400" />
            <span>Load PDF</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Download / Print PDF */}
          <button
            onClick={handlePrintDownload}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/90 hover:bg-amber-400 text-black text-[11px] font-semibold transition-colors shadow-sm"
            title="Download or Print Resume"
          >
            <Download className="w-3 h-3 text-black" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Sidebar + PDF Reader Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Thumbnails Sidebar */}
        {sidebarOpen && (
          <aside
            aria-label="Resume Page Navigation"
            className="w-44 bg-[#141419] border-r border-black/40 flex flex-col p-3 gap-3 overflow-y-auto flex-shrink-0"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-1">
              Thumbnails
            </span>

            {/* Page 1 Thumbnail */}
            <div
              onClick={() => {
                setCurrentPage(1);
                soundEngine.playWindowClick();
              }}
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                currentPage === 1
                  ? "bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/40"
                  : "bg-black/30 border-white/5 hover:border-white/20"
              }`}
            >
              <div className="aspect-[8.5/11] bg-white text-zinc-900 rounded p-1.5 text-[5px] leading-tight overflow-hidden select-none pointer-events-none shadow-sm">
                <div className="font-bold text-[6px] border-b border-zinc-300 pb-0.5 mb-1">
                  SHOURYA SHARAN
                </div>
                <div className="text-[4px] text-zinc-600 mb-1">
                  CSO • UI ARCHITECT • ML RESEARCHER
                </div>
                <div className="bg-zinc-100 p-0.5 rounded mb-0.5 font-semibold">
                  EXPERIENCE (7 ROLES)
                </div>
                <div className="space-y-0.5 text-zinc-500">
                  <div>• Walnut Initiative CSO</div>
                  <div>• Descreened UI Architect</div>
                  <div>• STEMinate Researcher</div>
                </div>
                <div className="bg-zinc-100 p-0.5 rounded mt-1 font-semibold">
                  INVENTIONS (3 PATENTS)
                </div>
              </div>
              <div className="text-[10px] font-mono text-center text-zinc-400 mt-1.5">
                Page 1 — Experience
              </div>
            </div>

            {/* Page 2 Thumbnail */}
            <div
              onClick={() => {
                setCurrentPage(2);
                soundEngine.playWindowClick();
              }}
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                currentPage === 2
                  ? "bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/40"
                  : "bg-black/30 border-white/5 hover:border-white/20"
              }`}
            >
              <div className="aspect-[8.5/11] bg-white text-zinc-900 rounded p-1.5 text-[5px] leading-tight overflow-hidden select-none pointer-events-none shadow-sm">
                <div className="font-bold text-[6px] border-b border-zinc-300 pb-0.5 mb-1">
                  HONORS & CERTIFICATIONS
                </div>
                <div className="space-y-0.5 text-zinc-500">
                  <div>• CBSE Heritage Quiz (Top 5)</div>
                  <div>• Resera Hackathon ($1,000)</div>
                  <div>• Published Author "A Soldier's Story"</div>
                  <div>• IIT Madras AI & Data Science</div>
                  <div>• Class 10 CBSE 97% Top 1%</div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-center text-zinc-400 mt-1.5">
                Page 2 — Credentials
              </div>
            </div>

            {/* Drop Placeholder Note */}
            <div className="mt-auto p-2.5 rounded-lg border border-dashed border-white/10 text-[10px] font-mono text-zinc-400 text-center">
              <Upload className="w-3.5 h-3.5 mx-auto mb-1 text-zinc-500" />
              <span>Drop custom PDF here to view</span>
            </div>
          </aside>
        )}

        {/* Document Canvas Viewport */}
        <div className="flex-1 bg-[#101015] p-4 sm:p-8 overflow-y-auto flex justify-center items-start">
          {customPdfUploaded ? (
            /* Custom user-uploaded PDF iframe embed */
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
              className="w-full max-w-3xl h-[850px] bg-white rounded shadow-2xl overflow-hidden"
            >
              <iframe
                src={customPdfUploaded}
                className="w-full h-full border-none"
                title="Custom Resume PDF"
              />
            </div>
          ) : (
            /* High-Fidelity Rendered 2-Page Resume */
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
                transition: "transform 0.15s ease-out",
              }}
              className="w-full max-w-3xl bg-[#FCFCFD] text-zinc-900 rounded-sm shadow-2xl p-8 sm:p-12 font-sans select-text my-2"
            >
              {currentPage === 1 ? (
                /* PAGE 1: HEADER + LEADERSHIP & SCIENCE ROLES + INVENTIONS */
                <div>
                  {/* Header */}
                  <div className="border-b-2 border-zinc-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-sans uppercase">
                        {PERSONAL_INFO.name}
                      </h1>
                      <p className="text-sm font-semibold text-zinc-700 tracking-wide mt-0.5">
                        Chief Science Officer • UI/UX Architect • Computational ML Researcher
                      </p>
                    </div>

                    <div className="text-right text-[11px] font-mono text-zinc-600 space-y-0.5">
                      <div>{PERSONAL_INFO.email}</div>
                      <div>{PERSONAL_INFO.phone}</div>
                      <div>{PERSONAL_INFO.location}</div>
                      <div className="text-amber-700 font-bold">{PERSONAL_INFO.portfolioUrl}</div>
                    </div>
                  </div>

                  {/* Summary / Thesis */}
                  <div className="mb-6 bg-zinc-100/80 p-3.5 rounded border border-zinc-200">
                    <p className="text-xs text-zinc-800 leading-relaxed italic">
                      "{PERSONAL_INFO.tagline}" — {PERSONAL_INFO.bio}
                    </p>
                  </div>

                  {/* Section 1: Executive & Research Roles */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 border-b border-zinc-300 pb-1 mb-3">
                      <Briefcase className="w-3.5 h-3.5 text-zinc-900" />
                      <h2 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-950">
                        LEADERSHIP & ENGINEERING EXPERIENCE
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {ROLES_DATA.slice(0, 4).map((role) => (
                        <div key={role.id} className="text-xs">
                          <div className="flex items-baseline justify-between font-semibold text-zinc-950">
                            <div>
                              <span className="font-bold text-zinc-950">{role.role}</span>
                              <span className="text-zinc-600 font-normal"> — {role.organization}</span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500 flex-shrink-0">
                              {role.period}
                            </span>
                          </div>

                          <p className="text-zinc-700 text-[11px] mt-1 leading-normal">
                            {role.description}
                          </p>

                          <div className="mt-1 flex flex-wrap gap-x-3 text-[10px] text-zinc-600 font-mono">
                            {role.metrics.map((m, mi) => (
                              <span key={mi} className="text-zinc-600">
                                ✓ {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Inventions & Technical Systems */}
                  <div>
                    <div className="flex items-center gap-2 border-b border-zinc-300 pb-1 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                      <h2 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-950">
                        FEATURED INVENTIONS & SYSTEMS
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {PROJECTS_DATA.map((proj) => (
                        <div key={proj.id} className="text-xs bg-zinc-50 p-2.5 rounded border border-zinc-200">
                          <div className="flex items-baseline justify-between">
                            <span className="font-bold text-zinc-950">
                              {proj.title} <span className="text-zinc-500 font-normal">({proj.category})</span>
                            </span>
                            <span className="text-[10px] font-mono text-amber-700 font-medium">
                              Role: {proj.role}
                            </span>
                          </div>
                          <p className="text-zinc-700 text-[11px] mt-1 leading-normal">
                            {proj.overview}
                          </p>
                          <div className="mt-1 text-[10px] font-mono text-emerald-800 font-medium">
                            Impact: {proj.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Page Footer */}
                  <div className="mt-8 pt-2 border-t border-zinc-200 flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Shourya Sharan — Curriculum Vitae</span>
                    <span>Page 1 of 2</span>
                  </div>
                </div>
              ) : (
                /* PAGE 2: HONORS + CERTIFICATIONS + EDUCATION + LEADERSHIP */
                <div>
                  {/* Header */}
                  <div className="border-b-2 border-zinc-900 pb-3 mb-5 flex justify-between items-baseline">
                    <h2 className="text-lg font-extrabold uppercase tracking-tight text-zinc-950 font-sans">
                      Shourya Sharan — Credentials, Honors & Education
                    </h2>
                    <span className="text-[10px] font-mono text-zinc-500">Page 2 of 2</span>
                  </div>

                  {/* Section 1: Honors & Recognitions */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 border-b border-zinc-300 pb-1 mb-3">
                      <Award className="w-3.5 h-3.5 text-zinc-900" />
                      <h2 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-950">
                        AWARDS & HONORS (8 NATIONWIDE CREDENTIALS)
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {RECOGNITIONS_DATA.map((rec) => (
                        <div key={rec.id} className="p-2.5 rounded bg-zinc-50 border border-zinc-200 text-xs">
                          <div className="flex items-baseline justify-between font-bold text-zinc-950">
                            <span>{rec.title}</span>
                            <span className="text-[10px] font-mono text-zinc-500">{rec.year}</span>
                          </div>
                          <p className="text-[11px] text-zinc-600 mt-0.5">{rec.subtitle}</p>
                          {rec.metric && (
                            <span className="inline-block mt-1 text-[9px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">
                              {rec.metric}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Certifications */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 border-b border-zinc-300 pb-1 mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                      <h2 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-950">
                        ACADEMIC CERTIFICATIONS
                      </h2>
                    </div>

                    <div className="space-y-2">
                      {CERTIFICATIONS_DATA.map((cert, i) => (
                        <div key={i} className="flex items-baseline justify-between text-xs bg-zinc-50 p-2 rounded border border-zinc-200">
                          <div>
                            <span className="font-bold text-zinc-950">{cert.name}</span>
                            <span className="text-zinc-600"> — {cert.issuer}</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">{cert.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Education */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 border-b border-zinc-300 pb-1 mb-3">
                      <GraduationCap className="w-3.5 h-3.5 text-zinc-900" />
                      <h2 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-950">
                        EDUCATION
                      </h2>
                    </div>

                    {EDUCATION_DATA.map((edu, i) => (
                      <div key={i} className="text-xs bg-zinc-50 p-3 rounded border border-zinc-200">
                        <div className="flex items-baseline justify-between font-bold text-zinc-950">
                          <span>{edu.institution}, {edu.location}</span>
                          <span className="text-[10px] font-mono text-zinc-500">{edu.period}</span>
                        </div>
                        <div className="text-[11px] text-zinc-700 mt-1">
                          {edu.classes} • Board Score: <span className="font-bold text-emerald-800">{edu.score}</span> ({edu.percentileText})
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-zinc-600 font-mono">
                          {edu.highlights.map((h, hi) => (
                            <span key={hi} className="bg-zinc-200/70 px-1.5 py-0.5 rounded">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional School Governance Roles */}
                  <div>
                    <div className="flex items-center gap-2 border-b border-zinc-300 pb-1 mb-2">
                      <Briefcase className="w-3.5 h-3.5 text-zinc-900" />
                      <h2 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-950">
                        GOVERNANCE & AMBASSADORSHIP
                      </h2>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {ROLES_DATA.slice(4).map((role) => (
                        <div key={role.id} className="flex justify-between items-baseline text-[11px]">
                          <span>
                            <strong>{role.role}</strong> — {role.organization}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">{role.period}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Page Footer */}
                  <div className="mt-8 pt-2 border-t border-zinc-200 flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Shourya Sharan — Curriculum Vitae</span>
                    <span>Page 2 of 2</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
