import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const DualToneTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#1e3a8a'; // Deep Navy default

  return (
    <div className="resume-page dual-tone-template text-slate-800 bg-white font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0 flex flex-col">
      {/* Full-Width Top Dark Header Bar */}
      <header
        className="px-8 py-6 text-white print:bg-slate-900"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest">
          {basics.fullName || 'Your Name'}
        </h1>
        {basics.headline && (
          <p className="text-xs uppercase tracking-widest text-white/80 font-medium mt-1">
            {basics.headline}
          </p>
        )}
      </header>

      {/* Two-Column Split Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Dark / Contrast Sidebar */}
        <aside
          className="w-full md:w-[35%] p-6 text-white flex flex-col gap-6 print:w-[35%] print:bg-slate-900"
          style={{ backgroundColor: accentColor }}
        >
          {/* Photo if enabled */}
          {metadata.showPhoto && basics.photoUrl && (
            <div className="flex justify-center pb-4 border-b border-white/20">
              <img
                src={basics.photoUrl}
                alt={basics.fullName}
                className="w-24 h-24 rounded-full object-cover border-2 border-white/80 shadow-md"
              />
            </div>
          )}

          {/* Contact */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest pb-1 border-b border-white/30 mb-3 text-white">
              Contact
            </h2>
            <div className="space-y-2.5 text-xs text-white/90">
              {basics.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 opacity-75 shrink-0 mt-0.5" />
                  <span>{basics.location}</span>
                </div>
              )}
              {basics.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 opacity-75 shrink-0" />
                  <span>{basics.phone}</span>
                </div>
              )}
              {basics.email && (
                <div className="flex items-start gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 opacity-75 shrink-0 mt-0.5" />
                  <span>{basics.email}</span>
                </div>
              )}
              {basics.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe className="w-3.5 h-3.5 opacity-75 shrink-0" />
                  <a href={basics.website} target="_blank" rel="noreferrer" className="underline opacity-90 hover:opacity-100">
                    {basics.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {basics.linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <Linkedin className="w-3.5 h-3.5 opacity-75 shrink-0" />
                  <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="underline opacity-90 hover:opacity-100">
                    {basics.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
                  </a>
                </div>
              )}
              {basics.github && (
                <div className="flex items-center gap-2 break-all">
                  <Github className="w-3.5 h-3.5 opacity-75 shrink-0" />
                  <a href={basics.github.startsWith('http') ? basics.github : `https://${basics.github}`} target="_blank" rel="noreferrer" className="underline opacity-90 hover:opacity-100">
                    {basics.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'gh/')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Core Qualifications / Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest pb-1 border-b border-white/30 mb-3 text-white">
                Core Qualifications
              </h2>
              <div className="space-y-3 text-xs">
                {skills.map((cat) => (
                  <div key={cat.id}>
                    <p className="font-bold text-white/95 text-[11px] mb-1">{cat.category}</p>
                    <ul className="space-y-1 text-white/85">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-white/70 rounded-full shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (in sidebar) */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest pb-1 border-b border-white/30 mb-3 text-white">
                Certifications
              </h2>
              <div className="space-y-2 text-xs text-white/90">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-[11px] text-white/75">{c.issuer} ({c.issueDate})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections (in sidebar) */}
          {customSections && customSections.length > 0 && (
            <div className="space-y-4">
              {customSections.map((cs) => (
                <div key={cs.id}>
                  <h2 className="text-xs font-black uppercase tracking-widest pb-1 border-b border-white/30 mb-2 text-white">
                    {cs.title}
                  </h2>
                  <ul className="space-y-1 text-xs text-white/85">
                    {cs.items.map((it, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-white/70 rounded-full shrink-0"></span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Clean White Main Content */}
        <main className="w-full md:w-[65%] p-6 md:p-8 flex flex-col gap-6 print:w-[65%]">
          {/* Summary */}
          {basics.summary && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 pb-1 border-b-2 border-slate-900">
                Professional Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">{basics.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b-2 border-slate-900">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span className="text-sm uppercase tracking-tight">{exp.position}</span>
                      <span className="text-[11px] font-normal text-slate-500">
                        {exp.startDate} – {exp.isCurrent ? 'Current' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mb-1.5">
                      <span>{exp.company}</span>
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

          {/* Featured Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b-2 border-slate-900">
                Key Projects
              </h2>
              <div className="space-y-3">
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
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b-2 border-slate-900">
                Education
              </h2>
              <div className="space-y-3">
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
        </main>
      </div>
    </div>
  );
};
