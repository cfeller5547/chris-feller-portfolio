export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  category: 'web' | 'ai' | 'saas';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  year: number;
  impactMetric?: string;
}

export interface Skill {
  name: string;
  level: 'Core' | 'Strong' | 'Familiar';
  description?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies?: string[];
}

export const personalInfo = {
  name: 'Chris Feller',
  title: 'Applied AI Engineer (LLM Apps) • Full-Stack',
  tagline: 'Building products with GenAI at the core—fast to ship, reliable to run, and ready to scale.',
  bio: "I'm a full-stack engineer with 3+ years of experience in building, shipping, and maintaining modern software products end-to-end. I'm actively transitioning into GenAI / LLM application engineering, where I build practical prototypes and features using modern LLM tooling—prioritizing clear architecture, predictable behavior, and polished UX over \"demo-only\" results.",
  email: 'chrisfeller2000@gmail.com',
  github: 'https://github.com/cfeller5547',
  linkedin: 'https://www.linkedin.com/in/chris-feller-',
  location: 'San Diego, CA',
  stats: {
    yearsExperience: '3+',
    projectsShipped: '10+',
    technologies: '20+',
  },
  optimizesFor: [
    'Fast iteration without chaos (simple, repeatable workflows; good defaults)',
    'Clean, maintainable architecture (modular code, clear boundaries)',
    'Performance & scalability (responsive UX, efficient APIs, sensible data flow)',
    'Pragmatic AI decisions (right model/tool for the job, based on constraints)',
  ],
};

export const projects: Project[] = [
  {
    id: 'colonize-media',
    title: 'Colonize Media Platform',
    description: 'Music distribution and rights management platform serving 18,000+ artists with 1.2B+ monthly streams.',
    longDescription: 'As the managing developer, I oversee the entire development and operations lifecycle of the Colonize Media App—a production-ready music distribution platform built on Laravel 11 and AWS. The infrastructure includes load-balanced EC2 clusters for web servers, job processing, and microservices, with SingleStore as the distributed SQL database. I manage deployments via Laravel Forge and Envoyer, implement new features, handle AWS S3 for media storage with CDN delivery, and maintain monitoring through Laravel Pulse and CloudWatch. The platform supports 18,000+ artists, manages 300,000+ tracks, and generates over 1.2 billion monthly streams across Spotify, Apple Music, and YouTube.',
    thumbnail: '/projects/colonize-media.png',
    tags: ['Laravel', 'AWS', 'SingleStore', 'PHP', 'EC2', 'S3', 'CloudWatch'],
    category: 'saas',
    featured: true,
    year: 2024,
    impactMetric: '1.2B+ monthly streams',
  },
  {
    id: 'navident-startup',
    title: 'Navident – Dental Automation',
    description: 'Co-founded startup automating comp exams and treatment planning for dentists using OpenDental.',
    longDescription: 'As a co-founder, I built software that automated dental exams and treatment planning for dentists using OpenDental. We had 30 beta testers across dental offices. The backend uses SQL Server and .NET/C# with Entity Framework; the frontend is React. Key features include a treatment planner that creates interactive/customizable plans and "smart notes" that use the OpenAI Whisper API to turn spoken notes into structured SOAP notes.',
    thumbnail: '/projects/049af00b-2227-46c4-bcf2-150b12d2f804.png',
    tags: ['.NET', 'C#', 'Entity Framework', 'React', 'SQL', 'OpenAI Whisper', 'Next.js'],
    category: 'saas',
    featured: true,
    year: 2024,
    impactMetric: '30 beta testers',
  },
  {
    id: 'allen-organ-audio-editor',
    title: 'Allen Organ Audio Editor',
    description: 'Modern Windows desktop application for designing and editing custom organ voices.',
    longDescription: 'Working alongside another developer, I developed the Windows desktop app to replace an outdated organ-voice editor. Built with Flutter and Dart, it lets organ makers design and edit organ voices using a modern interface. The app communicates directly with the organ hardware via a REST API so pipe organ professionals can hear changes instantly.',
    thumbnail: '/projects/8695bd07-3bc8-48c5-87ed-b80d1e561f9f.png',
    tags: ['Flutter', 'Dart', 'SQLite', 'REST API', 'Windows Desktop'],
    category: 'saas',
    featured: true,
    githubUrl: 'https://github.com/chrisfeller/allen-organ-audio-editor',
    year: 2023,
    impactMetric: 'Used at Notre Dame',
  },
  {
    id: 'tax-control-strategies',
    title: 'Tax Control Strategies',
    description: 'Corporate website development using HubSpot CMS with custom modules.',
    longDescription: 'I built a corporate website for Tax Control Strategies using HubSpot CMS. Starting from the designer\'s mockups, I created custom modules with CSS, JavaScript, HTML and HubL and ensured the site is fully responsive.',
    thumbnail: '/projects/ce7632b5-a5f1-488a-8108-c9ac29ec50d9.png',
    tags: ['HubSpot CMS', 'CSS', 'JavaScript', 'HTML', 'HUBL', 'Responsive Design'],
    category: 'web',
    featured: false,
    liveUrl: 'https://taxcontrolstrategies.com/',
    year: 2024,
    impactMetric: 'Live production site',
  },
  {
    id: 'landlord-comply',
    title: 'LandlordComply',
    description: 'SaaS compliance tool helping landlords navigate security deposit return laws with jurisdiction-aware rules.',
    longDescription: 'A jurisdiction-aware compliance engine for security deposit dispositions. The app takes a property address and move-out facts, then generates exact deadlines, interest calculations, court-ready notices, and defensible proof packets. Features include automatic jurisdiction detection for state and city rules, AI-powered deduction risk assessment using Google Gemini, PDF generation for notices and itemized statements, proof packet export with audit trails, and email reminders before deadlines. Built with Next.js 16, Supabase (PostgreSQL + Auth + Storage), Prisma ORM, and React PDF.',
    thumbnail: '/projects/landlord-comply.png',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Prisma', 'Google Gemini', 'React PDF'],
    category: 'saas',
    featured: false,
    liveUrl: 'https://landlordcomply.com',
    year: 2025,
    impactMetric: 'Avoid $5K+ mistakes',
  },
  {
    id: 'seo-keyword-planner',
    title: 'SEO Keyword Planner',
    description: 'Comprehensive SEO tool for analyzing website structure and optimizing keyword strategy.',
    longDescription: 'A tool that helps website owners understand their site structure and find better keywords. You enter a website address and it draws a tree of all the pages. It shows the keywords each page targets and suggests new ones. It uses Flask on the backend with a MongoDB database on Azure and a C# Azure Function for fast sitemap parsing.',
    thumbnail: '/projects/d9e3ef00-7c62-472c-ae90-65af83e48e91.png',
    tags: ['Flask', 'MongoDB', 'Azure Functions', 'C#', 'Google Search Console API', 'Google PaLM/Gemini'],
    category: 'ai',
    featured: false,
    year: 2023,
  },
  {
    id: 'us-endowment-tools',
    title: 'U.S. Endowment Sustainability Tools',
    description: 'Web applications for carbon footprint calculation and sustainable forestry management.',
    longDescription: 'While working for Seamgen I built the web app "Carbon Tools" for the U.S. Endowment, a non-profit focused on sustainable forestry. One tool calculates the carbon footprint of wood products, and the other compares wood to other materials so users can see the environmental impact.',
    thumbnail: '/projects/de2850cf-60c5-4234-b644-78d5d4536eda.png',
    tags: ['React', 'TypeScript', 'MUI', 'Supabase'],
    category: 'web',
    featured: false,
    year: 2023,
  },
  {
    id: 'measurepm-web-app',
    title: 'MeasurePM Dashboard',
    description: 'Comprehensive reporting dashboard with integrated APIs and data visualization.',
    longDescription: 'I worked with a team to build a reporting dashboard for MeasurePM. The dashboard uses React and Recharts to display data and connects to existing APIs.',
    thumbnail: '/projects/c4aa96ed-1dc7-4774-ac7a-7767111c414e.png',
    tags: ['React', 'Recharts', 'JavaScript', 'API Integration', 'Agile/Scrum'],
    category: 'saas',
    featured: false,
    year: 2024,
  },
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web' },
  { id: 'saas', label: 'SaaS' },
  { id: 'ai', label: 'AI/ML' },
] as const;

