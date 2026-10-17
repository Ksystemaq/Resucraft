import React, { useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { FileText, Sparkles, Download, RefreshCw, Trash2, Upload, FileDown } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'templates' | 'builder' | 'wizard') => void;
  onOpenPreflight: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenPreflight }) => {
  const { loadSampleData, clearAllData, exportJSON, importJSON } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Resume<span className="text-blue-600">Craft</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
                v2.0
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currentView === 'home'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('templates')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currentView === 'templates'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Templates
          </button>
          <button
            type="button"
            onClick={() => onNavigate('builder')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currentView === 'builder'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Editor
          </button>
          <button
            type="button"
            onClick={() => onNavigate('wizard')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
              currentView === 'wizard'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Guided Wizard
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Hidden JSON file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          />

          <div className="hidden lg:flex items-center gap-1 border-r border-slate-200 pr-2">
            <button
              type="button"
              onClick={loadSampleData}
              title="Load realistic sample data to test templates"
              className="text-xs px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Sample
            </button>
            <button
              type="button"
              onClick={exportJSON}
              title="Save a backup JSON copy to your computer"
              className="text-xs px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium flex items-center gap-1"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-400" /> Backup
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Restore from JSON backup"
              className="text-xs px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5 text-slate-400" /> Restore
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all resume fields?')) {
                  clearAllData();
                }
              }}
              title="Clear all fields"
              className="text-xs p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenPreflight}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/20 transition flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

