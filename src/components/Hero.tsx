import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Download } from 'lucide-react';

interface HeroProps {
  onStartManual: () => void;
  onStartAutomatic: () => void;
  onBrowseTemplates: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartManual, onStartAutomatic, onBrowseTemplates }) => {
  return (
    <div className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-top-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen ATS-Compliant Resume Builder</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Build a Resume That <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
            Opens Doors.
          </span>
        </h1>

        <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed font-normal">
          Choose a professionally engineered design, enter your details directly or via our guided wizard, and download an interview-ready, ATS-optimized PDF in minutes.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onStartAutomatic}
            className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            Automatic Guided Mode
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onStartManual}
            className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-xs transition flex items-center justify-center gap-2"
          >
            Direct Editor (Manual)
          </button>

          <button
            type="button"
            onClick={onBrowseTemplates}
            className="w-full sm:w-auto px-5 py-3.5 text-slate-600 hover:text-slate-900 font-semibold text-sm transition"
          >
            Browse Designs →
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          No sign-up required • 100% Free & Private • Browser Local Storage
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-200 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Dual Creation Flow</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Confident writers can jump straight into the live split-screen editor, while beginners can follow a painless 5-step guided wizard.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-200 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">100% Client-Side Privacy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your personal credentials, employment history, and contact numbers never leave your browser. Zero cloud tracking or data selling.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-purple-200 transition">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <Download className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Pixel-Perfect Vector PDF</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Exports crisp, selectable-text PDFs that pass recruiter ATS software effortlessly, without blurry image rasterization.
          </p>
        </div>
      </div>
    </div>
  );
};
