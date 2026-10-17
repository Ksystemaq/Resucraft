import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { TemplateId } from '../types/resume';
import { Check, ArrowRight, Sparkles, Filter, Eye } from 'lucide-react';
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
    badge: 'Popular for Executives',
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
  const [previewTemplateId, setPreviewTemplateId] = useState<TemplateId | null>(null);

  const filteredTemplates = TEMPLATE_CARDS.filter(
    (card) => filter === 'all' || card.category === filter
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Resume Designs
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          From modern tech sidebars to executive ribbon headers and classical prestige layouts. Pick your layout and switch anytime without re-typing.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Designs (10)' },
          { id: 'corporate', label: 'Corporate & Executive' },
          { id: 'modern', label: 'Modern & Clean' },
          { id: 'creative', label: 'Creative & High Impact' },
          { id: 'entry', label: 'Students & Grads' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              filter === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode callout */}
      <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Want a guided questionnaire instead?</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Answer 5 quick questions in Automatic Mode and we'll format your first draft automatically.
            </p>
          </div>
        </div>
        <button
          onClick={onLaunchWizard}
          className="whitespace-nowrap px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5"
        >
          Try Automatic Wizard <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((card) => {
          const isSelected = currentTemplate === card.id;

          return (
            <div
              key={card.id}
              className={`group bg-white rounded-xl border-2 transition-all overflow-hidden flex flex-col justify-between hover:shadow-xl ${
                isSelected ? 'border-blue-600 ring-2 ring-blue-100 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Thumbnail Mock */}
              <div className={`h-48 bg-gradient-to-br ${card.previewBg} p-5 flex flex-col justify-between relative`}>
                <div className="flex justify-between items-start z-10">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-2xs">
                    {card.badge}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreviewTemplateId(card.id)}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs"
                      title="Quick Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {isSelected && (
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Wireframe Mock Depictions */}
                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-lg shadow-xs space-y-1.5 border border-white/60">
                  {card.wireframeType === 'executive' && (
                    <>
                      <div className="w-full h-2 bg-slate-800 rounded-xs mb-1"></div>
                      <div className="w-2/5 h-2.5 bg-slate-900 rounded-xs"></div>
                      <div className="grid grid-cols-12 gap-1 pt-1">
                        <div className="col-span-4 h-1.5 bg-slate-400 rounded-xs"></div>
                        <div className="col-span-8 h-1.5 bg-slate-300 rounded-xs"></div>
                      </div>
                    </>
                  )}

                  {card.wireframeType === 'accent-tab' && (
                    <>
                      <div className="w-12 h-1 bg-red-600 rounded-full mx-auto mb-1"></div>
                      <div className="flex gap-2 items-center">
                        <div className="w-5 h-6 bg-red-200 rounded-xs shrink-0"></div>
                        <div className="w-full space-y-1">
                          <div className="w-1/2 h-2 bg-red-600 rounded-xs"></div>
                          <div className="w-3/4 h-1 bg-slate-300 rounded-xs"></div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.wireframeType === 'dual-tone' && (
                    <>
                      <div className="w-full h-2.5 bg-blue-900 rounded-xs mb-1"></div>
                      <div className="flex gap-2">
                        <div className="w-1/3 h-10 bg-blue-900 rounded-xs"></div>
                        <div className="w-2/3 space-y-1">
                          <div className="w-3/4 h-1.5 bg-slate-400 rounded-xs"></div>
                          <div className="w-full h-1 bg-slate-300 rounded-xs"></div>
                          <div className="w-4/5 h-1 bg-slate-300 rounded-xs"></div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.wireframeType === 'elegant' && (
                    <>
                      <div className="w-4 h-4 rounded-full border border-amber-800 mx-auto mb-1 flex items-center justify-center text-[7px] text-amber-800 font-serif">M</div>
                      <div className="w-2/5 h-2 bg-stone-800 rounded-xs mx-auto"></div>
                      <div className="w-full h-1 bg-stone-300 rounded-xs mt-1"></div>
                    </>
                  )}

                  {card.wireframeType === 'timeline' && (
                    <>
                      <div className="w-1/2 h-2.5 bg-sky-600 rounded-xs mb-1"></div>
                      <div className="pl-3 border-l-2 border-sky-400 space-y-1">
                        <div className="w-3/4 h-1.5 bg-slate-700 rounded-xs"></div>
                        <div className="w-full h-1 bg-slate-300 rounded-xs"></div>
                      </div>
                    </>
                  )}

                  {!['executive', 'accent-tab', 'dual-tone', 'elegant', 'timeline'].includes(card.wireframeType) && (
                    <>
                      <div className="w-1/3 h-2.5 bg-slate-700 rounded-xs"></div>
                      <div className="w-2/3 h-1.5 bg-slate-400 rounded-xs"></div>
                      <div className="w-full h-1 bg-slate-200 rounded-xs mt-2"></div>
                      <div className="w-4/5 h-1 bg-slate-200 rounded-xs"></div>
                    </>
                  )}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {card.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{card.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Best For:
                    </span>
                    <span className="text-xs text-slate-700 font-medium">{card.bestFor}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateMetadata({ templateId: card.id });
                      onSelect(card.id);
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Selected (Go to Editor)' : 'Choose Template'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Live Preview Modal */}
      {previewTemplateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <span className="font-bold text-slate-800 text-sm">
                Template Preview: {TEMPLATE_CARDS.find((c) => c.id === previewTemplateId)?.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateMetadata({ templateId: previewTemplateId });
                    setPreviewTemplateId(null);
                    onSelect(previewTemplateId);
                  }}
                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs hover:bg-blue-700"
                >
                  Apply & Open Editor
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTemplateId(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 text-xs"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-200/60 flex justify-center">
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
