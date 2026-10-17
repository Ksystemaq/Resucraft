import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, X } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { data, addSkillCategory, updateSkillCategory, deleteSkillCategory } = useResume();
  const { skills } = data;
  const [newSkillInput, setNewSkillInput] = useState<{ [categoryId: string]: string }>({});

  const handleAddSkillItem = (categoryId: string, items: string[]) => {
    const val = (newSkillInput[categoryId] || '').trim();
    if (val) {
      // Allow comma-separated bulk addition
      const newTags = val.split(',').map((s) => s.trim()).filter((s) => s.length > 0 && !items.includes(s));
      updateSkillCategory(categoryId, { items: [...items, ...newTags] });
      setNewSkillInput((prev) => ({ ...prev, [categoryId]: '' }));
    }
  };

  const handleRemoveSkillItem = (categoryId: string, items: string[], itemIdx: number) => {
    const updated = items.filter((_, idx) => idx !== itemIdx);
    updateSkillCategory(categoryId, { items: updated });
  };

  return (
    <div className="space-y-4">
      {skills.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 mb-2">No skills categories added yet.</p>
          <button
            type="button"
            onClick={addSkillCategory}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded font-medium hover:bg-blue-100 transition inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Skill Category
          </button>
        </div>
      ) : (
        skills.map((skillCat) => (
          <div key={skillCat.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <input
                type="text"
                placeholder="Category Name (e.g. Technical Skills)"
                value={skillCat.category}
                onChange={(e) => updateSkillCategory(skillCat.id, { category: e.target.value })}
                className="text-xs font-bold text-slate-800 bg-white px-2 py-1 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none w-2/3"
              />
              <button
                type="button"
                onClick={() => deleteSkillCategory(skillCat.id)}
                className="text-xs text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                title="Remove category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Existing skill tag pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {skillCat.items.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-white border border-slate-300 text-slate-700 rounded-full shadow-2xs"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkillItem(skillCat.id, skillCat.items, idx)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input to add more */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a skill (e.g. React, Python) and press Add or Enter..."
                value={newSkillInput[skillCat.id] || ''}
                onChange={(e) => setNewSkillInput({ ...newSkillInput, [skillCat.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkillItem(skillCat.id, skillCat.items);
                  }
                }}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddSkillItem(skillCat.id, skillCat.items)}
                className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addSkillCategory}
        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition"
      >
        <Plus className="w-3.5 h-3.5" /> Add Another Category
      </button>
    </div>
  );
};

