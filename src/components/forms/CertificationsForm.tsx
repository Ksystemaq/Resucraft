import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export const CertificationsForm: React.FC = () => {
  const { data, addCertification, updateCertification, deleteCertification } = useResume();
  const { certifications } = data;

  return (
    <div className="space-y-4">
      {certifications.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">No certifications or licenses added yet.</p>
          <button
            type="button"
            onClick={addCertification}
            className="text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 rounded font-medium hover:bg-blue-100 dark:hover:bg-blue-900/60 transition inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Certification
          </button>
        </div>
      ) : (
        certifications.map((cert) => (
          <div key={cert.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {cert.name || 'New Certification'}
              </span>
              <button
                type="button"
                onClick={() => deleteCertification(cert.id)}
                className="text-xs text-rose-500 hover:text-rose-700 dark:text-rose-400 p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/60"
                title="Remove certification"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Certification Name</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Amazon Web Services, Google, Coursera"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Issue Date</label>
                <input
                  type="text"
                  placeholder="YYYY-MM"
                  value={cert.issueDate}
                  onChange={(e) => updateCertification(cert.id, { issueDate: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Credential URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={cert.credentialUrl || ''}
                  onChange={(e) => updateCertification(cert.id, { credentialUrl: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addCertification}
        className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition"
      >
        <Plus className="w-3.5 h-3.5" /> Add Another Certification
      </button>
    </div>
  );
};
