export type TemplateId =
  | 'classic'
  | 'modern'
  | 'minimalist'
  | 'creative'
  | 'student'
  | 'executive'
  | 'accent-tab'
  | 'dual-tone'
  | 'elegant'
  | 'timeline';
export type FontSize = 'compact' | 'normal' | 'relaxed';
export type FontFamily = 'Inter' | 'Roboto' | 'Merriweather' | 'Lora';

export interface ResumeMetadata {
  templateId: TemplateId;
  primaryColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
  showPhoto: boolean;
  updatedAt: string;
}

export interface Basics {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
  summary: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa?: string;
  honors?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  items: string[];
}

export interface ResumeData {
  metadata: ResumeMetadata;
  basics: Basics;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  customSections: CustomSectionItem[];
}

