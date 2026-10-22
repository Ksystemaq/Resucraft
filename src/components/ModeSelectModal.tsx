import React from 'react';
import { Edit3, Sparkles, X } from 'lucide-react';

interface ModeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onManual: () => void;
  onAuto: () => void;
}

export const ModeSelectModal: React.FC<ModeSelectModalProps> = ({
  isOpen,
  onClose,
  onManual,
  onAuto,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mode-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <h2
            id="mode-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            How do you want to build your resume?
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Pick a mode below — you can always switch later.
          </p>
        </div>

        {/* Option Cards */}
        <div className="px-6 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Manual Card */}
          <div className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all group">
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center shadow-sm group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900 transition">
              <Edit3 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Fill it Myself
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Full Control
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose a template design first, then fill in your own details at your own pace.
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={onManual}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
            >
              Pick Template (Manual) →
            </button>
          </div>

          {/* Auto / Wizard Card */}
          <div className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all group">
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center shadow-sm group-hover:bg-purple-200 dark:group-hover:bg-purple-900 transition">
              <Sparkles className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Guide Me (Wizard)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 whitespace-nowrap">
                  Recommended for first-timers
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose a template design first, then answer quick guided questions to build your resume.
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={onAuto}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
            >
              Pick Template (Auto Wizard) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
