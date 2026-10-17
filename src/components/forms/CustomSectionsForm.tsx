import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, X } from 'lucide-react';

export const CustomSectionsForm: React.FC = () => {
  const { data, addCustomSection, updateCustomSection, deleteCustomSection } = useResume();
  const { customSections } = data;
  const [newItemInput, setNewItemInput] = useState<{ [sectionId: string]: string }>({});

  const handleAddItem = (sectionId: string, items: string[]) => {
    const val = (newItemInput[sectionId] || '').trim();
    if (val) {
      updateCustomSection(sectionId, { items: [...items, val] });
      setNewItemInput((prev) => ({ ...prev, [sectionId]: '' }));
    }
  };

  const handleRemoveItem = (sectionId: string, items: string[], itemIdx: number) => {
    const updated = items.filter((_, idx) => idx !== itemIdx);
    updateCustomSection(sectionId, { items: updated });
  };

  return (
    <div className="space-y-4">
      {customSections.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 mb-2">No custom sections added yet (e.g. Languages, Publications, Volunteer Work).</p>
          <button
            type="button"
            onClick={addCustomSection}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded font-medium hover:bg-blue-100 transition inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom Section
          </button>
        </div>
      ) : (
        customSections.map((cs) => (
          <div key={cs.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <input
                type="text"
                placeholder="Section Title (e.g. Languages, Volunteer Work)"
                value={cs.title}
                onChange={(e) => updateCustomSection(cs.id, { title: e.target.value })}
                className="text-xs font-bold text-slate-800 bg-white px-2 py-1 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none w-2/3"
              />
              <button
                type="button"
                onClick={() => deleteCustomSection(cs.id)}
                className="text-xs text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                title="Remove section"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of items */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {cs.items.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-white border border-slate-300 text-slate-700 rounded-md shadow-2xs"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(cs.id, cs.items, idx)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input to add item */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type item content and press Add or Enter..."
                value={newItemInput[cs.id] || ''}
                onChange={(e) => setNewItemInput({ ...newItemInput, [cs.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem(cs.id, cs.items);
                  }
                }}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddItem(cs.id, cs.items)}
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
        onClick={addCustomSection}
        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition"
      >
        <Plus className="w-3.5 h-3.5" /> Add Another Section
      </button>
    </div>
  );
};

