import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const TimelineTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#0284c7'; // Sky / Teal / Indigo

  return (
    <div className="resume-page timeline-template text-slate-800 bg-white p-8 md:p-10 font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0">
      {/* Modern Header with Border Accent */}
      <header className="pb-6 mb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              {basics.fullName || 'Your Name'}
            </h1>
            {basics.headline && (
              <p className="text-sm font-semibold mt-1" style={{ color: accentColor }}>
                {basics.headline}
              </p>
            )}
          </div>

          {/* Contact Badges */}
          <div className="flex flex-col gap-1 text-xs text-slate-600 sm:items-end">
            {basics.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {basics.location}
              </span>
            )}
            <div className="flex gap-2.5 mt-1 text-[11px]">
              {basics.website && (
                <a href={basics.website} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: accentColor }}>
                  {basics.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {basics.linkedin && (
                <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: accentColor }}>
                  LinkedIn
                </a>
              )}
              {basics.github && (
                <a href={basics.github.startsWith('http') ? basics.github : `https://${basics.github}`} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: accentColor }}>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-700 leading-relaxed font-normal">{basics.summary}</p>
        </section>
      )}

      {/* Experience with Timeline Rail */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            Career Timeline & Experience
          </h2>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {experience.map((exp) => (
              <div key={exp.id} className="relative text-xs">
                {/* Timeline node */}
                <span
                  className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-xs"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <span className="font-bold text-slate-900 text-sm">{exp.position}</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-600 mb-1.5">
                  <span style={{ color: accentColor }}>{exp.company}</span>
                  {exp.location && <span className="text-slate-400"> • {exp.location}</span>}
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
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

      {/* Skills Matrix */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            Skills & Technical Stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {skills.map((cat) => (
              <div key={cat.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1.5">{cat.category}</span>
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((it, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded text-[11px] font-medium"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs p-3 bg-slate-50/50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                  <span>{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] hover:underline" style={{ color: accentColor }}>
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

      {/* Education & Certifications Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-slate-900">{edu.institution}</p>
                  <p className="text-slate-600">{edu.degree} in {edu.fieldOfStudy}</p>
                  <p className="text-[11px] text-slate-400">
                    {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Certifications
            </h2>
            <div className="space-y-2 text-xs">
              {certifications.map((c) => (
                <div key={c.id}>
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-slate-500 text-[11px]">{c.issuer} ({c.issueDate})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-200">
          {customSections.map((cs) => (
            <div key={cs.id} className="text-xs text-slate-700 mb-2">
              <span className="font-bold text-slate-900 mr-2">{cs.title}:</span>
              <span>{cs.items.join(' • ')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
