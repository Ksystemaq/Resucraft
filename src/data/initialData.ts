import { ResumeData } from '../types/resume';

export const SAMPLE_RESUME_DATA: ResumeData = {
  metadata: {
    templateId: 'modern',
    primaryColor: '#0284c7', // Sky-600
    fontFamily: 'Inter',
    fontSize: 'normal',
    showPhoto: false,
    updatedAt: new Date().toISOString(),
  },
  basics: {
    fullName: 'Alex Morgan',
    headline: 'Senior Full-Stack Engineer',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    summary: 'Results-driven Software Engineer with 5+ years of experience designing scalable web architectures and leading cross-functional teams. Specialized in TypeScript, React, Node.js, and cloud native microservices. Proven track record of improving system uptime to 99.99% and accelerating page performance by 45%.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Apex Cloud Solutions',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      isCurrent: true,
      bullets: [
        'Architected and deployed a multi-tenant analytics dashboard serving 120,000+ daily active enterprise users.',
        'Spearheaded migration of legacy monolith to containerized microservices on AWS (ECS & Lambda), cutting cloud costs by 32%.',
        'Mentored 6 junior and mid-level engineers through bi-weekly code reviews, design pairing, and structured onboarding.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Vanguard Media Group',
      position: 'Full-Stack Developer',
      location: 'Austin, TX (Remote)',
      startDate: '2019-06',
      endDate: '2022-02',
      isCurrent: false,
      bullets: [
        'Engineered real-time content management interfaces using React, Redux Toolkit, and GraphQL.',
        'Optimized core web vitals and image delivery pipelines, reducing initial Largest Contentful Paint (LCP) from 3.8s to 1.4s.',
        'Collaborated closely with product managers and UX designers to build a design system used across 4 internal platforms.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2015-08',
      endDate: '2019-05',
      isCurrent: false,
      gpa: '3.82 / 4.00',
      honors: 'Dean\'s Honor List, Magna Cum Laude',
    },
  ],
  skills: [
    {
      id: 'skill-1',
      category: 'Languages & Core',
      items: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Go', 'SQL', 'HTML5 / CSS3'],
    },
    {
      id: 'skill-2',
      category: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Redux', 'GraphQL'],
    },
    {
      id: 'skill-3',
      category: 'Cloud & DevOps',
      items: ['AWS (ECS, S3, CloudFront)', 'Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'PostgreSQL', 'Redis'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse — Developer Metrics Platform',
      role: 'Creator & Lead Maintainer',
      link: 'https://github.com/alexmorgan/devpulse',
      startDate: '2023-01',
      endDate: '2023-08',
      bullets: [
        'Built an open-source productivity insights CLI and web dashboard with over 2,400 GitHub stars.',
        'Integrated GitHub REST & GraphQL APIs to automatically extract PR cycle times and code review metrics.',
      ],
    },
    {
      id: 'proj-2',
      title: 'Echo — Offline-First Note Sync Engine',
      role: 'Solo Developer',
      link: 'https://echo-sync.dev',
      startDate: '2022-05',
      endDate: '2022-11',
      bullets: [
        'Implemented Conflict-free Replicated Data Types (CRDTs) to support real-time peer-to-peer document synchronization.',
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2023-04',
      expiryDate: '2026-04',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
  ],
  customSections: [
    {
      id: 'custom-1',
      title: 'Languages',
      items: ['English (Native)', 'Spanish (Professional Working)', 'French (Conversational)'],
    },
  ],
};

export const EMPTY_RESUME_DATA: ResumeData = {
  metadata: {
    templateId: 'classic',
    primaryColor: '#1e293b',
    fontFamily: 'Inter',
    fontSize: 'normal',
    showPhoto: false,
    updatedAt: new Date().toISOString(),
  },
  basics: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  customSections: [],
};

