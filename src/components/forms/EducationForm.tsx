import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { data, addEducation, updateEducation, deleteEducation } = useResume();
  const { education } = data;

  return (
    <div className="space-y-4">
      {education.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">No education entries added yet.</p>
          <button
            type="button"
            onClick={addEducation}
            className="text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 rounded font-medium hover:bg-blue-100 dark:hover:bg-blue-900/60 transition inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Education
          </button>
        </div>
      ) : (
        education.map((edu, index) => (
          <div key={edu.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 relative">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                Education #{index + 1}: {edu.institution || 'School / University'}
              </span>
              <button
                type="button"
                onClick={() => deleteEducation(edu.id)}
                className="text-xs text-rose-500 hover:text-rose-700 dark:text-rose-400 p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/60"
                title="Remove education"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">School / University</label>
                <input
                  type="text"
                  placeholder="e.g. University of California, Berkeley"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Degree / Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Field of Study / Major</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science, Economics"
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM"
                    disabled={edu.isCurrent}
                    value={edu.isCurrent ? 'Present' : edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 dark:disabled:text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">GPA (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 3.8 / 4.0"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Honors / Activities (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Dean's List, Cum Laude"
                  value={edu.honors || ''}
                  onChange={(e) => updateEducation(edu.id, { honors: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addEducation}
        className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition"
      >
        <Plus className="w-3.5 h-3.5" /> Add Another Education
      </button>
    </div>
  );
};

