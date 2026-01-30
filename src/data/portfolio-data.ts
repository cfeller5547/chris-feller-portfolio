export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  category: 'web' | 'mobile' | 'ai' | 'saas';
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
  name: 'Chris Anderson',
  title: 'Senior Full-Stack Engineer',
  tagline: 'Building performant, scalable applications that drive business impact',
  bio: "I'm a software engineer with 8+ years of experience shipping products that users love. I specialize in building full-stack applications with modern TypeScript, React, and Node.js, with a focus on clean architecture and exceptional user experiences.",
  email: 'chris@example.dev',
  github: 'https://github.com/chrisanderson',
  linkedin: 'https://linkedin.com/in/chrisanderson',
  location: 'San Francisco, CA',
  stats: {
    yearsExperience: '8+',
    projectsShipped: '50+',
    technologies: '25+',
  },
  optimizesFor: [
    'Performance & scalability',
    'Clean, maintainable architecture',
    'Product thinking & user impact',
    'Team collaboration & mentorship',
  ],
};

export const projects: Project[] = [
  {
    id: 'fintech-dashboard',
    title: 'Fintech Dashboard',
    description: 'Real-time financial analytics platform with advanced charting and portfolio management.',
    longDescription: 'A comprehensive financial dashboard featuring real-time market data visualization, portfolio tracking, risk assessment tools, and automated reporting. Built with performance optimization for handling large datasets.',
    thumbnail: '/projects/fintech-dashboard.jpg',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js'],
    category: 'saas',
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    year: 2024,
    impactMetric: '↓ 40% latency',
  },
  {
    id: 'ai-content-platform',
    title: 'AI Content Platform',
    description: 'AI-powered content generation and management system with multi-model support.',
    longDescription: 'An enterprise content platform leveraging multiple AI models for content generation, editing, and optimization. Features include brand voice customization, SEO optimization, and collaborative workflows.',
    thumbnail: '/projects/ai-content.jpg',
    tags: ['Next.js', 'OpenAI', 'LangChain', 'PostgreSQL', 'Redis'],
    category: 'ai',
    featured: true,
    liveUrl: 'https://example.com',
    year: 2024,
    impactMetric: '3x faster content',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Scalable headless commerce solution with advanced inventory management.',
    longDescription: 'A modern headless e-commerce platform supporting multiple storefronts, real-time inventory sync, and intelligent product recommendations. Designed for high-traffic scenarios with edge caching.',
    thumbnail: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'Shopify', 'GraphQL', 'Stripe', 'Algolia'],
    category: 'web',
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    year: 2024,
    impactMetric: '↑ 35% conversion',
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools Suite',
    description: 'Integrated toolkit for API development, testing, and documentation.',
    longDescription: 'A comprehensive developer toolkit featuring API design tools, automated testing pipelines, interactive documentation generation, and performance monitoring.',
    thumbnail: '/projects/dev-tools.jpg',
    tags: ['TypeScript', 'Electron', 'Monaco Editor', 'Docker'],
    category: 'saas',
    featured: true,
    year: 2023,
    impactMetric: '50% faster dev',
  },
  {
    id: 'mobile-fitness',
    title: 'Fitness Tracking App',
    description: 'Cross-platform fitness app with AI-powered workout recommendations.',
    longDescription: 'A mobile fitness application featuring workout tracking, nutrition planning, and AI-driven personalized recommendations. Includes social features and integration with wearable devices.',
    thumbnail: '/projects/fitness-app.jpg',
    tags: ['React Native', 'TensorFlow', 'Firebase', 'HealthKit'],
    category: 'mobile',
    featured: true,
    liveUrl: 'https://example.com',
    year: 2023,
    impactMetric: '100K+ users',
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Business intelligence platform with customizable reports and real-time insights.',
    longDescription: 'An enterprise analytics solution providing customizable dashboards, automated reporting, and predictive analytics. Features drag-and-drop report builder and data integration hub.',
    thumbnail: '/projects/analytics.jpg',
    tags: ['Vue.js', 'Python', 'Apache Spark', 'Snowflake'],
    category: 'saas',
    featured: true,
    githubUrl: 'https://github.com',
    year: 2023,
    impactMetric: '↑ 60% insights',
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    description: 'Multi-platform social media scheduling and analytics tool.',
    thumbnail: '/projects/social.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Bull'],
    category: 'saas',
    featured: false,
    year: 2023,
  },
  {
    id: 'real-estate-portal',
    title: 'Real Estate Portal',
    description: 'Property listing platform with virtual tours and market analysis.',
    thumbnail: '/projects/real-estate.jpg',
    tags: ['Next.js', 'Three.js', 'PostgreSQL', 'MapBox'],
    category: 'web',
    featured: false,
    liveUrl: 'https://example.com',
    year: 2022,
  },
  {
    id: 'task-management',
    title: 'Task Management System',
    description: 'Collaborative project management with Kanban boards and time tracking.',
    thumbnail: '/projects/task-mgmt.jpg',
    tags: ['React', 'Redux', 'Node.js', 'Socket.io'],
    category: 'saas',
    featured: false,
    githubUrl: 'https://github.com',
    year: 2022,
  },
  {
    id: 'healthcare-app',
    title: 'Healthcare App',
    description: 'Telemedicine platform with appointment scheduling and health records.',
    thumbnail: '/projects/healthcare.jpg',
    tags: ['React Native', 'FHIR', 'AWS', 'WebRTC'],
    category: 'mobile',
    featured: false,
    year: 2022,
  },
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'saas', label: 'SaaS' },
] as const;

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 'Core', description: 'Advanced patterns, performance optimization, custom hooks' },
      { name: 'TypeScript', level: 'Core', description: 'Type-safe applications, advanced generics, utility types' },
      { name: 'Next.js', level: 'Core', description: 'SSR, ISR, App Router, API routes, middleware' },
      { name: 'Tailwind CSS', level: 'Core', description: 'Design systems, custom configurations, responsive design' },
      { name: 'React Native', level: 'Strong', description: 'Cross-platform mobile development' },
      { name: 'Vue.js', level: 'Familiar', description: 'Composition API, Nuxt.js basics' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Core', description: 'REST APIs, microservices, performance tuning' },
      { name: 'Python', level: 'Strong', description: 'FastAPI, Django, data processing' },
      { name: 'Go', level: 'Strong', description: 'High-performance services, CLI tools' },
      { name: 'GraphQL', level: 'Core', description: 'Schema design, resolvers, federation' },
      { name: 'PostgreSQL', level: 'Core', description: 'Query optimization, indexing, migrations' },
      { name: 'Redis', level: 'Strong', description: 'Caching, pub/sub, session management' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 'Core', description: 'EC2, Lambda, S3, RDS, CloudFront, EKS' },
      { name: 'Docker', level: 'Core', description: 'Containerization, multi-stage builds, optimization' },
      { name: 'Kubernetes', level: 'Strong', description: 'Deployments, services, operators, Helm' },
      { name: 'Terraform', level: 'Strong', description: 'Infrastructure as code, modules, state management' },
      { name: 'CI/CD', level: 'Core', description: 'GitHub Actions, GitLab CI, ArgoCD' },
      { name: 'GCP', level: 'Familiar', description: 'Cloud Run, BigQuery, Cloud Functions' },
    ],
  },
  {
    name: 'Data & AI',
    skills: [
      { name: 'LLM Integration', level: 'Strong', description: 'OpenAI, Anthropic, RAG, fine-tuning' },
      { name: 'Vector Databases', level: 'Strong', description: 'Pinecone, pgvector, similarity search' },
      { name: 'Data Pipelines', level: 'Strong', description: 'Kafka, ETL design, stream processing' },
      { name: 'Analytics', level: 'Familiar', description: 'ClickHouse, data visualization, dashboards' },
    ],
  },
];

