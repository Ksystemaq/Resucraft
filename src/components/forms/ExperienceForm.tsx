import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { data, addExperience, updateExperience, deleteExperience } = useResume();
  const { experience } = data;

  const handleBulletChange = (expId: string, bullets: string[], bulletIndex: number, value: string) => {
    const updated = [...bullets];
    updated[bulletIndex] = value;
    updateExperience(expId, { bullets: updated });
  };

  const addBullet = (expId: string, bullets: string[]) => {
    updateExperience(expId, { bullets: [...bullets, ''] });
  };

  const removeBullet = (expId: string, bullets: string[], bulletIndex: number) => {
    const updated = bullets.filter((_, idx) => idx !== bulletIndex);
    updateExperience(expId, { bullets: updated });
  };

  return (
    <div className="space-y-4">
      {experience.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 mb-2">No work experience or internships added yet.</p>
          <button
            type="button"
            onClick={addExperience}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded font-medium hover:bg-blue-100 transition inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </button>
        </div>
      ) : (
        experience.map((exp, index) => (
          <div key={exp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                Experience #{index + 1}: {exp.position || 'Untitled Position'}
              </span>
              <button
                type="button"
                onClick={() => deleteExperience(exp.id)}
                className="text-xs text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                title="Remove experience"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Position / Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Technologies"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. New York, NY (or Remote)"
                  value={exp.location || ''}
                  onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Start Date</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">End Date</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM"
                    disabled={exp.isCurrent}
                    value={exp.isCurrent ? 'Present' : exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.isCurrent}
                  onChange={(e) => updateExperience(exp.id, { isCurrent: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-0"
                />
                I currently work here
              </label>
            </div>

            {/* Bullets */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-600">Key Achievements & Responsibilities</label>
                <button
                  type="button"
                  onClick={() => addBullet(exp.id, exp.bullets || [])}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Bullet
                </button>
              </div>
              <div className="space-y-1.5">
                {(exp.bullets || []).map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-1.5">
                    <span className="text-slate-400 text-xs mt-2">•</span>
                    <textarea
                      rows={2}
                      placeholder="e.g. Spearheaded redesign of customer onboarding flow, increasing conversions by 28%..."
                      value={bullet}
                      onChange={(e) => handleBulletChange(exp.id, exp.bullets, bIdx, e.target.value)}
                      className="w-full text-xs px-2.5 py-1 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(exp.id, exp.bullets, bIdx)}
                      className="text-slate-400 hover:text-rose-500 p-1 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addExperience}
        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition"
      >
        <Plus className="w-3.5 h-3.5" /> Add Another Experience
      </button>
    </div>
  );
};

