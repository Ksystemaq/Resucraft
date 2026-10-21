import React, { useState, useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { TemplateId } from '../types/resume';
import { Check, ArrowRight, Sparkles, Eye, Search, ShieldCheck, X } from 'lucide-react';
import { ResumeRenderer } from '../templates/ResumeRenderer';

interface TemplateOption {
  id: TemplateId;
  name: string;
  category: 'all' | 'corporate' | 'modern' | 'creative' | 'entry';
  badge: string;
  description: string;
  bestFor: string;
  previewBg: string;
  wireframeType: 'classic' | 'modern' | 'minimalist' | 'creative' | 'student' | 'executive' | 'accent-tab' | 'dual-tone' | 'elegant' | 'timeline';
}

const TEMPLATE_CARDS: TemplateOption[] = [
  {
    id: 'executive',
    name: 'Executive Horizon',
    category: 'corporate',
    badge: 'Popular for Leadership',
    description: 'Dark contact ribbon bar, prominent candidate header, and structured left-title grid sections.',
    bestFor: 'Managers, Directors, Retail Executives, Operations',
    previewBg: 'from-slate-800 to-slate-900',
    wireframeType: 'executive',
  },
  {
    id: 'accent-tab',
    name: 'Accent Tab Geometric',
    category: 'modern',
    badge: 'Modern Format',
    description: 'Accent top tab with styled user photo, multi-column qualifications, and dashed dividers.',
    bestFor: 'Retail Sales, Customer Service, Tech & Marketing',
    previewBg: 'from-rose-50 to-red-100',
    wireframeType: 'accent-tab',
  },
  {
    id: 'dual-tone',
    name: 'Dual-Tone High Contrast',
    category: 'creative',
    badge: 'High Impact',
    description: 'Full-width top dark header bar with a deep-toned sidebar and crisp white content body.',
    bestFor: 'Corporate, Consultancies, Media, Tech Leads',
    previewBg: 'from-blue-900 to-indigo-950',
    wireframeType: 'dual-tone',
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    category: 'modern',
    badge: 'Best-Seller',
    description: 'Two-column layout with organized sidebar for contact details, education, and skills.',
    bestFor: 'Software Engineers, Product, Startups',
    previewBg: 'from-blue-50 to-indigo-100',
    wireframeType: 'modern',
  },
  {
    id: 'classic',
    name: 'Classic Standard',
    category: 'corporate',
    badge: '100% ATS-Safe',
    description: 'Traditional single-column layout with horizontal dividers. Highest compatibility score.',
    bestFor: 'Finance, Legal, Healthcare, Academia',
    previewBg: 'from-slate-100 to-slate-200',
    wireframeType: 'classic',
  },
  {
    id: 'elegant',
    name: 'Prestige Monogram',
    category: 'corporate',
    badge: 'Executive Prestige',
    description: 'Circular monogram initials badge, classic serif typography, and double-line border styling.',
    bestFor: 'Attorneys, C-Suite Executives, Luxury Brands',
    previewBg: 'from-amber-50 to-stone-200',
    wireframeType: 'elegant',
  },
  {
    id: 'timeline',
    name: 'Tech Timeline Rail',
    category: 'modern',
    badge: 'Interactive Feel',
    description: 'Vertical timeline rail with milestone circular nodes connecting roles and project milestones.',
    bestFor: 'Full-Stack Developers, Cloud Architects, Designers',
    previewBg: 'from-sky-50 to-cyan-100',
    wireframeType: 'timeline',
  },
  {
    id: 'creative',
    name: 'Creative Banner',
    category: 'creative',
    badge: 'Eye-Catching',
    description: 'Colored top banner, pill skill badges, and modular project callout boxes.',
    bestFor: 'Designers, Media, UI/UX, Communications',
    previewBg: 'from-purple-100 to-fuchsia-100',
    wireframeType: 'creative',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'modern',
    badge: 'High Readability',
    description: 'Understated typography with generous breathing room and clean section headers.',
    bestFor: 'Architects, Copywriters, General Business',
    previewBg: 'from-zinc-100 to-stone-200',
    wireframeType: 'minimalist',
  },
  {
    id: 'student',
    name: 'Student / Academic',
    category: 'entry',
    badge: 'Internships & Grads',
    description: 'Prioritizes education, GPA/honors, coursework, and capstone projects over job history.',
    bestFor: 'Students, New Grads, Entry-Level Candidates',
    previewBg: 'from-emerald-50 to-teal-100',
    wireframeType: 'student',
  },
];

interface TemplateGalleryProps {
  onSelect: (templateId: TemplateId) => void;
  onLaunchWizard: () => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelect, onLaunchWizard }) => {
  const { data, updateMetadata } = useResume();
  const currentTemplate = data.metadata.templateId;
  const [filter, setFilter] = useState<'all' | 'corporate' | 'modern' | 'creative' | 'entry'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplateId, setPreviewTemplateId] = useState<TemplateId | null>(null);

  const filteredTemplates = useMemo(() => {
    return TEMPLATE_CARDS.filter((card) => {
      const matchesCategory = filter === 'all' || card.category === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        card.name.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q) ||
        card.bestFor.toLowerCase().includes(q) ||
        card.badge.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 transition-colors">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3 border border-blue-200/80 dark:border-blue-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>10 Recruiter-Approved Layouts</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Find Your Perfect Resume Design
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2.5 leading-relaxed">
          Switch designs at any time with one click. Your data automatically formats to fit the chosen template with zero re-typing.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="max-w-3xl mx-auto mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates by role (e.g. Software, Director, Finance, Minimalist)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-2xs transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs p-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Templates (10)' },
            { id: 'corporate', label: 'Executive & Corporate' },
            { id: 'modern', label: 'Modern Tech' },
            { id: 'creative', label: 'Creative & Impact' },
            { id: 'entry', label: 'Students & Grads' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wizard Banner Callout */}
      <div className="mb-10 bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-sky-50/90 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs transition-colors">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Want step-by-step guidance?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Answer 5 simple questions and our automatic wizard will synthesize your first draft for you.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLaunchWizard}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <span>Launch Guided Wizard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Template Cards Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">No templates found matching "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilter('all');
            }}
            className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((card) => {
            const isSelected = currentTemplate === card.id;

            return (
              <div
                key={card.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden transition-all duration-200 flex flex-col group ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg'
                    : 'border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Visual Thumbnail Bar with wireframe preview */}
                <div
                  className={`h-44 bg-gradient-to-br ${card.previewBg} p-4 flex flex-col justify-between relative overflow-hidden`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-800 shadow-2xs backdrop-blur-xs">
                      {card.badge}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-2xs flex items-center gap-1">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </div>

                  {/* Wireframe Mockup Lines */}
                  <div className="bg-white/95 rounded-lg p-3 shadow-md border border-white/60 space-y-1.5 max-w-[210px] mx-auto w-full transition-transform group-hover:scale-105 duration-200">
                    <div className="w-1/2 h-2.5 bg-slate-800 rounded-xs mb-2"></div>
                    <div className="w-full h-1 bg-slate-300 rounded-xs"></div>
                    <div className="w-3/4 h-1 bg-slate-300 rounded-xs"></div>
                    <div className="w-full h-1 bg-slate-200 rounded-xs mt-2"></div>
                    <div className="w-5/6 h-1 bg-slate-200 rounded-xs"></div>
                  </div>

                  {/* Quick Inspect Button on Hover */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                    <button
                      type="button"
                      onClick={() => setPreviewTemplateId(card.id)}
                      className="px-3.5 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 hover:bg-slate-100 transition transform hover:scale-105"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>Quick Preview</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {card.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Best For
                      </span>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{card.bestFor}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        updateMetadata({ templateId: card.id });
                        onSelect(card.id);
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{isSelected ? 'Open Live Editor' : 'Use Template'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTemplateId(card.id)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                      title="Inspect full preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Live Preview Modal */}
      {previewTemplateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {TEMPLATE_CARDS.find((c) => c.id === previewTemplateId)?.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">• Live Sample Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateMetadata({ templateId: previewTemplateId });
                    setPreviewTemplateId(null);
                    onSelect(previewTemplateId);
                  }}
                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs hover:bg-blue-700 transition"
                >
                  Apply & Open Editor
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTemplateId(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-200/60 dark:bg-slate-950 flex justify-center">
              <div className="shadow-2xl">
                <ResumeRenderer
                  data={{
                    ...data,
                    metadata: {
                      ...data.metadata,
                      templateId: previewTemplateId,
                    },
                  }}
                  scale={0.9}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
