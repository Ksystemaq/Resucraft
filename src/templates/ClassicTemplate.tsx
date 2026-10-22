import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#1e293b';

  return (
    <div className="resume-page classic-template text-slate-800 bg-white p-8 md:p-10 font-serif leading-relaxed w-[800px] min-w-[800px] max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0">
      {/* Header */}
      <header className="border-b-2 pb-4 mb-6 text-center" style={{ borderColor: accentColor }}>
        {metadata.showPhoto && basics.photoUrl && (
          <div className="flex justify-center mb-3">
            <img
              src={basics.photoUrl}
              alt={basics.fullName}
              className="w-24 h-24 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: accentColor }}
            />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
          {basics.fullName || 'Your Name'}
        </h1>
        {basics.headline && (
          <p className="text-lg font-medium text-slate-600 mb-2">{basics.headline}</p>
        )}

        {/* Contact info row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {basics.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{basics.email}</span>
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{basics.phone}</span>
            </span>
          )}
          {basics.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{basics.location}</span>
            </span>
          )}
          {basics.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <a href={basics.website} target="_blank" rel="noreferrer" className="hover:underline">
                {basics.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {basics.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" />
              <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                {basics.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
              </a>
            </span>
          )}
          {basics.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5" />
              <a href={basics.github.startsWith('http') ? basics.github : `https://${basics.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                {basics.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'gh/')}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-5">
          <h2
            className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">{basics.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.position}</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-slate-600 italic mb-1.5">
                  <span>{exp.company}</span>
                  {exp.location && <span className="text-[11px]">{exp.location}</span>}
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
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
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="text-slate-500 ml-2">| GPA: {edu.gpa}</span>}
                </div>
                {edu.honors && (
                  <p className="text-[11px] text-slate-500 italic mt-0.5">{edu.honors}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Skills & Competencies
          </h2>
          <div className="space-y-1.5 text-xs">
            {skills.map((skill) => (
              <div key={skill.id} className="flex flex-wrap items-baseline gap-1">
                <span className="font-bold text-slate-800">{skill.category}:</span>
                <span className="text-slate-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
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

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Certifications
          </h2>
          <div className="space-y-1.5 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span className="font-medium text-slate-900">{cert.name} — <span className="text-slate-600">{cert.issuer}</span></span>
                <span className="text-[11px] text-slate-500">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <>
          {customSections.map((cs) => (
            <section key={cs.id} className="mb-5">
              <h2
                className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b"
                style={{ color: accentColor, borderColor: '#e2e8f0' }}
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
    </div>
  );
};

