import React from 'react';
import { useResume } from '../context/ResumeContext';
import { TemplateId, ResumeData } from '../types/resume';
import { ArrowRight } from 'lucide-react';
import { ResumeRenderer } from '../templates/ResumeRenderer';
import { SAMPLE_RESUME_DATA } from '../data/initialData';

interface TemplateOption {
  id: TemplateId;
  name: string;
  badge: string;
  description: string;
}

const TEMPLATE_CARDS: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern',
    badge: 'Professional',
    description: 'Clean and contemporary design with bold typography',
  },
  {
    id: 'classic',
    name: 'Classic',
    badge: 'Professional',
    description: 'Traditional two-column layout with timeless elegance',
  },
  {
    id: 'minimalist',
    name: 'Minimal',
    badge: 'Minimal',
    description: 'Simple and focused design with plenty of white space',
  },
  {
    id: 'executive',
    name: 'Executive',
    badge: 'Professional',
    description: 'Polished layout designed for leadership, directors, and management',
  },
  {
    id: 'accent-tab',
    name: 'Accent Tab',
    badge: 'Modern',
    description: 'Geometric header accents with clean structured qualification columns',
  },
  {
    id: 'dual-tone',
    name: 'Dual-Tone',
    badge: 'Creative',
    description: 'High-contrast dark sidebar with modern structured content blocks',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    badge: 'Tech',
    description: 'Milestone timeline connecting roles and key project achievements',
  },
  {
    id: 'creative',
    name: 'Creative',
    badge: 'Creative',
    description: 'Vibrant section callouts and badges ideal for portfolio & design roles',
  },
  {
    id: 'elegant',
    name: 'Prestige',
    badge: 'Executive',
    description: 'Monogram insignia and serif typography for timeless executive presence',
  },
  {
    id: 'student',
    name: 'Academic',
    badge: 'Student',
    description: 'Highlights education, coursework, and projects for students & graduates',
  },
];

interface TemplateGalleryProps {
  creationMode?: 'manual' | 'auto';
  onSelect: (templateId: TemplateId) => void;
  onLaunchWizard?: () => void;
  onChangeMode?: (mode: 'manual' | 'auto') => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  creationMode = 'manual',
  onSelect,
}) => {
  const { data, updateMetadata } = useResume();
  const currentTemplate = data.metadata.templateId;

  // Use the user's active resume data so the preview matches their editor 1:1
  const activeResumeData: ResumeData = {
    ...SAMPLE_RESUME_DATA,
    ...data,
    basics: {
      ...SAMPLE_RESUME_DATA.basics,
      ...data.basics,
      fullName: data.basics?.fullName?.trim() ? data.basics.fullName : SAMPLE_RESUME_DATA.basics.fullName,
      headline: data.basics?.headline?.trim() ? data.basics.headline : SAMPLE_RESUME_DATA.basics.headline,
      email: data.basics?.email?.trim() ? data.basics.email : SAMPLE_RESUME_DATA.basics.email,
      phone: data.basics?.phone?.trim() ? data.basics.phone : SAMPLE_RESUME_DATA.basics.phone,
      location: data.basics?.location?.trim() ? data.basics.location : SAMPLE_RESUME_DATA.basics.location,
      photoUrl: data.basics?.photoUrl || SAMPLE_RESUME_DATA.basics.photoUrl,
    },
    metadata: {
      ...SAMPLE_RESUME_DATA.metadata,
      ...data.metadata,
    },
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 transition-colors">
      {/* Centered Heading with Purple Gradient (matching screenshot) */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
          Choose Your Template
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Select a professionally designed template that matches your style and industry
        </p>
      </div>

      {/* Clean 3-Column Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {TEMPLATE_CARDS.map((card) => {
          const isSelected = currentTemplate === card.id;

          return (
            <div
              key={card.id}
              onClick={() => {
                updateMetadata({ templateId: card.id });
                onSelect(card.id);
              }}
              className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 shadow-2xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col group ${
                isSelected
                  ? 'border-purple-600 ring-2 ring-purple-500/30 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-600/50'
              }`}
            >
              {/* Card Header: Title & Badge */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                  {card.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200/80 dark:border-slate-700 shrink-0">
                  {card.badge}
                </span>
              </div>

              {/* 1-Line Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1 leading-relaxed">
                {card.description}
              </p>

              {/* Framed Miniature Resume Document */}
              <div className="w-full h-[390px] sm:h-[410px] bg-white rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden relative shadow-2xs flex justify-center group-hover:border-purple-300 dark:group-hover:border-purple-500/50 transition">
                <div
                  className="shrink-0 w-[800px] min-w-[800px] max-w-[800px] origin-top select-none pointer-events-none pt-2"
                  style={{ transform: 'scale(0.38)', transformOrigin: 'top center' }}
                >
                  <ResumeRenderer
                    data={{
                      ...activeResumeData,
                      metadata: {
                        ...activeResumeData.metadata,
                        templateId: card.id,
                      },
                    }}
                  />
                </div>

                {/* Subtle Hover Action Banner */}
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 backdrop-blur-[0.5px]">
                  <span className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-all">
                    <span>{creationMode === 'auto' ? 'Use Template & Start Wizard' : 'Use This Template'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
