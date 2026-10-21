import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Sparkles, ArrowRight, ArrowLeft, Check,
  BookOpen, Briefcase, Wrench, UserCheck, GraduationCap,
} from 'lucide-react';

interface GuidedWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

const SKILL_GROUPS: { label: string; skills: string[] }[] = [
  {
    label: 'Programming & Dev',
    skills: ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'SQL', 'Java', 'C#', 'PHP', 'REST APIs'],
  },
  {
    label: 'Data & Analytics',
    skills: ['Data Analysis', 'Excel / Sheets', 'Power BI', 'Tableau', 'Machine Learning', 'R'],
  },
  {
    label: 'Design & Creative',
    skills: ['UI/UX Design', 'Figma', 'Adobe Photoshop', 'Canva', 'Video Editing', 'Copywriting'],
  },
  {
    label: 'Business & Operations',
    skills: ['Project Management', 'Agile / Scrum', 'Stakeholder Communication', 'Financial Analysis', 'CRM Tools'],
  },
  {
    label: 'Soft Skills',
    skills: ['Team Leadership', 'Communication', 'Problem Solving', 'Customer Support', 'Critical Thinking', 'Adaptability'],
  },
  {
    label: 'DevOps & Cloud',
    skills: ['Git / GitHub', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Kubernetes'],
  },
];

const STEP_META = [
  { icon: UserCheck,    label: 'Identity',   desc: 'Who you are & how to reach you' },
  { icon: GraduationCap,label: 'Education',  desc: 'Your academic background' },
  { icon: Briefcase,    label: 'Experience', desc: 'Jobs, internships, projects' },
  { icon: Wrench,       label: 'Skills',     desc: 'Your core competencies' },
  { icon: BookOpen,     label: 'Summary',    desc: 'Your career intro statement' },
];

const INPUT_CLS =
  'w-full text-sm px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 ' +
  'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500';

const LABEL_CLS = 'block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5';

