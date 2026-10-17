import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#1e293b';

  return (
    <div className="resume-page executive-template text-slate-800 bg-white font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0">
      {/* Top Dark Contact Ribbon Bar */}
      <div
        className="px-8 py-3 text-white flex flex-wrap items-center justify-between gap-y-1 text-xs font-medium print:bg-slate-900"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          {basics.location && (
            <span className="flex items-center gap-1.5 opacity-90">
              <MapPin className="w-3.5 h-3.5" /> {basics.location}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone className="w-3.5 h-3.5" /> {basics.phone}
            </span>
          )}
          {basics.email && (
            <span className="flex items-center gap-1.5 opacity-90">
              <Mail className="w-3.5 h-3.5" /> {basics.email}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] opacity-80">
          {basics.linkedin && (
            <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
          {basics.github && (
            <a href={basics.github.startsWith('http') ? basics.github : `https://${basics.github}`} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
          )}
          {basics.website && (
            <a href={basics.website} target="_blank" rel="noreferrer" className="hover:underline">
              Website
            </a>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="p-8 md:p-10">
        {/* Candidate Name & Title Header */}
        <header className="mb-8 pb-4 border-b border-slate-300">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            {basics.fullName || 'Your Name'}
          </h1>
          {basics.headline && (
            <p className="text-sm font-semibold text-slate-600 mt-1 uppercase tracking-wider" style={{ color: accentColor }}>
              {basics.headline}
            </p>
          )}
        </header>

        {/* Left-Header Grid Layout for Sections */}
        <div className="space-y-6">
          {/* Summary */}
          {basics.summary && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-slate-200">
              <div className="md:col-span-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Professional Summary
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-xs text-slate-700 leading-relaxed text-justify font-normal">
                  {basics.summary}
                </p>
              </div>
            </section>
          )}

          {/* Core Qualifications / Skills Grid */}
          {skills.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-slate-200">
              <div className="md:col-span-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Core Qualifications
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-700">
                  {skills.flatMap((s) => s.items).slice(0, 10).map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-slate-200">
              <div className="md:col-span-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Work Experience
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span className="text-sm">{exp.position}</span>
                      <span className="text-[11px] font-normal text-slate-500">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-slate-600 font-semibold mb-1.5">
                      <span style={{ color: accentColor }}>{exp.company}</span>
                      {exp.location && <span className="font-normal text-slate-400">, {exp.location}</span>}
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

          {/* Key Projects */}
          {projects.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-slate-200">
              <div className="md:col-span-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Key Projects
                </h2>
              </div>
              <div className="md:col-span-8 space-y-3">
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
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-slate-200">
              <div className="md:col-span-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Education
                </h2>
              </div>
              <div className="md:col-span-8 space-y-3">
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

          {/* Certifications & Custom */}
          {certifications && certifications.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Certifications
                </h2>
              </div>
              <div className="md:col-span-8 space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <span className="font-medium text-slate-900">{cert.name} — <span className="text-slate-600">{cert.issuer}</span></span>
                    <span className="text-[11px] text-slate-500">{cert.issueDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {customSections && customSections.length > 0 && (
            <>
              {customSections.map((cs) => (
                <section key={cs.id} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">{cs.title}</h2>
                  </div>
                  <div className="md:col-span-8 text-xs text-slate-700">
                    {cs.items.join(' • ')}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
