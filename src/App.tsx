import React, { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TemplateGallery } from './components/TemplateGallery';
import { ResumeBuilder } from './components/ResumeBuilder';
import { GuidedWizard } from './components/Wizard/GuidedWizard';
import { PreflightModal } from './components/PreflightModal';
import { ModeSelectModal } from './components/ModeSelectModal';
import { ThemeToggle } from './components/ThemeToggle';
import { ShieldCheck, Github } from 'lucide-react';

type AppView = 'home' | 'templates' | 'builder' | 'wizard';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [creationMode, setCreationMode] = useState<'manual' | 'auto'>('manual');
  const [isPreflightOpen, setIsPreflightOpen] = useState(false);
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
  const { data } = useResume();

  const handleDownloadPDF = () => {
    // Set custom print document title to match naming requirements: FirstName_LastName_Resume.pdf
    const prevTitle = document.title;
    const namePart = (data.basics.fullName || 'Candidate').trim().replace(/\s+/g, '_');
    document.title = `${namePart}_Resume`;

    // Trigger native browser print
    window.print();

    // Restore title
    setTimeout(() => {
      document.title = prevTitle;
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenPreflight={() => setIsPreflightOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <Hero
            onStartManual={() => setIsModeModalOpen(true)}
            onBrowseTemplates={() => {
              setCreationMode('manual');
              setCurrentView('templates');
            }}
          />
        )}

        {currentView === 'templates' && (
          <TemplateGallery
            creationMode={creationMode}
            onChangeMode={(mode) => setCreationMode(mode)}
            onSelect={() => {
              if (creationMode === 'auto') {
                setCurrentView('wizard');
              } else {
                setCurrentView('builder');
              }
            }}
            onLaunchWizard={() => setCurrentView('wizard')}
          />
        )}

        {currentView === 'wizard' && (
          <GuidedWizard
            onComplete={() => setCurrentView('builder')}
            onCancel={() => setCurrentView('templates')}
          />
        )}

        {currentView === 'builder' && (
          <ResumeBuilder onOpenPreflight={() => setIsPreflightOpen(true)} />
        )}
      </main>

      {/* Preflight Modal */}
      <PreflightModal
        isOpen={isPreflightOpen}
        onClose={() => setIsPreflightOpen(false)}
        onConfirmDownload={handleDownloadPDF}
      />

      <ModeSelectModal
        isOpen={isModeModalOpen}
        onClose={() => setIsModeModalOpen(false)}
        onManual={() => {
          setIsModeModalOpen(false);
          setCreationMode('manual');
          setCurrentView('templates');
        }}
        onAuto={() => {
          setIsModeModalOpen(false);
          setCreationMode('auto');
          setCurrentView('templates');
        }}
      />

      {/* ── Footer ── */}
      <footer className="bg-slate-900 border-t border-slate-800 print:hidden" aria-label="Site footer">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top row: logo + nav + theme */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Brand */}
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-lg text-left"
              aria-label="Go to homepage"
            >
              <svg
                className="w-6 h-6 text-teal-400 group-hover:scale-105 transition-transform"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="footerTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>
                <rect x="7" y="11" width="2.4" height="10" rx="1.2" fill="url(#footerTealGrad)" />
                <rect x="11.6" y="7" width="2.4" height="14" rx="1.2" fill="url(#footerTealGrad)" />
                <rect x="16.2" y="3" width="2.4" height="18" rx="1.2" fill="url(#footerTealGrad)" />
                <path
                  d="M4.5 13.5V20.5C4.5 22.7 6.3 24.5 8.5 24.5H19.5C21.7 24.5 23.5 22.7 23.5 20.5V15"
                  stroke="url(#footerTealGrad)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-base font-bold text-white tracking-tight group-hover:text-teal-300 transition">
                ResumeCraft
              </span>
            </button>

            {/* Nav links */}
            <nav aria-label="Footer navigation" className="flex items-center gap-1">
              {(
                [
                  { label: 'Home',      view: 'home'      },
                  { label: 'Templates', view: 'templates' },
                  { label: 'Editor',    view: 'builder'   },
                  { label: 'Wizard',    view: 'wizard'    },
                ] as { label: string; view: AppView }[]
              ).map(({ label, view }) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition
                    ${currentView === view
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-800" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <p>© {new Date().getFullYear()} ResumeCraft. All rights reserved.</p>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Client-Side · Private by Design
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle variant="dropdown" />
              <span className="text-slate-600">·</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                aria-label="View on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="text-xs">Open Source</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <MainApp />
      </ResumeProvider>
    </ThemeProvider>
  );
}
