import React, { useRef, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { ThemeToggle } from './ThemeToggle';
import { FileText, Sparkles, Download, Menu, X, Layers, Edit3 } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'templates' | 'builder' | 'wizard') => void;
  onOpenPreflight: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenPreflight }) => {
  const { importJSON } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importJSON(content);
          if (success) {
            alert('Resume data successfully imported!');
            onNavigate('builder');
          } else {
            alert('Could not parse resume data file. Please ensure it is a valid ResumeCraft JSON export.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const navItems = [
    { id: 'home'      as const, label: 'Overview',      icon: FileText },
    { id: 'templates' as const, label: 'Templates',     icon: Layers   },
    { id: 'builder'   as const, label: 'Live Editor',   icon: Edit3    },
    { id: 'wizard'    as const, label: 'Guided Wizard', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 print:hidden shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Brand */}
        <div
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Resume<span className="text-blue-600 dark:text-blue-400">Craft</span>
          </span>
        </div>

        {/* Nav tabs — desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold border border-slate-200/60 dark:border-slate-700/80">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = currentView === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-400'}`} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle + Export + mobile toggle */}
        <div className="flex items-center gap-2">
          {/* Hidden file input for restore */}
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} className="hidden" />

          {/* Theme Preference Toggle */}
          <ThemeToggle variant="dropdown" />

          {/* Export PDF */}
          <button
            type="button"
            onClick={onOpenPreflight}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = currentView === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { onNavigate(id); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Theme Preference
            </span>
            <ThemeToggle variant="segmented" />
          </div>
        </div>
      )}
    </header>
  );
};
