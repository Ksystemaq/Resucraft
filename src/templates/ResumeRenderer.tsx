import React from 'react';
import { ResumeData } from '../types/resume';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { StudentTemplate } from './StudentTemplate';

interface ResumeRendererProps {
  data: ResumeData;
  scale?: number;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data, scale = 1 }) => {
  const { metadata } = data;

  const fontClass = {
    Inter: 'font-sans',
    Roboto: 'font-["Roboto"]',
    Merriweather: 'font-serif',
    Lora: 'font-["Lora"]',
  }[metadata.fontFamily] || 'font-sans';

  const sizeClass = {
    compact: 'text-[11px] leading-snug',
    normal: 'text-xs leading-normal',
    relaxed: 'text-[13px] leading-relaxed',
  }[metadata.fontSize] || 'text-xs leading-normal';

  const renderTemplate = () => {
    switch (metadata.templateId) {
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'student':
        return <StudentTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div
      id="printable-resume"
      className={`resume-container ${fontClass} ${sizeClass} transition-all duration-150 origin-top`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
    >
      {renderTemplate()}
    </div>
  );
};