export const GuidedWizard: React.FC<GuidedWizardProps> = ({ onComplete, onCancel }) => {
  const { data, setData, updateBasics } = useResume();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 — Identity
  const [wizardName,     setWizardName]     = useState(data.basics.fullName || '');
  const [wizardHeadline, setWizardHeadline] = useState(data.basics.headline || '');
  const [wizardEmail,    setWizardEmail]    = useState(data.basics.email    || '');
  const [wizardPhone,    setWizardPhone]    = useState(data.basics.phone    || '');
  const [wizardLocation, setWizardLocation] = useState(data.basics.location || '');

  // Step 2 — Education
  const [eduSchool,  setEduSchool]  = useState('');
  const [eduDegree,  setEduDegree]  = useState('');
  const [eduField,   setEduField]   = useState('');
  const [eduYear,    setEduYear]    = useState('');

  // Step 3 — Experience
  const [expCompany,     setExpCompany]     = useState('');
  const [expRole,        setExpRole]        = useState('');
  const [expDates,       setExpDates]       = useState('');
  const [expAchievement, setExpAchievement] = useState('');

  // Step 4 — Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    data.skills.flatMap((s) => s.items).slice(0, 8),
  );

  // Step 5 — Summary
  const [summaryChoice, setSummaryChoice] = useState('');

  const totalSteps = 5;

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleCancel = () => {
    if (window.confirm('Cancel the Resume Wizard? Any progress will be lost.')) {
      onCancel();
    }
  };

  const handleFinish = () => {
    updateBasics({
      fullName: wizardName || 'New User',
      headline: wizardHeadline || 'Professional Candidate',
      email:    wizardEmail    || '',
      phone:    wizardPhone    || '',
      location: wizardLocation || '',
      summary:  summaryChoice  || data.basics.summary,
    });

    setData((prev) => {
      const updated = { ...prev };

      if (eduSchool.trim()) {
        updated.education = [
          {
            id: 'edu-wiz-' + Date.now(),
            institution: eduSchool,
            degree: eduDegree || 'Degree',
            fieldOfStudy: eduField || 'General Studies',
            startDate: '',
            endDate: eduYear || 'Graduated',
            isCurrent: false,
          },
          ...prev.education,
        ];
      }

      if (expCompany.trim() || expRole.trim()) {
        updated.experience = [
          {
            id: 'exp-wiz-' + Date.now(),
            company: expCompany || 'Organization',
            position: expRole   || 'Role',
            location: '',
            startDate: expDates || 'Recent',
            endDate: 'Present',
            isCurrent: true,
            bullets: expAchievement
              ? [expAchievement]
              : ['Collaborated with team members to deliver core objectives.'],
          },
          ...prev.experience,
        ];
      }

      if (selectedSkills.length > 0) {
        updated.skills = [
          {
            id: 'skill-wiz-' + Date.now(),
            category: 'Key Proficiencies',
            items: selectedSkills,
          },
        ];
      }

      return updated;
    });

    onComplete();
  };

  const summaryOptions = [
    `Enthusiastic and motivated ${wizardHeadline || 'professional'} seeking to leverage expertise in ${selectedSkills.slice(0, 3).join(', ') || 'modern problem solving'} to deliver high-impact results.`,
    `Detail-oriented graduate with strong foundational training in ${eduField || 'practical technical domains'} and hands-on experience delivering collaborative projects.`,
    `Results-focused practitioner with proven ability to drive operational excellence, adopt rapid methodologies, and communicate clearly across diverse teams.`,
  ];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 transition-colors">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

        {/* ── Top progress bar ── */}
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* ── Step bubble indicator ── */}
        <div className="px-8 pt-6 pb-0 flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute left-8 right-8 top-[calc(1.5rem+12px)] h-px bg-slate-200 dark:bg-slate-700 -z-0" />

          {STEP_META.map((s, i) => {
            const step = i + 1;
            const done    = step < currentStep;
            const active  = step === currentStep;
            const pending = step > currentStep;
            const Icon = s.icon;
            return (
              <div key={step} className="flex flex-col items-center gap-1 z-10 relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    done    ? 'bg-blue-600 border-blue-600 text-white'
                    : active ? 'bg-white dark:bg-slate-800 border-blue-600 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-100 dark:shadow-none'
                    : pending ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                    : ''
                  }`}
                >
                  {done ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-semibold hidden sm:block ${
                    active ? 'text-blue-600 dark:text-blue-400' : done ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="px-8 py-7">
          {/* ── Step heading ── */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-2.5 h-2.5" /> AI Assistant
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {STEP_META[currentStep - 1].desc}
            </h2>
          </div>

          {/* ────────── Step 1: Identity ────────── */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={LABEL_CLS}>Full Name *</label>
                  <input type="text" placeholder="e.g. Jordan Smith" value={wizardName}
                    onChange={(e) => setWizardName(e.target.value)} className={INPUT_CLS} />
                </div>
                <div className="sm:col-span-2">
                  <label className={LABEL_CLS}>Target Job Title or Professional Field</label>
                  <input type="text" placeholder="e.g. Junior Frontend Developer or Marketing Assistant"
                    value={wizardHeadline} onChange={(e) => setWizardHeadline(e.target.value)} className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Email Address *</label>
                  <input type="email" placeholder="jordan.smith@example.com" value={wizardEmail}
                    onChange={(e) => setWizardEmail(e.target.value)} className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 123-4567" value={wizardPhone}
                    onChange={(e) => setWizardPhone(e.target.value)} className={INPUT_CLS} />
                </div>
                <div className="sm:col-span-2">
                  <label className={LABEL_CLS}>Location (City, Country)</label>
                  <input type="text" placeholder="e.g. Seattle, WA or London, UK" value={wizardLocation}
                    onChange={(e) => setWizardLocation(e.target.value)} className={INPUT_CLS} />
                </div>
              </div>
            </div>
          )}

          {/* ────────── Step 2: Education ────────── */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={LABEL_CLS}>College, University, or High School</label>
                  <input type="text" placeholder="e.g. University of Washington" value={eduSchool}
                    onChange={(e) => setEduSchool(e.target.value)} className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Degree / Diploma</label>
                  <input type="text" placeholder="e.g. Bachelor of Science" value={eduDegree}
                    onChange={(e) => setEduDegree(e.target.value)} className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Major / Specialization</label>
                  <input type="text" placeholder="e.g. Computer Science, Business" value={eduField}
                    onChange={(e) => setEduField(e.target.value)} className={INPUT_CLS} />
                </div>
                <div className="sm:col-span-2">
                  <label className={LABEL_CLS}>Graduation Year or Expected Date</label>
                  <input type="text" placeholder="e.g. 2025 or 2021–2025" value={eduYear}
                    onChange={(e) => setEduYear(e.target.value)} className={INPUT_CLS} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                Skip this step if you prefer to add education manually in the editor.
              </p>
            </div>
          )}

          {/* ────────── Step 3: Experience ────────── */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className={LABEL_CLS}>Company / Organization / Project Name</label>
                <input type="text" placeholder="e.g. TechCorp or University Capstone Project"
                  value={expCompany} onChange={(e) => setExpCompany(e.target.value)} className={INPUT_CLS} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={LABEL_CLS}>Your Role / Title</label>
                  <input type="text" placeholder="e.g. Intern, Assistant, Developer"
                    value={expRole} onChange={(e) => setExpRole(e.target.value)} className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Timeline</label>
                  <input type="text" placeholder="e.g. 2023 – Present"
                    value={expDates} onChange={(e) => setExpDates(e.target.value)} className={INPUT_CLS} />
                </div>
              </div>
              <div>
                <label className={LABEL_CLS}>Your standout contribution or achievement</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Collaborated with a team of 4 to design and deploy an ordering portal that boosted sales by 20%..."
                  value={expAchievement}
                  onChange={(e) => setExpAchievement(e.target.value)}
                  className={INPUT_CLS + ' resize-none'}
                />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                Skip if you prefer to add experience manually. You can add multiple roles in the editor.
              </p>
            </div>
          )}

          {/* ────────── Step 4: Skills ────────── */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <p className="text-xs text-slate-500">
                Click skills to add them to your resume. Selected:{' '}
                <span className="font-semibold text-blue-600">{selectedSkills.length}</span>
              </p>
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-150 flex items-center gap-1 ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200 dark:ring-blue-900 ring-offset-1'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 shrink-0" />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ────────── Step 5: Summary ────────── */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a career intro statement — it will appear at the top of your resume. You can edit it later.
              </p>

              {/* Mini resume card preview */}
              {wizardName && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                  <p className="font-bold text-slate-800 dark:text-white text-sm">{wizardName}</p>
                  {wizardHeadline && <p className="text-blue-600 dark:text-blue-400 font-medium">{wizardHeadline}</p>}
                  <div className="flex flex-wrap gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
                    {wizardEmail    && <span>✉ {wizardEmail}</span>}
                    {wizardPhone    && <span>📞 {wizardPhone}</span>}
                    {wizardLocation && <span>📍 {wizardLocation}</span>}
                  </div>
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {selectedSkills.slice(0, 5).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-medium">{s}</span>
                      ))}
                      {selectedSkills.length > 5 && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-medium">
                          +{selectedSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2.5">
                {summaryOptions.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSummaryChoice(option)}
                    className={`w-full text-left p-4 rounded-xl border text-xs cursor-pointer transition-all duration-150 leading-relaxed ${
                      summaryChoice === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-200 dark:ring-blue-900 text-slate-800 dark:text-slate-200'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/40 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex gap-2.5">
                      <span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                        summaryChoice === option ? 'border-blue-600 bg-blue-600' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {summaryChoice === option && <Check className="w-3 h-3 text-white" />}
                      </span>
                      <p>{option}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400
                           hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition
                           focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800
                           rounded-lg transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                Cancel Wizard
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white
                           bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition
                           focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white
                           bg-gradient-to-r from-emerald-600 to-teal-600
                           hover:from-emerald-700 hover:to-teal-700
                           rounded-xl shadow-md transition
                           focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                <Sparkles className="w-4 h-4" /> Generate & Open Editor
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
