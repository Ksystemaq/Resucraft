import React from 'react';

interface NavbarProps {
  currentView?: string;
  onNavigate?: (view: 'home' | 'templates' | 'builder' | 'wizard') => void;
  onOpenPreflight?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800 print:hidden transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-6 h-14 md:h-16 flex items-center">
        {/* Brand Logo - Clean Credenza-inspired aesthetic */}
        <button
          type="button"
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90"
          aria-label="ResumeCraft Home"
        >
          {/* Custom SVG mark matching the teal Credenza geometric icon */}
          <svg
            className="w-6 h-6 transition-transform duration-200 group-hover:scale-105 shrink-0"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="credenzaTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
            {/* 3 ascending vertical rounded bars */}
            <rect x="7" y="11" width="2.4" height="10" rx="1.2" fill="url(#credenzaTealGrad)" />
            <rect x="11.6" y="7" width="2.4" height="14" rx="1.2" fill="url(#credenzaTealGrad)" />
            <rect x="16.2" y="3" width="2.4" height="18" rx="1.2" fill="url(#credenzaTealGrad)" />
            {/* Smooth curved bottom cradle */}
            <path
              d="M4.5 13.5V20.5C4.5 22.7 6.3 24.5 8.5 24.5H19.5C21.7 24.5 23.5 22.7 23.5 20.5V15"
              stroke="url(#credenzaTealGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>

          {/* Clean bold brand text */}
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            ResumeCraft
          </span>
        </button>
      </div>
    </header>
  );
};
