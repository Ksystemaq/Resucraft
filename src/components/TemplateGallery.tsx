import React from 'react';
import { useResume } from '../context/ResumeContext';
import { TemplateId } from '../types/resume';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface TemplateOption {
  id: TemplateId;
  name: string;
  badge: string;
  description: string;
  bestFor: string;
  previewBg: string;
}

const TEMPLATE_CARDS: TemplateOption[] = [
  {
    id: 'classic',
    name: 'Classic Standard',
    badge: '100% ATS-Safe',
    description: 'Traditional single-column layout with elegant horizontal dividers. Ideal for conservative corporate fields.',
    bestFor: 'Finance, Law, Executive, Academia',
    previewBg: 'from-slate-100 to-slate-200',
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    badge: 'Most Popular',
    description: 'Crisp two-column structure with an organized sidebar for contact details, education, and skills.',
    bestFor: 'Tech, Product, Startups, Marketing',
    previewBg: 'from-blue-50 to-indigo-100',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    badge: 'High Readability',
    description: 'Generous white space and understated typography for a refined, modern presentation.',
    bestFor: 'Design, Architecture, General Business',
    previewBg: 'from-zinc-100 to-stone-200',
  },
  {
    id: 'creative',
    name: 'Creative Banner',
    badge: 'Eye-Catching',
    description: 'Striking accent colored top banner, skill badge pills, and modular project callouts.',
    bestFor: 'Creative, Media, UI/UX, Communications',
    previewBg: 'from-purple-100 to-fuchsia-100',
  },
  {
    id: 'student',
    name: 'Student / Entry',
    badge: 'Internships & Grads',
    description: 'Prioritizes education, GPA/honors, academic coursework, and capstone projects above employment.',
    bestFor: 'College Students, Recent Graduates',
    previewBg: 'from-emerald-50 to-teal-100',
  },
];

interface TemplateGalleryProps {
  onSelect: (templateId: TemplateId) => void;
  onLaunchWizard: () => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelect, onLaunchWizard }) => {
  const { data, updateMetadata } = useResume();
  const currentTemplate = data.metadata.templateId;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Choose a Resume Template
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Every template is crafted for ATS readability and can be easily customized with your colors and typography.
        </p>
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
        {TEMPLATE_CARDS.map((card) => {
          const isSelected = currentTemplate === card.id;

          return (
            <div
              key={card.id}
              className={`group bg-white rounded-xl border-2 transition-all overflow-hidden flex flex-col justify-between hover:shadow-lg ${
                isSelected ? 'border-blue-600 ring-2 ring-blue-100 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Thumbnail Mock */}
              <div className={`h-48 bg-gradient-to-br ${card.previewBg} p-5 flex flex-col justify-between relative`}>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-800 shadow-2xs">
                    {card.badge}
                  </span>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Abstract resume wireframe mock */}
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg shadow-xs space-y-1.5 border border-white/60">
                  <div className="w-1/3 h-2.5 bg-slate-400 rounded-sm"></div>
                  <div className="w-2/3 h-1.5 bg-slate-300 rounded-sm"></div>
                  <div className="w-full h-1 bg-slate-200 rounded-sm mt-2"></div>
                  <div className="w-4/5 h-1 bg-slate-200 rounded-sm"></div>
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

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      updateMetadata({ templateId: card.id });
                      onSelect(card.id);
                    }}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
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
    </div>
  );
};
