export interface SocialLink {
  readonly id: 'github' | 'linkedin' | 'email';
  readonly url: string;
  readonly label: string;
}

export interface Metric {
  readonly value: string;
  readonly labelKey: string;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly date: string;
  readonly descriptionKey: string;
  readonly achievements: readonly string[];
  readonly technologies: readonly string[];
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly descriptionKey: string;
  readonly role: string;
  readonly technologies: readonly string[];
  readonly architecture: string;
  readonly challengeKey: string;
  readonly resultKey: string;
  readonly imageUrl: string;
  readonly liveUrl: string;
  readonly githubUrl: string;
}

export interface SkillGroup {
  readonly titleKey: string;
  readonly index: string;
  readonly skills: readonly string[];
  readonly translatedSkills?: readonly string[];
}

export const profile = {
  name: 'Mahdi Koushyar',
  email: '',
  location: '',
  resumeUrl: '',
  canonicalUrl: 'https://mahdikoushyar.github.io/',
  socialLinks: [
    { id: 'github', url: 'https://github.com/MahdiKoushyar', label: 'GitHub' },
    { id: 'linkedin', url: 'https://www.linkedin.com/in/mahdi-koushyar-b55984116/', label: 'LinkedIn' },
    { id: 'email', url: '', label: 'Email' },
  ] satisfies readonly SocialLink[],
} as const;

// Replace these editable values with verified career figures before publishing.
export const metrics: readonly Metric[] = [
  { value: '—', labelKey: 'about.metrics.years' },
  { value: '—', labelKey: 'about.metrics.projects' },
  { value: '—', labelKey: 'about.metrics.systems' },
  { value: '—', labelKey: 'about.metrics.technologies' },
];

export const skillGroups: readonly SkillGroup[] = [
  { titleKey: 'skills.frontend', index: '01', skills: ['Angular', 'React.js', 'TypeScript', 'JavaScript', 'RxJS', 'Signals', 'HTML', 'CSS', 'SCSS', 'Tailwind', 'WordPress'] },
  { titleKey: 'skills.architecture', index: '02', skills: ['Nx', 'Micro Frontends', 'Module Federation', 'DDD', 'Clean Architecture', 'Design Systems'] },
  { titleKey: 'skills.backend', index: '03', skills: ['REST', 'GraphQL', 'NestJS'] },
  { titleKey: 'skills.performance', index: '04', skills: ['Web Performance', 'Lazy Loading', 'Bundle Optimization', 'Caching', 'SSR'] },
  { titleKey: 'skills.tools', index: '05', skills: ['Git', 'Docker', 'CI/CD', 'Azure DevOps', 'Jest', 'Vitest'], translatedSkills: ['skills.aiApplication'] },
];

// Empty by design: add only verified roles and projects. The UI has polished empty states.
export const experiences: readonly Experience[] = [];
export const projects: readonly Project[] = [];

export const architectureHighlights = [
  { id: 'systems', titleKey: 'highlights.systems.title', descriptionKey: 'highlights.systems.description' },
  { id: 'platforms', titleKey: 'highlights.platforms.title', descriptionKey: 'highlights.platforms.description' },
  { id: 'performance', titleKey: 'highlights.performance.title', descriptionKey: 'highlights.performance.description' },
  { id: 'delivery', titleKey: 'highlights.delivery.title', descriptionKey: 'highlights.delivery.description' },
] as const;

export const projectCategories = ['all', 'enterprise', 'architecture', 'angular', 'saas', 'open-source', 'personal'] as const;
