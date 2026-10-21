import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { TemplateId, FontFamily, FontSize } from '../types/resume';
import { ThemeToggle } from './ThemeToggle';
import { Palette, Type, LayoutTemplate, Sliders, AlignJustify, AlignLeft, Maximize2, Moon } from 'lucide-react';

const PALETTES = [
  { name: 'Navy',       color: '#1e3a8a' },
  { name: 'Sky Blue',   color: '#0284c7' },
  { name: 'Emerald',    color: '#059669' },
  { name: 'Teal',       color: '#0d9488' },
  { name: 'Indigo',     color: '#4f46e5' },
  { name: 'Purple',     color: '#7c3aed' },
  { name: 'Burgundy',   color: '#991b1b' },
  { name: 'Amber',      color: '#d97706' },
  { name: 'Rose',       color: '#e11d48' },
  { name: 'Slate',      color: '#334155' },
];

const FONTS: { id: FontFamily; label: string; preview: string }[] = [
  { id: 'Inter',        label: 'Inter',        preview: 'Modern & Clean' },
  { id: 'Roboto',       label: 'Roboto',       preview: 'Neutral & Professional' },
  { id: 'Merriweather', label: 'Merriweather', preview: 'Classic Serif' },
  { id: 'Lora',         label: 'Lora',         preview: 'Editorial Serif' },
];

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'classic',    label: 'Classic Standard' },
  { id: 'modern',     label: 'Modern Clean' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'creative',   label: 'Creative Banner' },
  { id: 'student',    label: 'Student / Academic' },
  { id: 'executive',  label: 'Executive Horizon' },
  { id: 'accent-tab', label: 'Accent Tab Geometric' },
  { id: 'dual-tone',  label: 'Dual-Tone High Contrast' },
  { id: 'elegant',    label: 'Prestige Monogram' },
  { id: 'timeline',   label: 'Tech Timeline Rail' },
];

const SPACING_OPTIONS: { value: FontSize; label: string; icon: React.ReactNode }[] = [
  { value: 'compact',  label: 'Compact',  icon: <AlignJustify className="w-3 h-3" /> },
  { value: 'normal',   label: 'Normal',   icon: <AlignLeft className="w-3 h-3" /> },
  { value: 'relaxed',  label: 'Relaxed',  icon: <Maximize2 className="w-3 h-3" /> },
];

export const StyleCustomizer: React.FC = () => {
  const { data, updateMetadata } = useResume();
  const { metadata } = data;
  const [showHexInput, setShowHexInput] = useState(false);
  const [hexValue, setHexValue] = useState(metadata.primaryColor || '#1e3a8a');

  const activePalette = PALETTES.find((p) => p.color === metadata.primaryColor);

  const applyHex = (val: string) => {
    const cleaned = val.startsWith('#') ? val : `#${val}`;
    if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
      updateMetadata({ primaryColor: cleaned });
      setHexValue(cleaned);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80">
        <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Design & Styling Controls</span>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">

        {/* ── Template Layout ── */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-[10px]">
            <LayoutTemplate className="w-3 h-3 text-slate-400" /> Template
          </label>
          <select
            value={metadata.templateId}
            onChange={(e) => updateMetadata({ templateId: e.target.value as TemplateId })}
            className="w-full px-2.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                       hover:border-slate-300 dark:hover:border-slate-600"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* ── Accent Color ── */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-[10px]">
            <Palette className="w-3 h-3 text-slate-400" /> Accent Color
          </label>

          {/* Swatches */}
          <div className="flex flex-wrap gap-1.5">
            {PALETTES.map((p) => (
              <button
                key={p.color}
                type="button"
                onClick={() => { updateMetadata({ primaryColor: p.color }); setHexValue(p.color); }}
                aria-label={`Set accent color to ${p.name}`}
                title={p.name}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-150 shrink-0 ${
                  metadata.primaryColor === p.color
                    ? 'border-white ring-2 ring-offset-1 ring-blue-500 scale-110'
                    : 'border-transparent hover:scale-110 hover:border-white hover:ring-2 hover:ring-slate-300 dark:hover:ring-slate-600'
                }`}
                style={{ backgroundColor: p.color }}
              />
            ))}
            {/* Custom color trigger */}
            <button
              type="button"
              title="Custom hex color"
              onClick={() => setShowHexInput(!showHexInput)}
              className="w-6 h-6 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500
                         flex items-center justify-center text-slate-400 dark:text-slate-500 text-[10px] transition"
              aria-label="Enter custom hex color"
            >
              #
            </button>
          </div>

          {/* Active color label */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full shrink-0 border border-slate-200 dark:border-slate-700"
              style={{ backgroundColor: metadata.primaryColor }}
            />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              {activePalette ? activePalette.name : 'Custom'} · {metadata.primaryColor?.toUpperCase()}
            </span>
          </div>

          {/* Hex input (togglable) */}
          {showHexInput && (
            <input
              type="text"
              value={hexValue}
              maxLength={7}
              onChange={(e) => setHexValue(e.target.value)}
              onBlur={(e) => applyHex(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyHex(hexValue)}
              placeholder="#1e3a8a"
              className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              aria-label="Custom hex color input"
            />
          )}
        </div>

        {/* ── Typography ── */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-[10px]">
            <Type className="w-3 h-3 text-slate-400" /> Resume Font
          </label>
          <select
            value={metadata.fontFamily}
            onChange={(e) => updateMetadata({ fontFamily: e.target.value as FontFamily })}
            className="w-full px-2.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                       hover:border-slate-300 dark:hover:border-slate-600"
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>{f.label} — {f.preview}</option>
            ))}
          </select>
        </div>

        {/* ── Spacing & Density ── */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-[10px]">
            Spacing & Density
          </label>
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800/80 gap-0.5">
            {SPACING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateMetadata({ fontSize: opt.value })}
                title={opt.label}
                aria-label={`Set spacing to ${opt.label}`}
                className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-md text-[10px] font-medium transition-all duration-150 ${
                  metadata.fontSize === opt.value
                    ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Dark Mode / App Theme Preference ── */}
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
              Dark Mode & Theme Preference
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
              (Workspace, builder, and viewer appearance)
            </span>
          </div>
          <div className="w-full sm:w-64">
            <ThemeToggle variant="segmented" />
          </div>
        </div>
      </div>
    </div>
  );
};
