import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ResumeCardCarousel } from './ResumeCardCarousel';

const features = [
  {
    title: '13 Professional Templates',
    desc: 'From sleek tech resumes to executive formats. Each template is ATS-friendly and designed by professionals.',
    color: '#6366f1',
  },
  {
    title: 'Real-time Preview',
    desc: 'See exactly how your resume looks as you type. No guessing, no surprises.',
    color: '#a855f7',
  },
  {
    title: 'One-Click PDF Export',
    desc: 'Download a print-ready PDF instantly. No watermarks, no subscriptions, no nonsense.',
    color: '#ec4899',
  },
  {
    title: 'Unlimited Versions',
    desc: 'Create tailored resumes for different roles. Keep them all organized in one place.',
    color: '#22c55e',
  },
  {
    title: '100% Private',
    desc: 'Your data never leaves your device. No cloud storage, no accounts, no tracking.',
    color: '#f43f5e',
  },
  {
    title: 'Photo-Friendly',
    desc: 'Some templates support profile photos. Make your resume more memorable.',
    color: '#f59e0b',
  },
];

const steps = [
  {
    num: 1,
    title: 'Pick your template',
    desc: 'Browse 13 professionally designed templates. Each one is optimized for ATS systems and looks great on paper. Find the style that matches your industry and personality.',
    color: '#6366f1',
  },
  {
    num: 2,
    title: 'Fill it out',
    desc: 'Our editor guides you through each section. Add your work history, education, skills—everything you need. Watch your resume come together in real-time as you type.',
    color: '#a855f7',
  },
  {
    num: 3,
    title: 'Download and apply',
    desc: 'Hit export and get a professional PDF ready to send. No watermarks, no subscriptions. Save multiple versions for different job applications. Your resume, your way.',
    color: '#22c55e',
  },
];

interface HeroProps {
  onStartManual: () => void;
  onBrowseTemplates: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartManual, onBrowseTemplates }) => {
  return (
    <>
    <section className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 flex items-center px-6 py-16 transition-colors">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Left: Copy ── */}
        <div className="space-y-6">
          {/* Tag */}
          <span className="inline-block text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            No Sign Up · 100% Free
          </span>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Resumes that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              get you hired
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-md">
            Stop wrestling with Word templates. Build a professional resume in minutes, not hours.
            Your data stays private—everything runs right in your browser.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartManual}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all hover:scale-105"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onBrowseTemplates}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              See Templates
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-5 text-slate-500 dark:text-slate-400 text-xs pt-1">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              No account needed
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Export to PDF
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              100% private
            </span>
          </div>
        </div>

        {/* ── Right: Animated Resume Card Carousel ── */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[340px] sm:w-[420px]">
            {/* Soft glow backdrop */}
            <div className="absolute -inset-6 bg-gradient-to-br from-indigo-400/20 via-purple-300/10 to-emerald-200/10 rounded-3xl blur-3xl pointer-events-none" />
            <div className="relative pt-4 pb-10">
              <ResumeCardCarousel />
            </div>
          </div>
        </div>

      </div>
    </section>

      {/* ── Features Section ── */}
      <section className="bg-slate-50 dark:bg-slate-900/60 py-20 px-6 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <span className="inline-block w-8 h-1 rounded-full bg-indigo-500" />
              <span className="inline-block w-8 h-1 rounded-full bg-purple-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Why people choose ResumeCraft
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Built for job seekers who want results, not complexity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-1 w-full" style={{ backgroundColor: f.color }} />
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps Section ── */}
      <section className="bg-white dark:bg-slate-950 py-20 px-6 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <span className="inline-block w-10 h-1 rounded-full bg-pink-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Three steps. Zero hassle.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              From blank page to polished resume in minutes
            </p>
          </div>

          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};
