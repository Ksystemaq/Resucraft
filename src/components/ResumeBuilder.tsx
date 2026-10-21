import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { StyleCustomizer } from './StyleCustomizer';
import { BasicsForm } from './forms/BasicsForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { CustomSectionsForm } from './forms/CustomSectionsForm';
import { ResumeRenderer } from '../templates/ResumeRenderer';
import { TemplateId } from '../types/resume';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  PlusSquare,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Copy,
  Check,
  X
} from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const { data, updateMetadata } = useResume();
  const [activeTab, setActiveTab] = useState<'basics' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'custom'>('basics');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [zoomScale, setZoomScale] = useState(1);
  const [showVerbModal, setShowVerbModal] = useState(false);
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);
  const [isFullscreenModal, setIsFullscreenModal] = useState(false);

  // Profile strength calculation
  const hasName = Boolean(data.basics.fullName?.trim());
  const hasHeadline = Boolean(data.basics.headline?.trim());
  const hasContact = Boolean(data.basics.email?.trim() || data.basics.phone?.trim());
  const hasSummary = Boolean(data.basics.summary?.trim() && data.basics.summary.length > 30);
  const hasExperience = data.experience.length > 0 && data.experience.some((e) => e.bullets && e.bullets.length > 0);
  const hasEducation = data.education.length > 0;
  const hasSkills = data.skills.length > 0 && data.skills.some((s) => s.items && s.items.length >= 3);

  let strengthScore = 0;
  if (hasName) strengthScore += 15;
  if (hasHeadline) strengthScore += 10;
  if (hasContact) strengthScore += 15;
  if (hasSummary) strengthScore += 15;
  if (hasExperience) strengthScore += 20;
  if (hasEducation) strengthScore += 15;
  if (hasSkills) strengthScore += 10;

  const strengthColor =
    strengthScore >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
    strengthScore >= 50 ? 'text-amber-600 bg-amber-50 border-amber-200' :
    'text-rose-600 bg-rose-50 border-rose-200';

  const sections = [
    { id: 'basics', label: 'Personal & Contact', icon: User, count: hasName ? '✓' : '' },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, count: data.experience.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: data.education.length },
    { id: 'skills', label: 'Skills & Proficiencies', icon: Wrench, count: data.skills.length },
    { id: 'projects', label: 'Key Projects', icon: FolderGit2, count: data.projects?.length || 0 },
    { id: 'certifications', label: 'Certifications', icon: Award, count: data.certifications?.length || 0 },
    { id: 'custom', label: 'Custom Sections', icon: PlusSquare, count: data.customSections?.length || 0 },
  ] as const;

  const actionVerbCategories = [
    {
      category: 'Leadership & Management',
      verbs: ['Spearheaded', 'Orchestrated', 'Championed', 'Directed', 'Mobilized', 'Governed', 'Mentored', 'Empowered']
    },
    {
      category: 'Technical & Engineering',
      verbs: ['Architected', 'Engineered', 'Developed', 'Deployed', 'Refactored', 'Automated', 'Integrated', 'Standardized']
    },
    {
      category: 'Growth & Optimization',
      verbs: ['Accelerated', 'Amplified', 'Maximized', 'Streamlined', 'Yielded', 'Elevated', 'Outpaced', 'Revamped']
    },
    {
      category: 'Communication & Delivery',
      verbs: ['Facilitated', 'Negotiated', 'Partnered', 'Synthesized', 'Presented', 'Advocated', 'Co-authored', 'Piloted']
    }
  ];

  const handleCopyVerb = (verb: string) => {
    navigator.clipboard.writeText(verb);
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 1500);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      {/* Mobile segmented toggle (Edit / Preview) */}
      <div className="md:hidden flex rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-1 mb-4 shadow-2xs">
        <button
          type="button"
          onClick={() => setMobileView('edit')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
            mobileView === 'edit'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Form
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
            mobileView === 'preview'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Live Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Forms and Styling (col-span-5) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
          {/* Profile Strength & Action Verbs Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Resume Completeness</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${strengthColor}`}>
                  {strengthScore}% Complete
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowVerbModal(true)}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/50 px-2 py-1 rounded flex items-center gap-1 transition"
              >
                <BookOpen className="w-3 h-3" />
                <span>Action Verbs Helper</span>
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  strengthScore >= 80 ? 'bg-emerald-500' : strengthScore >= 50 ? 'bg-blue-500' : 'bg-amber-400'
                }`}
                style={{ width: `${strengthScore}%` }}
              />
            </div>

            {/* Missing suggestions chips */}
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
              {!hasName && <span className="bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 px-1.5 py-0.5 rounded">Missing Name</span>}
              {!hasContact && <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 px-1.5 py-0.5 rounded">Add Contact</span>}
              {!hasSummary && <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">+ Summary</span>}
              {!hasExperience && <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">+ Experience</span>}
              {!hasSkills && <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">+ Skills</span>}
              {strengthScore === 100 && (
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Perfect! Ready for PDF Export
                </span>
              )}
            </div>
          </div>

          {/* Style Controls Card */}
          <StyleCustomizer />

          {/* Section Accordion Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden transition-colors">
            <div className="p-3 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Resume Content Sections</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Click section to expand</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {sections.map((sec) => {
                const IconComponent = sec.icon;
                const isOpen = activeTab === sec.id;

                return (
                  <div key={sec.id} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => setActiveTab(isOpen ? ('' as any) : sec.id)}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between text-xs font-semibold transition ${
                        isOpen
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-l-3 border-blue-600'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className={`w-4 h-4 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                        <span>{sec.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {sec.count !== '' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {sec.count}
                          </span>
                        )}
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {/* Section Body */}
                    {isOpen && (
                      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                        {sec.id === 'basics' && <BasicsForm />}
                        {sec.id === 'experience' && <ExperienceForm />}
                        {sec.id === 'education' && <EducationForm />}
                        {sec.id === 'skills' && <SkillsForm />}
                        {sec.id === 'projects' && <ProjectsForm />}
                        {sec.id === 'certifications' && <CertificationsForm />}
                        {sec.id === 'custom' && <CustomSectionsForm />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Live Sticky Preview (col-span-7) */}
        <div className={`lg:col-span-7 ${mobileView === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <div className="sticky top-20 bg-slate-200/70 dark:bg-slate-900/90 p-4 md:p-6 rounded-2xl border border-slate-300/80 dark:border-slate-800 backdrop-blur-xs flex flex-col items-center shadow-xs transition-colors">
            {/* Preview Toolbar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-300 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">Real-Time PDF Canvas</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Synced
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline">A4 • 210 × 297mm</span>
              </div>

              {/* Quick Template Switcher & Zoom Controls */}
              <div className="flex items-center gap-1.5">
                <select
                  value={data.metadata.templateId}
                  onChange={(e) => updateMetadata({ templateId: e.target.value as TemplateId })}
                  className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="modern">Modern Clean</option>
                  <option value="executive">Executive Horizon</option>
                  <option value="classic">Classic Standard</option>
                  <option value="accent-tab">Accent Tab</option>
                  <option value="dual-tone">Dual-Tone</option>
                  <option value="timeline">Tech Timeline</option>
                  <option value="elegant">Prestige Monogram</option>
                  <option value="creative">Creative Banner</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="student">Student / Academic</option>
                </select>

                <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setZoomScale((prev) => Math.max(0.6, prev - 0.1))}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono min-w-[34px] text-center font-bold text-slate-700 dark:text-slate-300">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomScale((prev) => Math.min(1.4, prev + 0.1))}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomScale(1)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition"
                    title="Reset 100%"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFullscreenModal(true)}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  title="Expand Fullscreen Preview"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              </div>
            </div>

            {/* Resume Sheet Wrapper */}
            <div className="w-full overflow-x-auto pb-4 flex justify-center">
              <div className="shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/10 rounded-sm transition-transform duration-200">
                <ResumeRenderer data={data} scale={zoomScale} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Verbs Modal */}
      {showVerbModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Power Action Verbs for ATS Resumes</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVerbModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Replace passive words like "responsible for" or "helped with" with these verified high-impact recruiter keywords. Click any verb to copy it to your clipboard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {actionVerbCategories.map((cat) => (
                <div key={cat.category} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">{cat.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.verbs.map((verb) => (
                      <button
                        key={verb}
                        type="button"
                        onClick={() => handleCopyVerb(verb)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium border transition flex items-center gap-1 ${
                          copiedVerb === verb
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <span>{verb}</span>
                        {copiedVerb === verb ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 opacity-40" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowVerbModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Preview Modal */}
      {isFullscreenModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-150">
          <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-3 text-white">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm">Full A4 Document Preview</span>
              <span className="text-xs text-slate-400">({data.metadata.templateId})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition"
              >
                Print / Save PDF
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreenModal(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex justify-center items-start py-4">
            <div className="bg-white shadow-2xl rounded-sm">
              <ResumeRenderer data={data} scale={1} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