export const experiences: Experience[] = [
  {
    company: 'TechCorp Inc.',
    title: 'Senior Software Engineer',
    startDate: 'Jan 2022',
    endDate: 'Present',
    highlights: [
      'Led development of real-time trading platform serving 50K+ daily active users, reducing latency by 40%',
      'Architected microservices migration from monolith, improving deployment frequency from weekly to multiple daily releases',
      'Mentored team of 5 engineers, establishing code review practices that reduced production bugs by 60%',
      'Designed and implemented AI content generation platform that increased marketing output 10x',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'Kubernetes'],
  },
  {
    company: 'StartupXYZ',
    title: 'Full-Stack Engineer',
    startDate: 'Mar 2019',
    endDate: 'Dec 2021',
    highlights: [
      'Built headless e-commerce platform from scratch, achieving 35% conversion increase through performance optimization',
      'Developed internal developer platform that reduced deployment time from 4 hours to 15 minutes',
      'Implemented CI/CD pipelines and infrastructure-as-code, decreasing infrastructure incidents by 70%',
      'Led mobile app development with React Native, reaching 500K+ downloads and 4.8 star rating',
    ],
    technologies: ['React', 'React Native', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'Digital Agency Co.',
    title: 'Software Engineer',
    startDate: 'Jun 2016',
    endDate: 'Feb 2019',
    highlights: [
      'Delivered 20+ client projects across healthcare, finance, and e-commerce verticals',
      'Developed reusable component library that reduced project delivery time by 30%',
      'Introduced automated testing practices, achieving 80%+ code coverage across projects',
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
  },
];
