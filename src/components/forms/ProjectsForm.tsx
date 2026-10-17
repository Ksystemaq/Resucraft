import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const { data, addProject, updateProject, deleteProject } = useResume();
  const { projects } = data;

  const handleBulletChange = (projId: string, bullets: string[], bulletIndex: number, value: string) => {
    const updated = [...bullets];
    updated[bulletIndex] = value;
    updateProject(projId, { bullets: updated });
  };

  const addBullet = (projId: string, bullets: string[]) => {
    updateProject(projId, { bullets: [...bullets, ''] });
  };

  const removeBullet = (projId: string, bullets: string[], bulletIndex: number) => {
    const updated = bullets.filter((_, idx) => idx !== bulletIndex);
    updateProject(projId, { bullets: updated });
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 mb-2">No projects added yet.</p>
          <button
            type="button"
            onClick={addProject}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded font-medium hover:bg-blue-100 transition inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>
      ) : (
        projects.map((proj, index) => (
          <div key={proj.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                Project #{index + 1}: {proj.title || 'Untitled Project'}
              </span>
              <button
                type="button"
                onClick={() => deleteProject(proj.id)}
                className="text-xs text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                title="Remove project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. E-Commerce Platform"
                  value={proj.title}
                  onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Your Role / Technologies</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Developer (React, Node.js)"
                  value={proj.role || ''}
                  onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Project URL / GitHub Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={proj.link || ''}
                  onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Bullets */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-600">Key Highlights & Impact</label>
                <button
                  type="button"
                  onClick={() => addBullet(proj.id, proj.bullets || [])}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Highlight
                </button>
              </div>
              <div className="space-y-1.5">
                {(proj.bullets || []).map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-1.5">
                    <span className="text-slate-400 text-xs mt-2">•</span>
                    <textarea
                      rows={2}
                      placeholder="e.g. Designed database schema in PostgreSQL and implemented secure Stripe payment gateway..."
                      value={bullet}
                      onChange={(e) => handleBulletChange(proj.id, proj.bullets, bIdx, e.target.value)}
                      className="w-full text-xs px-2.5 py-1 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(proj.id, proj.bullets, bIdx)}
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
        onClick={addProject}
        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition"
      >
        <Plus className="w-3.5 h-3.5" /> Add Another Project
      </button>
    </div>
  );
};

