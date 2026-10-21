import React from 'react';
import { useResume } from '../context/ResumeContext';
import { CheckCircle2, AlertTriangle, XCircle, X, Download, ArrowRight } from 'lucide-react';

interface PreflightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: () => void;
}

export const PreflightModal: React.FC<PreflightModalProps> = ({ isOpen, onClose, onConfirmDownload }) => {
  const { data } = useResume();
  const { basics, experience, education, skills } = data;

  if (!isOpen) return null;

  const checks = [
    {
      title: 'Candidate Name',
      passed: Boolean(basics.fullName.trim()),
      level: 'error' as const,
      message: basics.fullName.trim()
        ? `Present: ${basics.fullName}`
        : 'Your name is missing — recruiters won\'t know who you are.',
    },
    {
      title: 'Contact Email',
      passed: Boolean(basics.email.trim() && basics.email.includes('@')),
      level: 'error' as const,
      message: basics.email.trim()
        ? `Valid email format (${basics.email})`
        : 'A reachable email address is required by all recruiters.',
    },
    {
      title: 'Phone Number',
      passed: Boolean(basics.phone.trim()),
      level: 'warning' as const,
      message: basics.phone.trim()
        ? `Present (${basics.phone})`
        : 'Recommended: Include phone for rapid recruiter screening.',
    },
    {
      title: 'Professional Summary',
      passed: Boolean(basics.summary && basics.summary.length > 30),
      level: 'warning' as const,
      message:
        basics.summary && basics.summary.length > 30
          ? 'Compelling summary provided.'
          : 'A 2–3 sentence summary helps frame your background for the reader.',
    },
    {
      title: 'Experience / Projects',
      passed: experience.length > 0 || (data.projects && data.projects.length > 0),
      level: 'error' as const,
      message:
        experience.length > 0 || (data.projects && data.projects.length > 0)
          ? 'Work experience or portfolio projects documented.'
          : 'Add at least one job, internship, or key project.',
    },
    {
      title: 'Education Section',
      passed: education.length > 0,
      level: 'warning' as const,
      message:
        education.length > 0
          ? 'Degree and institution included.'
          : 'Adding your education level improves ATS keyword matching.',
    },
    {
      title: 'Categorized Skills',
      passed: skills.length > 0 && skills.some((s) => s.items.length > 0),
      level: 'warning' as const,
      message:
        skills.length > 0 && skills.some((s) => s.items.length > 0)
          ? 'Skills listed for keyword indexing.'
          : 'Recruiters and ATS systems search specifically for listed hard skills.',
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const errorCount  = checks.filter((c) => !c.passed && c.level === 'error').length;
  const score = Math.round((passedCount / checks.length) * 100);

  const scoreBg =
    score >= 80 ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
    : score >= 50 ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';

  const scoreText =
    score >= 80 ? 'text-emerald-700 dark:text-emerald-300'
    : score >= 50 ? 'text-amber-700 dark:text-amber-300'
    : 'text-rose-700 dark:text-rose-300';

  const scoreBadge =
    score >= 80 ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
    : score >= 50 ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200'
    : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200';

  const scoreLabel =
    score >= 80 ? '✓ ATS Ready'
    : score >= 50 ? '⚠ Needs Polish'
    : '✗ Incomplete';

  /* Circumference for SVG progress ring */
  const R = 28;
  const C = 2 * Math.PI * R;
  const dashOffset = C - (score / 100) * C;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preflight-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">

        {/* ── Header ── */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-800/80">
          <div>
            <h2 id="preflight-title" className="text-base font-bold text-slate-900 dark:text-white">
              Resume Pre-Flight & ATS Audit
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Checking your resume structure before exporting to PDF
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition ml-4 shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            aria-label="Close audit modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Score Banner ── */}
        <div className="px-6 pt-5 pb-1">
          <div className={`flex items-center gap-5 p-4 rounded-xl border ${scoreBg} mb-4`}>
            {/* SVG Ring */}
            <div className="relative shrink-0 w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72" aria-hidden="true">
                <circle
                  cx="36" cy="36" r={R}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-200 dark:text-slate-700"
                />
                <circle
                  cx="36" cy="36" r={R}
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={dashOffset}
                  className={`transition-all duration-700 ${
                    score >= 80 ? 'stroke-emerald-500'
                    : score >= 50 ? 'stroke-amber-500'
                    : 'stroke-rose-500'
                  }`}
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-lg font-black ${scoreText}`}>
                {score}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Readiness Score
              </p>
              <p className={`text-2xl font-black ${scoreText}`}>{score}%</p>
              <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-semibold ${scoreBadge}`}>
                {scoreLabel}
              </span>
            </div>

            {errorCount > 0 && (
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errorCount} critical</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">issue{errorCount !== 1 ? 's' : ''} to fix</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Checklist ── */}
        <div className="px-6 pb-1">
          <div className="space-y-1 max-h-[280px] overflow-y-auto pr-0.5">
            {checks.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 px-3 py-2.5 rounded-lg text-xs transition ${
                  !item.passed && item.level === 'error'
                    ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60'
                    : !item.passed && item.level === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {/* Status icon */}
                <div className="shrink-0 mt-0.5">
                  {item.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : item.level === 'error' ? (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold ${item.passed ? 'text-slate-700 dark:text-slate-200' : item.level === 'error' ? 'text-rose-800 dark:text-rose-300' : 'text-amber-800 dark:text-amber-300'}`}>
                    {item.title}
                  </p>
                  <p className={`mt-0.5 leading-relaxed ${item.passed ? 'text-slate-500 dark:text-slate-400' : item.level === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-700 dark:text-amber-400'}`}>
                    {item.message}
                  </p>
                </div>

                {/* "Fix Now" prompt for failed items */}
                {!item.passed && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={`shrink-0 flex items-center gap-0.5 text-[10px] font-semibold mt-0.5 transition ${
                      item.level === 'error' ? 'text-rose-500 hover:text-rose-700 dark:text-rose-400' : 'text-amber-600 hover:text-amber-800 dark:text-amber-400'
                    }`}
                    aria-label={`Fix: ${item.title}`}
                  >
                    Fix <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 mt-2 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700
                       rounded-lg transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            Back to Editor
          </button>
          <button
            type="button"
            onClick={() => { onClose(); onConfirmDownload(); }}
            className="px-5 py-2 text-xs font-semibold text-white rounded-lg shadow-sm transition
                       flex items-center gap-1.5
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       hover:from-blue-700 hover:to-indigo-700
                       focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <Download className="w-3.5 h-3.5" />
            Continue to Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
