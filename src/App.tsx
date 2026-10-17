import React, { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TemplateGallery } from './components/TemplateGallery';
import { ResumeBuilder } from './components/ResumeBuilder';
import { GuidedWizard } from './components/Wizard/GuidedWizard';
import { PreflightModal } from './components/PreflightModal';

type AppView = 'home' | 'templates' | 'builder' | 'wizard';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isPreflightOpen, setIsPreflightOpen] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenPreflight={() => setIsPreflightOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onStartManual={() => setCurrentView('builder')}
              onStartAutomatic={() => setCurrentView('wizard')}
              onBrowseTemplates={() => setCurrentView('templates')}
            />
            {/* Show template gallery directly on home page too */}
            <div className="border-t border-slate-200 bg-white/60">
              <TemplateGallery
                onSelect={() => setCurrentView('builder')}
                onLaunchWizard={() => setCurrentView('wizard')}
              />
            </div>
          </>
        )}

        {currentView === 'templates' && (
          <TemplateGallery
            onSelect={() => setCurrentView('builder')}
            onLaunchWizard={() => setCurrentView('wizard')}
          />
        )}

        {currentView === 'wizard' && (
          <GuidedWizard
            onComplete={() => setCurrentView('builder')}
            onCancel={() => setCurrentView('builder')}
          />
        )}

        {currentView === 'builder' && <ResumeBuilder />}
      </main>

      {/* Preflight Modal */}
      <PreflightModal
        isOpen={isPreflightOpen}
        onClose={() => setIsPreflightOpen(false)}
        onConfirmDownload={handleDownloadPDF}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeCraft. 100% Client-Side Privacy Guaranteed.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 transition">
              Home
            </button>
            <button onClick={() => setCurrentView('templates')} className="hover:text-blue-600 transition">
              Templates
            </button>
            <button onClick={() => setCurrentView('builder')} className="hover:text-blue-600 transition">
              Editor
            </button>
            <button onClick={() => setCurrentView('wizard')} className="hover:text-blue-600 transition">
              Wizard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ResumeProvider>
      <MainApp />
    </ResumeProvider>
  );
}

