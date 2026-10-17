import React from 'react';
import { useResume } from '../context/ResumeContext';
import { TemplateId, FontFamily, FontSize } from '../types/resume';
import { Palette, Type, LayoutTemplate, Sliders } from 'lucide-react';

const PALETTES = [
  { name: 'Navy', color: '#1e3a8a' },
  { name: 'Sky Blue', color: '#0284c7' },
  { name: 'Emerald', color: '#059669' },
  { name: 'Burgundy', color: '#991b1b' },
  { name: 'Purple', color: '#7c3aed' },
  { name: 'Slate', color: '#334155' },
  { name: 'Charcoal', color: '#18181b' },
];

const FONTS: { id: FontFamily; label: string; class: string }[] = [
  { id: 'Inter', label: 'Inter (Modern Sans)', class: 'font-sans' },
  { id: 'Roboto', label: 'Roboto (Clean Sans)', class: 'font-["Roboto"]' },
  { id: 'Merriweather', label: 'Merriweather (Classic Serif)', class: 'font-serif' },
  { id: 'Lora', label: 'Lora (Editorial Serif)', class: 'font-["Lora"]' },
];

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'classic', label: 'Classic Standard' },
  { id: 'modern', label: 'Modern Clean' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'creative', label: 'Creative Banner' },
  { id: 'student', label: 'Student / Entry' },
];

export const StyleCustomizer: React.FC = () => {
  const { data, updateMetadata } = useResume();
  const { metadata } = data;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-800 font-semibold text-xs tracking-wide uppercase">
        <Sliders className="w-3.5 h-3.5 text-blue-600" />
        <span>Design & Styling Controls</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Template Select */}
        <div>
          <label className="flex items-center gap-1.5 font-medium text-slate-700 mb-1.5">
            <LayoutTemplate className="w-3.5 h-3.5 text-slate-500" /> Template Layout
          </label>
          <select
            value={metadata.templateId}
            onChange={(e) => updateMetadata({ templateId: e.target.value as TemplateId })}
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-800 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Color Palette */}
        <div>
          <label className="flex items-center gap-1.5 font-medium text-slate-700 mb-1.5">
            <Palette className="w-3.5 h-3.5 text-slate-500" /> Accent Color
          </label>
          <div className="flex items-center gap-1.5">
            {PALETTES.map((p) => (
              <button
                key={p.color}
                type="button"
                onClick={() => updateMetadata({ primaryColor: p.color })}
                title={p.name}
                className={`w-6 h-6 rounded-full transition-transform ${
                  metadata.primaryColor === p.color
                    ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>
        </div>

        {/* Typography */}
        <div>
          <label className="flex items-center gap-1.5 font-medium text-slate-700 mb-1.5">
            <Type className="w-3.5 h-3.5 text-slate-500" /> Typography
          </label>
          <select
            value={metadata.fontFamily}
            onChange={(e) => updateMetadata({ fontFamily: e.target.value as FontFamily })}
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-800 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Spacing / Size */}
        <div>
          <label className="flex items-center gap-1.5 font-medium text-slate-700 mb-1.5">
            Spacing & Density
          </label>
          <div className="flex rounded-md border border-slate-300 p-0.5 bg-slate-50">
            {(['compact', 'normal', 'relaxed'] as FontSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => updateMetadata({ fontSize: size })}
                className={`flex-1 py-1 text-center capitalize rounded ${
                  metadata.fontSize === size
                    ? 'bg-white shadow-2xs font-semibold text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

