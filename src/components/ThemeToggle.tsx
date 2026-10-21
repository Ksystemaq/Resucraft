import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemePreference } from '../context/ThemeContext';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'dropdown' | 'segmented' | 'simple';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'dropdown', className = '' }) => {
  const { themePreference, resolvedTheme, setThemePreference } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const options: { id: ThemePreference; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'light',  label: 'Light',  icon: Sun },
    { id: 'dark',   label: 'Dark',   icon: Moon },
    { id: 'system', label: 'System', icon: Laptop },
  ];

  const CurrentIcon =
    themePreference === 'system'
      ? Laptop
      : resolvedTheme === 'dark'
      ? Moon
      : Sun;

  if (variant === 'segmented') {
    return (
      <div className={`flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800/80 gap-0.5 ${className}`}>
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = themePreference === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setThemePreference(opt.id)}
              aria-label={`Set theme to ${opt.label}`}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'simple') {
    return (
      <button
        type="button"
        onClick={() => {
          if (themePreference === 'light') setThemePreference('dark');
          else if (themePreference === 'dark') setThemePreference('system');
          else setThemePreference('light');
        }}
        className={`p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-2xs ${className}`}
        title={`Theme: ${themePreference} (Click to switch)`}
        aria-label="Toggle theme preference"
      >
        <CurrentIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </button>
    );
  }

  // Default: Dropdown menu
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold shadow-2xs transition"
        aria-label="Select theme preference"
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="capitalize hidden sm:inline">{themePreference}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/60">
            Appearance
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = themePreference === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setThemePreference(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition ${
                  isSelected
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-700/60 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
