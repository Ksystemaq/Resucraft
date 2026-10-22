import React from 'react';
import { ResumeData } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#334155';

  return (
    <div className="resume-page minimalist-template text-slate-800 bg-white p-10 font-sans w-[800px] min-w-[800px] max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0">
      {/* Header */}
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-1">
            {basics.fullName || 'Your Name'}
          </h1>
          {basics.headline && (
            <p className="text-sm uppercase tracking-widest text-slate-500 mb-4">{basics.headline}</p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500 font-light">
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>• {basics.phone}</span>}
            {basics.location && <span>• {basics.location}</span>}
            {basics.website && (
              <span>• <a href={basics.website} target="_blank" rel="noreferrer" className="hover:underline">{basics.website.replace(/^https?:\/\//, '')}</a></span>
            )}
            {basics.linkedin && (
              <span>• <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></span>
            )}
            {basics.github && (
              <span>• <a href={basics.github.startsWith('http') ? basics.github : `https://${basics.github}`} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a></span>
            )}
          </div>
        </div>

        {metadata.showPhoto && basics.photoUrl && (
          <img
            src={basics.photoUrl}
            alt={basics.fullName}
            className="w-20 h-20 rounded-full object-cover border border-slate-300 shrink-0"
          />
        )}
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">About</h2>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs text-slate-700 leading-relaxed font-normal">{basics.summary}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Experience</h2>
          </div>
          <div className="md:col-span-3 space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-slate-900">{exp.position}</span>
                  <span className="text-[11px] text-slate-400">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-slate-600 mb-2">
                  <span>{exp.company}</span>
                  {exp.location && <span className="text-slate-400">, {exp.location}</span>}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Education</h2>
          </div>
          <div className="md:col-span-3 space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-slate-900">{edu.institution}</span>
                  <span className="text-[11px] text-slate-400">
                    {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="text-slate-600">
                  {edu.degree} in {edu.fieldOfStudy}
                  {edu.gpa && <span className="text-slate-400"> (GPA: {edu.gpa})</span>}
                </div>
                {edu.honors && <p className="text-[11px] text-slate-400 italic mt-0.5">{edu.honors}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Skills</h2>
          </div>
          <div className="md:col-span-3 space-y-2 text-xs">
            {skills.map((skill) => (
              <div key={skill.id} className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-slate-800 min-w-[120px]">{skill.category}:</span>
                <span className="text-slate-600">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Projects</h2>
          </div>
          <div className="md:col-span-3 space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline font-medium text-slate-900 mb-0.5">
                  <span>{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] hover:underline" style={{ color: accentColor }}>
                      {proj.link.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Credentials</h2>
          </div>
          <div className="md:col-span-3 space-y-1.5 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span className="text-slate-800">{cert.name} — <span className="text-slate-500">{cert.issuer}</span></span>
                <span className="text-[11px] text-slate-400">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <>
          {customSections.map((cs) => (
            <section key={cs.id} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{cs.title}</h2>
              </div>
              <div className="md:col-span-3 text-xs text-slate-600">
                {cs.items.join(' • ')}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
};

