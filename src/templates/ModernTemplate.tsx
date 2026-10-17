import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#0284c7';

  return (
    <div className="resume-page modern-template text-slate-800 bg-white font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0 flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <aside className="w-full md:w-[32%] bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-6 print:w-[32%] print:bg-slate-50">
        {/* Photo if enabled */}
        {metadata.showPhoto && basics.photoUrl && (
          <div className="flex justify-center">
            <img
              src={basics.photoUrl}
              alt={basics.fullName}
              className="w-28 h-28 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: accentColor }}
            />
          </div>
        )}

        {/* Contact Details */}
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
            style={{ color: accentColor, borderColor: '#cbd5e1' }}
          >
            Contact
          </h2>
          <div className="space-y-2 text-xs text-slate-700">
            {basics.email && (
              <div className="flex items-start gap-2 break-all">
                <Mail className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                <span>{basics.email}</span>
              </div>
            )}
            {basics.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{basics.phone}</span>
              </div>
            )}
            {basics.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{basics.location}</span>
              </div>
            )}
            {basics.website && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href={basics.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {basics.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {basics.linkedin && (
              <div className="flex items-center gap-2 break-all">
                <Linkedin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {basics.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
                </a>
              </div>
            )}
            {basics.github && (
              <div className="flex items-center gap-2 break-all">
                <Github className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href={basics.github.startsWith('http') ? basics.github : `https://${basics.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {basics.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'gh/')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Education (in sidebar for Modern layout) */}
        {education.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: accentColor, borderColor: '#cbd5e1' }}
            >
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold text-slate-900">{edu.institution}</p>
                  <p className="text-slate-700">{edu.degree} in {edu.fieldOfStudy}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-[11px] text-slate-500">GPA: {edu.gpa}</p>}
                  {edu.honors && <p className="text-[11px] text-slate-500 italic">{edu.honors}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills (in sidebar) */}
        {skills.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: accentColor, borderColor: '#cbd5e1' }}
            >
              Skills
            </h2>
            <div className="space-y-3 text-xs">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="font-semibold text-slate-800 mb-1">{skill.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[11px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications (in sidebar if present) */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: accentColor, borderColor: '#cbd5e1' }}
            >
              Certifications
            </h2>
            <div className="space-y-2 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-semibold text-slate-800">{cert.name}</p>
                  <p className="text-[11px] text-slate-600">{cert.issuer} • {cert.issueDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="w-full md:w-[68%] p-6 md:p-8 flex flex-col gap-6 print:w-[68%]">
        {/* Name & Headline Header */}
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">
            {basics.fullName || 'Your Name'}
          </h1>
          {basics.headline && (
            <p className="text-base font-semibold" style={{ color: accentColor }}>
              {basics.headline}
            </p>
          )}
        </header>

        {/* Summary */}
        {basics.summary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b text-slate-900"
              style={{ borderColor: accentColor }}
            >
              Profile
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">{basics.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b text-slate-900"
              style={{ borderColor: accentColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-sm">{exp.position}</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 mb-1.5 font-medium">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-[11px] text-slate-500">{exp.location}</span>}
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
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b text-slate-900"
              style={{ borderColor: accentColor }}
            >
              Featured Projects
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

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <>
            {customSections.map((cs) => (
              <section key={cs.id}>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b text-slate-900"
                  style={{ borderColor: accentColor }}
                >
                  {cs.title}
                </h2>
                <div className="text-xs text-slate-700">
                  {cs.items.join(' • ')}
                </div>
              </section>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

