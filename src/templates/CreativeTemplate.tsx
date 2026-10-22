import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#7c3aed'; // default purple/violet

  return (
    <div className="resume-page creative-template text-slate-800 bg-white font-sans w-[800px] min-w-[800px] max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0">
      {/* Top Banner Header */}
      <header
        className="p-8 text-white flex flex-row items-center justify-between gap-6 print:bg-slate-900"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex items-center gap-5">
          {metadata.showPhoto && basics.photoUrl && (
            <img
              src={basics.photoUrl}
              alt={basics.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
            />
          )}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">
              {basics.fullName || 'Your Name'}
            </h1>
            {basics.headline && (
              <p className="text-sm font-medium text-white/90 tracking-wide uppercase">{basics.headline}</p>
            )}
          </div>
        </div>

        {/* Contact block */}
        <div className="flex flex-col gap-1 text-xs text-white/90 self-start md:self-auto">
          {basics.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 opacity-80" /> {basics.email}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 opacity-80" /> {basics.phone}
            </span>
          )}
          {basics.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-80" /> {basics.location}
            </span>
          )}
          <div className="flex gap-3 mt-1 text-[11px]">
            {basics.website && (
              <a href={basics.website} target="_blank" rel="noreferrer" className="underline opacity-90 hover:opacity-100">
                Portfolio
              </a>
            )}
            {basics.linkedin && (
              <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="underline opacity-90 hover:opacity-100">
                LinkedIn
              </a>
            )}
            {basics.github && (
              <a href={basics.github.startsWith('http') ? basics.github : `https://${basics.github}`} target="_blank" rel="noreferrer" className="underline opacity-90 hover:opacity-100">
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="p-8 space-y-6">
        {/* Summary */}
        {basics.summary && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">About Me</h2>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-4 border-l-2 border-slate-100">{basics.summary}</p>
          </section>
        )}

        {/* Skills - Pill format */}
        {skills.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Expertise & Skills</h2>
            </div>
            <div className="space-y-2.5 pl-4">
              {skills.map((skill) => (
                <div key={skill.id} className="text-xs">
                  <span className="font-semibold text-slate-800 mr-2">{skill.category}:</span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1">
                    {skill.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Experience</h2>
            </div>
            <div className="space-y-4 pl-4 border-l-2 border-slate-100 ml-1">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs relative">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-sm">{exp.position}</span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium mb-1.5">
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

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Key Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 mb-1">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] hover:underline" style={{ color: accentColor }}>
                        Link ↗
                      </a>
                    )}
                  </div>
                  {proj.role && <p className="text-[10px] text-slate-500 mb-1">{proj.role}</p>}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-3 space-y-1 text-slate-600 text-[11px]">
                      {proj.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Education</h2>
              </div>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-slate-900">{edu.institution}</p>
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
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Certifications</h2>
              </div>
              <div className="space-y-2 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-slate-600 text-[11px]">{cert.issuer} ({cert.issueDate})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <>
            {customSections.map((cs) => (
              <section key={cs.id} className="pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">{cs.title}</h2>
                </div>
                <div className="text-xs text-slate-700">
                  {cs.items.join(' • ')}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

