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
  Maximize2
} from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const { data } = useResume();
  const [activeTab, setActiveTab] = useState<'basics' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'custom'>('basics');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [zoomScale, setZoomScale] = useState(1);

  const sections = [
    { id: 'basics', label: 'Personal & Contact', icon: User, count: data.basics.fullName ? '✓' : '' },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, count: data.experience.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: data.education.length },
    { id: 'skills', label: 'Skills & Proficiencies', icon: Wrench, count: data.skills.length },
    { id: 'projects', label: 'Key Projects', icon: FolderGit2, count: data.projects?.length || 0 },
    { id: 'certifications', label: 'Certifications', icon: Award, count: data.certifications?.length || 0 },
    { id: 'custom', label: 'Custom Sections', icon: PlusSquare, count: data.customSections?.length || 0 },
  ] as const;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      {/* Mobile segmented toggle (Edit / Preview) */}
      <div className="md:hidden flex rounded-xl border border-slate-200 bg-slate-100 p-1 mb-4">
        <button
          type="button"
          onClick={() => setMobileView('edit')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 ${
            mobileView === 'edit' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Form
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 ${
            mobileView === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Live Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Forms and Styling (col-span-5) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
          {/* Style Controls Card */}
          <StyleCustomizer />

          {/* Section Accordion Controls */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Resume Content Sections</span>
              <span className="text-[11px] text-slate-500">Click section to edit</span>
            </div>

            <div className="divide-y divide-slate-100">
              {sections.map((sec) => {
                const IconComponent = sec.icon;
                const isOpen = activeTab === sec.id;

                return (
                  <div key={sec.id} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => setActiveTab(isOpen ? ('' as any) : sec.id)}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between text-xs font-semibold transition ${
                        isOpen ? 'bg-blue-50/70 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className={`w-4 h-4 ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span>{sec.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {sec.count !== '' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                            {sec.count}
                          </span>
                        )}
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {/* Section Body */}
                    {isOpen && (
                      <div className="p-4 bg-white border-t border-slate-100 animate-in fade-in duration-150">
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
          <div className="sticky top-20 bg-slate-200/60 p-4 md:p-6 rounded-2xl border border-slate-300/80 backdrop-blur-xs flex flex-col items-center">
            {/* Preview Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-300 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Real-Time PDF Canvas</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium">
                  Synced Live
                </span>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(0.7, prev - 0.1))}
                  className="p-1 hover:bg-slate-300 rounded text-slate-600"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono min-w-[36px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(1.3, prev + 0.1))}
                  className="p-1 hover:bg-slate-300 rounded text-slate-600"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="p-1 hover:bg-slate-300 rounded text-slate-600 ml-1"
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Resume Sheet Wrapper */}
            <div className="w-full overflow-x-auto pb-4 flex justify-center">
              <div className="shadow-2xl rounded-sm transition-transform duration-200">
                <ResumeRenderer data={data} scale={zoomScale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