export const skillCategories: SkillCategory[] = [
  {
    name: 'AI Tools',
    skills: [
      { name: 'Google AI Studio', level: 'Core' },
      { name: 'Claude Code', level: 'Core' },
      { name: 'ChatGPT', level: 'Core' },
      { name: 'OpenAI API', level: 'Core' },
      { name: 'Gemini API', level: 'Core' },
      { name: 'Codex', level: 'Core' },
      { name: 'Lovable', level: 'Core' },
      { name: 'Replit', level: 'Strong' },
      { name: 'MCP', level: 'Strong' },
      { name: 'Gemini CLI', level: 'Core' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 'Core' },
      { name: 'TypeScript', level: 'Core' },
      { name: 'React Native', level: 'Strong' },
      { name: 'MUI', level: 'Strong' },
      { name: 'HTML', level: 'Core' },
      { name: 'CSS', level: 'Core' },
      { name: 'Flutter', level: 'Core' },
      { name: 'JavaScript', level: 'Core' },
      { name: 'SEO', level: 'Core' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Core' },
      { name: 'Python', level: 'Core' },
      { name: 'GraphQL', level: 'Familiar' },
      { name: 'REST APIs', level: 'Core' },
      { name: 'PHP', level: 'Strong' },
      { name: 'Laravel', level: 'Strong' },
      { name: 'ASP.NET', level: 'Strong' },
      { name: 'Java', level: 'Familiar' },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name: 'MySQL', level: 'Core' },
      { name: 'MongoDB', level: 'Strong' },
      { name: 'Firebase', level: 'Strong' },
      { name: 'Supabase', level: 'Core' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'Azure', level: 'Strong' },
      { name: 'Vercel', level: 'Strong' },
      { name: 'Docker', level: 'Strong' },
      { name: 'CI/CD', level: 'Strong' },
    ],
  },
];

export const experiences: Experience[] = [
  {
    company: 'Seamgen',
    title: 'Software Engineer',
    startDate: '2024',
    endDate: 'Present',
    highlights: [
      'Build custom software solutions for clients across various industries including healthcare and sustainability',
      'Develop full-stack applications using React, TypeScript, .NET, and Laravel',
      'Design and implement robust backend services with SQL databases and REST APIs',
      'Create intuitive user interfaces focused on exceptional user experience',
    ],
    technologies: ['React', 'TypeScript', '.NET', 'Laravel', 'SQL', 'REST APIs'],
  },
  {
    company: 'San Diego State University (SDSU)',
    title: 'B.S. Computer Science Graduate',
    startDate: '2020',
    endDate: '2024',
    highlights: [
      'Completed Bachelor of Science in Computer Science',
    ],
    technologies: [],
  },
  {
    company: 'Seamgen',
    title: 'Software Engineering Intern',
    startDate: '2023',
    endDate: '2024',
    highlights: [
      'Contributed to production client projects while completing degree',
      'Worked on website development and SEO optimization',
      'Gained hands-on experience with modern development practices',
      'Collaborated with senior engineers on client deliverables',
    ],
    technologies: ['React', 'TypeScript', 'SEO', 'Web Development'],
  },
];
