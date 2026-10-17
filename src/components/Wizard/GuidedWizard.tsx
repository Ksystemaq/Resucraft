import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, ArrowRight, ArrowLeft, Check, BookOpen, Briefcase, Wrench, UserCheck, GraduationCap } from 'lucide-react';

interface GuidedWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

const COMMON_SKILL_SUGGESTIONS = [
  'JavaScript', 'TypeScript', 'React', 'Python', 'Node.js', 'SQL', 'Git / GitHub',
  'Project Management', 'Communication', 'Problem Solving', 'Data Analysis',
  'Customer Support', 'UI/UX Design', 'Agile / Scrum', 'Team Leadership'
];

export const GuidedWizard: React.FC<GuidedWizardProps> = ({ onComplete, onCancel }) => {
  const { data, setData, updateBasics } = useResume();
  const [currentStep, setCurrentStep] = useState(1);

  // Local state for wizard form
  const [wizardName, setWizardName] = useState(data.basics.fullName || '');
  const [wizardHeadline, setWizardHeadline] = useState(data.basics.headline || '');
  const [wizardEmail, setWizardEmail] = useState(data.basics.email || '');
  const [wizardPhone, setWizardPhone] = useState(data.basics.phone || '');
  const [wizardLocation, setWizardLocation] = useState(data.basics.location || '');
  
  // Summary starter
  const [summaryChoice, setSummaryChoice] = useState('');
  
  // Education
  const [eduSchool, setEduSchool] = useState('');
  const [eduDegree, setEduDegree] = useState('');
  const [eduField, setEduField] = useState('');
  const [eduYear, setEduYear] = useState('');

  // Experience
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expDates, setExpDates] = useState('');
  const [expAchievement, setExpAchievement] = useState('');

  // Selected skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    data.skills.flatMap((s) => s.items).slice(0, 8)
  );

  const totalSteps = 5;

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleFinishWizard = () => {
    // Commit basics
    updateBasics({
      fullName: wizardName || 'New User',
      headline: wizardHeadline || 'Professional Candidate',
      email: wizardEmail || '',
      phone: wizardPhone || '',
      location: wizardLocation || '',
      summary: summaryChoice || data.basics.summary,
    });

    setData((prev) => {
      const updated = { ...prev };

      // Append education if entered
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

      // Append experience if entered
      if (expCompany.trim() || expRole.trim()) {
        updated.experience = [
          {
            id: 'exp-wiz-' + Date.now(),
            company: expCompany || 'Organization',
            position: expRole || 'Role',
            location: '',
            startDate: expDates || 'Recent',
            endDate: 'Present',
            isCurrent: true,
            bullets: expAchievement ? [expAchievement] : ['Collaborated with team members to deliver core objectives.'],
          },
          ...prev.experience,
        ];
      }

      // Update skills
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

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Wizard Header Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-slate-100 h-2">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Top indicator */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
              <Sparkles className="w-3.5 h-3.5" /> Automatic Resume Assistant
            </span>
            <span className="text-xs font-medium text-slate-400">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          {/* Step 1: Who are you? */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-600" /> Let's start with your identity
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Recruiters need to know who you are and how to reach you for an interview.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">What is your full name? *</label>
                  <input
                    type="text"
                    placeholder="e.g. Jordan Smith"
                    value={wizardName}
                    onChange={(e) => setWizardName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Target Job Title or Professional Field</label>
                  <input
                    type="text"
                    placeholder="e.g. Junior Frontend Developer or Marketing Assistant"
                    value={wizardHeadline}
                    onChange={(e) => setWizardHeadline(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="jordan.smith@example.com"
                    value={wizardEmail}
                    onChange={(e) => setWizardEmail(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={wizardPhone}
                    onChange={(e) => setWizardPhone(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Location (City, Country)</label>
                  <input
                    type="text"
                    placeholder="e.g. Seattle, WA or London, UK"
                    value={wizardLocation}
                    onChange={(e) => setWizardLocation(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" /> Your Academic Background
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  What is your highest or most recent educational qualification?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">College, University, or High School</label>
                  <input
                    type="text"
                    placeholder="e.g. University of Washington"
                    value={eduSchool}
                    onChange={(e) => setEduSchool(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Degree / Diploma</label>
                  <input
                    type="text"
                    placeholder="e.g. Bachelor of Science"
                    value={eduDegree}
                    onChange={(e) => setEduDegree(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Major / Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science, Business"
                    value={eduField}
                    onChange={(e) => setEduField(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Graduation Year or Expected Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 2025 or 2021 – 2025"
                    value={eduYear}
                    onChange={(e) => setEduYear(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" /> Recent Experience or Key Project
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Add a job, internship, volunteer role, or student project you're proud of.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Company / Organization / Project Name</label>
                  <input
                    type="text"
                    placeholder="e.g. TechCorp or University Capstone Project"
                    value={expCompany}
                    onChange={(e) => setExpCompany(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Your Role / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Intern, Assistant, Developer"
                      value={expRole}
                      onChange={(e) => setExpRole(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Timeline</label>
                    <input
                      type="text"
                      placeholder="e.g. 2023 - Present"
                      value={expDates}
                      onChange={(e) => setExpDates(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">What was your standout contribution or achievement?</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Collaborated with a team of 4 to design and deploy an online ordering portal that boosted sales by 20%..."
                    value={expAchievement}
                    onChange={(e) => setExpAchievement(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Skills Selection */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-600" /> Select Your Core Skills
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click the skills you possess to add them to your resume automatically.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {COMMON_SKILL_SUGGESTIONS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs px-3.5 py-2 rounded-full font-medium transition flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Summary & Synthesis */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" /> Ready to Generate Your Draft
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  We'll compile your answers into a clean, editable template. Choose a career intro statement:
                </p>
              </div>

              <div className="space-y-3">
                {[
                  `Enthusiastic and motivated ${wizardHeadline || 'professional'} seeking to leverage skills in ${selectedSkills.slice(0, 3).join(', ') || 'modern problem solving'} to deliver high-impact results.`,
                  `Detail-oriented graduate with strong foundational training in ${eduField || 'practical technical domains'} and hands-on experience delivering collaborative projects.`,
                  `Results-focused practitioner with proven ability to drive operational excellence, learn rapid methodologies, and communicate clearly across teams.`
                ].map((option, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSummaryChoice(option)}
                    className={`p-3.5 rounded-lg border text-xs cursor-pointer transition ${
                      summaryChoice === option
                        ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-slate-800 leading-relaxed font-normal">{option}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                Cancel Wizard
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5 transition"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishWizard}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md flex items-center gap-1.5 transition"
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
