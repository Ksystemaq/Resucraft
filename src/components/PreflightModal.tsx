import React from 'react';
import { useResume } from '../context/ResumeContext';
import { CheckCircle2, AlertTriangle, XCircle, X, Download } from 'lucide-react';

interface PreflightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: () => void;
}

export const PreflightModal: React.FC<PreflightModalProps> = ({ isOpen, onClose, onConfirmDownload }) => {
  const { data } = useResume();
  const { basics, experience, education, skills } = data;

  if (!isOpen) return null;

  // Run audit checks
  const checks = [
    {
      title: 'Candidate Name',
      passed: Boolean(basics.fullName.trim()),
      level: 'error',
      message: basics.fullName.trim() ? `Present: ${basics.fullName}` : 'Name is missing. Add your name.',
    },
    {
      title: 'Contact Email',
      passed: Boolean(basics.email.trim() && basics.email.includes('@')),
      level: 'error',
      message: basics.email.trim() ? `Valid email format (${basics.email})` : 'A reachable email address is required by recruiters.',
    },
    {
      title: 'Phone Number',
      passed: Boolean(basics.phone.trim()),
      level: 'warning',
      message: basics.phone.trim() ? `Present (${basics.phone})` : 'Recommended: Include phone for rapid recruiter screening.',
    },
    {
      title: 'Professional Summary',
      passed: Boolean(basics.summary && basics.summary.length > 30),
      level: 'warning',
      message: basics.summary && basics.summary.length > 30 ? 'Compelling summary provided.' : 'A 2-3 sentence summary helps frame your background.',
    },
    {
      title: 'Experience / Projects',
      passed: experience.length > 0 || (data.projects && data.projects.length > 0),
      level: 'error',
      message: experience.length > 0 || (data.projects && data.projects.length > 0)
        ? 'Work experience or portfolio projects documented.'
        : 'Add at least one job, internship, or key project.',
    },
    {
      title: 'Education Section',
      passed: education.length > 0,
      level: 'warning',
      message: education.length > 0 ? 'Degree and institution included.' : 'Adding your education level improves ATS matching score.',
    },
    {
      title: 'Categorized Skills',
      passed: skills.length > 0 && skills.some((s) => s.items.length > 0),
      level: 'warning',
      message: skills.length > 0 ? 'Skills listed for keyword indexing.' : 'Recruiters and ATS search specifically for listed hard skills.',
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">Resume Pre-Flight & ATS Audit</h2>
            <p className="text-xs text-slate-500">Checking your resume structure before exporting to PDF</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Score banner */}
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Readiness Score</p>
              <p className="text-2xl font-black text-slate-900">{score}%</p>
            </div>
            <div className="text-right">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {score >= 80 ? 'ATS Ready' : 'Needs Polish'}
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {checks.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs p-2 rounded-md hover:bg-slate-50">
                {item.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : item.level === 'error' ? (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p className="text-slate-500">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-md transition"
          >
            Back to Editor
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onConfirmDownload();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Continue to Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

