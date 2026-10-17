import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, experience, education, skills, projects, certifications, customSections, metadata } = data;
  const accentColor = metadata.primaryColor || '#78350f'; // Warm Amber / Bronze / Dark Charcoal

  // Generate initials for monogram badge
  const initials = basics.fullName
    ? basics.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'RC';

  return (
    <div className="resume-page elegant-template text-stone-800 bg-[#fdfdfc] p-8 md:p-12 font-serif max-w-[800px] mx-auto min-h-[1050px] shadow-sm print:shadow-none print:p-0 print:m-0 border border-stone-200">
      {/* Decorative Outer Thin Frame */}
      <div className="border border-stone-300 p-6 md:p-8 relative">
        {/* Monogram Badge & Candidate Title Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-lg tracking-widest shadow-2xs"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {initials}
            </div>
          </div>

          <h1 className="text-3xl font-normal tracking-wide text-stone-900 uppercase">
            {basics.fullName || 'Your Name'}
          </h1>
          {basics.headline && (
            <p className="text-xs uppercase tracking-widest text-stone-500 mt-1 font-sans">
              {basics.headline}
            </p>
          )}

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 my-3">
            <div className="w-12 h-[1px] bg-stone-300"></div>
            <div className="w-1.5 h-1.5 rotate-45 border border-stone-400"></div>
            <div className="w-12 h-[1px] bg-stone-300"></div>
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-600 font-sans">
            {basics.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" /> {basics.location}
              </span>
            )}
            {basics.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-stone-400" /> {basics.phone}
              </span>
            )}
            {basics.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-stone-400" /> {basics.email}
              </span>
            )}
            {basics.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-stone-400" />
                <a href={basics.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {basics.website.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
            {basics.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-stone-400" />
                <a href={basics.linkedin.startsWith('http') ? basics.linkedin : `https://${basics.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </span>
            )}
          </div>
        </header>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Summary */}
          {basics.summary && (
            <section className="text-center max-w-2xl mx-auto pb-4">
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "{basics.summary}"
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section>
              <div className="flex items-center justify-between pb-1 mb-3 border-b" style={{ borderColor: accentColor }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans">
                  Professional Experience
                </h2>
              </div>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-stone-900">
                      <span className="text-sm">{exp.position}</span>
                      <span className="text-[11px] font-sans font-normal text-stone-500">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-stone-600 italic mb-1.5">
                      <span>{exp.company}</span>
                      {exp.location && <span className="font-sans text-[11px] not-italic text-stone-500">{exp.location}</span>}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-stone-700">
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
            <section>
              <div className="flex items-center justify-between pb-1 mb-3 border-b" style={{ borderColor: accentColor }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans">
                  Academic History
                </h2>
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-stone-900">
                      <span>{edu.institution}</span>
                      <span className="text-[11px] font-sans font-normal text-stone-500">
                        {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                      </span>
                    </div>
                    <div className="text-stone-700">
                      {edu.degree} in {edu.fieldOfStudy}
                      {edu.gpa && <span className="text-stone-500 ml-2 font-sans text-[11px]">| GPA: {edu.gpa}</span>}
                    </div>
                    {edu.honors && <p className="text-[11px] text-stone-500 italic mt-0.5">{edu.honors}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills & Competencies */}
          {skills.length > 0 && (
            <section>
              <div className="flex items-center justify-between pb-1 mb-3 border-b" style={{ borderColor: accentColor }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans">
                  Areas of Expertise
                </h2>
              </div>
              <div className="space-y-1.5 text-xs">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex flex-wrap items-baseline gap-1">
                    <span className="font-bold text-stone-800">{skill.category}:</span>
                    <span className="text-stone-700 font-sans text-xs">{skill.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <div className="flex items-center justify-between pb-1 mb-3 border-b" style={{ borderColor: accentColor }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans">
                  Notable Projects
                </h2>
              </div>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-stone-900">
                      <span>{proj.title}</span>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] font-sans font-normal hover:underline" style={{ color: accentColor }}>
                          {proj.link.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                    {proj.role && <p className="text-[11px] text-stone-500 italic mb-1">{proj.role}</p>}
                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-stone-700">
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

          {/* Certifications & Custom Sections */}
          {certifications && certifications.length > 0 && (
            <section>
              <div className="flex items-center justify-between pb-1 mb-3 border-b" style={{ borderColor: accentColor }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans">
                  Certifications & Honors
                </h2>
              </div>
              <div className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <span className="font-medium text-stone-900">{cert.name} — <span className="text-stone-600">{cert.issuer}</span></span>
                    <span className="text-[11px] font-sans text-stone-500">{cert.issueDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {customSections && customSections.length > 0 && (
            <>
              {customSections.map((cs) => (
                <section key={cs.id}>
                  <div className="flex items-center justify-between pb-1 mb-2 border-b" style={{ borderColor: accentColor }}>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans">{cs.title}</h2>
                  </div>
                  <div className="text-xs text-stone-700 font-sans">
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
