import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ResumeData,
  Basics,
  ResumeMetadata,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  CustomSectionItem,
} from '../types/resume';
import { SAMPLE_RESUME_DATA, EMPTY_RESUME_DATA } from '../data/initialData';

const STORAGE_KEY = 'resumecraft_data_v2';

interface ResumeContextType {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateBasics: (fields: Partial<Basics>) => void;
  updateMetadata: (fields: Partial<ResumeMetadata>) => void;
  // Experience
  addExperience: () => void;
  updateExperience: (id: string, fields: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  // Education
  addEducation: () => void;
  updateEducation: (id: string, fields: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  // Skills
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, fields: Partial<SkillCategory>) => void;
  deleteSkillCategory: (id: string) => void;
  // Projects
  addProject: () => void;
  updateProject: (id: string, fields: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, fields: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  // Custom Sections
  addCustomSection: () => void;
  updateCustomSection: (id: string, fields: Partial<CustomSectionItem>) => void;
  deleteCustomSection: (id: string) => void;
  // Bulk Actions
  loadSampleData: () => void;
  clearAllData: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load resume data from localStorage', e);
    }
    return SAMPLE_RESUME_DATA;
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  const updateBasics = (fields: Partial<Basics>) => {
    setData((prev) => ({
      ...prev,
      basics: { ...prev.basics, ...fields },
      metadata: { ...prev.metadata, updatedAt: new Date().toISOString() },
    }));
  };

  const updateMetadata = (fields: Partial<ResumeMetadata>) => {
    setData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...fields, updatedAt: new Date().toISOString() },
    }));
  };

  // Experience methods
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: 'exp-' + Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };
    setData((prev) => ({ ...prev, experience: [newItem, ...prev.experience] }));
  };

  const updateExperience = (id: string, fields: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...fields } : item)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  // Education methods
  const addEducation = () => {
    const newItem: EducationItem = {
      id: 'edu-' + Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      gpa: '',
      honors: '',
    };
    setData((prev) => ({ ...prev, education: [newItem, ...prev.education] }));
  };

  const updateEducation = (id: string, fields: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...fields } : item)),
    }));
  };

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // Skills methods
  const addSkillCategory = () => {
    const newItem: SkillCategory = {
      id: 'skill-' + Date.now(),
      category: 'Technical Skills',
      items: [''],
    };
    setData((prev) => ({ ...prev, skills: [...prev.skills, newItem] }));
  };

  const updateSkillCategory = (id: string, fields: Partial<SkillCategory>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...fields } : item)),
    }));
  };

  const deleteSkillCategory = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  // Projects methods
  const addProject = () => {
    const newItem: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: '',
      role: '',
      link: '',
      startDate: '',
      endDate: '',
      bullets: [''],
    };
    setData((prev) => ({ ...prev, projects: [...prev.projects, newItem] }));
  };

  const updateProject = (id: string, fields: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, ...fields } : item)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  // Certifications methods
  const addCertification = () => {
    const newItem: CertificationItem = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
    };
    setData((prev) => ({ ...prev, certifications: [...prev.certifications, newItem] }));
  };

  const updateCertification = (id: string, fields: Partial<CertificationItem>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) => (item.id === id ? { ...item, ...fields } : item)),
    }));
  };

  const deleteCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
  };

  // Custom Sections
  const addCustomSection = () => {
    const newItem: CustomSectionItem = {
      id: 'custom-' + Date.now(),
      title: 'Additional Section',
      items: [''],
    };
    setData((prev) => ({ ...prev, customSections: [...prev.customSections, newItem] }));
  };

  const updateCustomSection = (id: string, fields: Partial<CustomSectionItem>) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((item) => (item.id === id ? { ...item, ...fields } : item)),
    }));
  };

  const deleteCustomSection = (id: string) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((item) => item.id !== id),
    }));
  };

  // Bulk Actions
  const loadSampleData = () => {
    setData({
      ...SAMPLE_RESUME_DATA,
      metadata: {
        ...SAMPLE_RESUME_DATA.metadata,
        templateId: data.metadata.templateId || 'modern',
        primaryColor: data.metadata.primaryColor || '#0284c7',
      },
    });
  };

  const clearAllData = () => {
    setData(EMPTY_RESUME_DATA);
  };

  const exportJSON = () => {
    const filename = `${(data.basics.fullName || 'Resume').replace(/\s+/g, '_')}_data.json`;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.basics && parsed.metadata) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file', e);
    }
    return false;
  };

  return (
    <ResumeContext.Provider
      value={{
        data,
        setData,
        updateBasics,
        updateMetadata,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        loadSampleData,
        clearAllData,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

