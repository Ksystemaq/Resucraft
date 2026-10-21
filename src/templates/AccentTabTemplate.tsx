import React from 'react';
import { ResumeData } from '../types/resume';
import { Square } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const AccentTabTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, metadata } = data;
  const accentColor = metadata.primaryColor || '#dc2626'; // Default red/burgundy accent

  return (
    <div className="resume-page accent-tab-template text-slate-800 bg-white font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0 border-t-8 relative" style={{ borderColor: accentColor }}>
      {/* Top Geometric Tab Notch */}
      <div
        className="w-24 h-3 mx-auto rounded-b-md"
        style={{ backgroundColor: accentColor }}
      />

      <div className="p-8 md:p-10 space-y-6">
        {/* Header Block: Photo + Name + Contact Details */}
        <header className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b-2 border-slate-200">
          {basics.photoUrl && (
            <div className="shrink-0">
              <img
                src={basics.photoUrl}
                alt={basics.fullName}
                className="w-28 h-32 object-cover rounded-lg border-2 shadow-sm"
                style={{ borderColor: accentColor }}
              />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h1
              className="text-3xl md:text-4xl font-black uppercase tracking-tight"
              style={{ color: accentColor }}
            >
              {basics.fullName || 'Your Name'}
            </h1>
            {basics.headline && (
              <p className="text-sm font-bold text-slate-700 tracking-wide mt-1 uppercase">
                {basics.headline}
              </p>
            )}

            {/* Contact list with square bullet icons */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-slate-700">
              {basics.location && (
                <div className="flex items-center gap-2">
                  <Square className="w-2.5 h-2.5 fill-current shrink-0" style={{ color: accentColor }} />
                  <span>{basics.location}</span>
                </div>
              )}
              {basics.phone && (
                <div className="flex items-center gap-2">
                  <Square className="w-2.5 h-2.5 fill-current shrink-0" style={{ color: accentColor }} />
                  <span>{basics.phone}</span>
                </div>
              )}
              {basics.email && (
                <div className="flex items-center gap-2">
                  <Square className="w-2.5 h-2.5 fill-current shrink-0" style={{ color: accentColor }} />
                  <span>{basics.email}</span>
                </div>
              )}
              {basics.linkedin && (
                <div className="flex items-center gap-2">
                  <Square className="w-2.5 h-2.5 fill-current shrink-0" style={{ color: accentColor }} />
                  <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                    {basics.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        {basics.summary && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2
                className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 inline-block"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Professional Summary
              </h2>
            </div>
            <div className="md:col-span-9">
              <p className="text-xs text-slate-700 leading-relaxed text-justify">{basics.summary}</p>
            </div>
          </section>
        )}

        {/* Core Qualifications Grid */}
        {skills.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2
                className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 inline-block"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Core Qualifications
              </h2>
            </div>
            <div className="md:col-span-9">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2 text-xs text-slate-700">
                {skills.flatMap((s) => s.items).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience with Dashed Dividers */}
        {experience.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2
                className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 inline-block"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Experience
              </h2>
            </div>
            <div className="md:col-span-9 divide-y divide-dashed divide-slate-300 space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id} className={`text-xs ${idx > 0 ? 'pt-4' : ''}`}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-sm uppercase tracking-tight">{exp.position}</span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? 'Current' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold mb-2" style={{ color: accentColor }}>
                    <span>{exp.company}</span>
                    {exp.location && <span className="font-normal text-slate-500">, {exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2
                className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 inline-block"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Projects
              </h2>
            </div>
            <div className="md:col-span-9 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] font-normal hover:underline" style={{ color: accentColor }}>
                        {proj.link.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                  {proj.role && <p className="text-[11px] text-slate-500 italic mb-1">{proj.role}</p>}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
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

        {/* Education */}
        {education.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2
                className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 inline-block"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Education
              </h2>
            </div>
            <div className="md:col-span-9 space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{edu.institution}</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="text-slate-700">
                    {edu.degree} in {edu.fieldOfStudy}
                    {edu.gpa && <span className="text-slate-500 ml-2">| GPA: {edu.gpa}</span>}
                  </div>
                  {edu.honors && <p className="text-[11px] text-slate-500 italic mt-0.5">{edu.honors}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections / Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h2
                className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 inline-block"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Certifications
              </h2>
            </div>
            <div className="md:col-span-9 space-y-1.5 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span className="font-medium text-slate-900">{cert.name} — <span className="text-slate-600">{cert.issuer}</span></span>
                  <span className="text-[11px] text-slate-500">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
