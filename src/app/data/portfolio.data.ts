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
  readonly current?: boolean;
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
  email: 'mahdi.koushyar@gmail.com',
  phone: '+98 912 499 3798',
  phoneUrl: 'tel:+989124993798',
  location: 'Tehran, Iran',
  resumeUrl: '/resumes/Mahdi-Koushyar-Resume-EN.pdf',
  resumeFaUrl: '/resumes/Mahdi-Koushyar-Resume-FA.pdf',
  resumeVersion: '2026-10-13-farsi',
  canonicalUrl: 'https://mahdikoushyar.github.io/',
  socialLinks: [
    { id: 'github', url: 'https://github.com/MahdiKoushyar', label: 'GitHub' },
    { id: 'linkedin', url: 'https://www.linkedin.com/in/mahdi-koushyar-b55984116/', label: 'LinkedIn' },
    { id: 'email', url: 'mailto:mahdi.koushyar@gmail.com', label: 'Email' },
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
  { titleKey: 'skills.state', index: '06', skills: ['NgRx Store', 'Effects', 'Entity', 'Router Store', 'ComponentStore', 'Redux', 'Redux Toolkit'] },
  { titleKey: 'skills.pwa', index: '07', skills: ['Angular Service Worker', 'Web App Manifest', 'Install Prompt', 'App-shell Caching', 'Runtime Caching'] },
  { titleKey: 'skills.realtime', index: '08', skills: ['WebSocket', 'Microsoft SignalR'] },
  { titleKey: 'skills.motion', index: '09', skills: ['Angular Animations', 'CSS Animations / Transitions', 'Scroll-driven Animations', 'IntersectionObserver', 'prefers-reduced-motion'] },
];

// Verified against the supplied resume and direct user corrections. Date keys
// preserve source precision; only TKC's ongoing status is explicitly confirmed.
export const experiences: readonly Experience[] = [
  { id: 'shaygan', company: 'ShayganTadbirParsian', role: 'career.senior', date: 'career.shaygan.date', descriptionKey: 'career.shaygan.description', achievements: ['career.shaygan.one', 'career.shaygan.two'], technologies: ['Angular', 'TypeScript', 'Nx', 'AnalogJS', 'RxJS'] },
  { id: 'tkc', company: 'TKC', role: 'career.senior', date: 'career.tkc.date', descriptionKey: 'career.tkc.description', achievements: ['career.tkc.one'], technologies: ['Angular', 'React', 'Web Performance', 'SEO'], current: true },
  { id: 'kingrose', company: 'Kingrose+', role: 'career.senior', date: 'career.kingrose.date', descriptionKey: 'career.kingrose.description', achievements: ['career.kingrose.one'], technologies: ['React', 'Redux', 'Formik', 'React Table', 'Atomic Design'] },
  { id: 'alotennis', company: 'alotennis', role: 'career.frontend', date: 'career.alotennis.date', descriptionKey: 'career.alotennis.description', achievements: [], technologies: [] },
  { id: 'andishe', company: 'Andishe Computer', role: 'career.frontend', date: 'career.andishe.date', descriptionKey: 'career.andishe.description', achievements: ['career.andishe.one'], technologies: ['Angular', 'NgRx', 'PrimeNG', 'Angular Material', 'WebSocket'] },
  { id: 'pezhvak', company: 'Pezhvak Andishe Farzin', role: 'career.frontend', date: 'career.pezhvak.date', descriptionKey: 'career.pezhvak.description', achievements: [], technologies: [] },
  { id: 'raya', company: 'RayaWeb', role: 'career.frontend', date: 'career.raya.date', descriptionKey: 'career.raya.description', achievements: [], technologies: ['HTML', 'HTML5', 'JavaScript'] },
];
export const projects: readonly Project[] = [
  { slug: 'sharjbook', name: 'work.sharjbook.name', category: 'saas', descriptionKey: 'work.sharjbook.description', role: 'career.senior', technologies: ['Angular', 'TypeScript', 'AnalogJS', 'Nx', 'Vite', 'SCSS', 'RxJS', 'REST API', 'Prerendering', 'SEO'], architecture: 'work.sharjbook.architecture', challengeKey: 'work.sharjbook.challenge', resultKey: 'work.sharjbook.result', imageUrl: '', liveUrl: 'https://sharjbook.com/', githubUrl: '' },
  { slug: 'kingrose-erp', name: 'work.kingrose.name', category: 'enterprise', descriptionKey: 'work.kingrose.description', role: 'career.senior', technologies: ['React', 'Redux', 'Bootstrap', 'Formik', 'React Table', 'Atomic Design'], architecture: 'work.kingrose.architecture', challengeKey: 'work.kingrose.challenge', resultKey: 'work.kingrose.result', imageUrl: '', liveUrl: '', githubUrl: '' },
  { slug: 'electricity-billing', name: 'work.billing.name', category: 'enterprise', descriptionKey: 'work.billing.description', role: 'career.seniorUi', technologies: ['Angular', 'TypeScript', 'PrimeNG', 'NgRx', 'Angular Universal', 'WebSocket', 'REST API'], architecture: 'work.billing.architecture', challengeKey: 'work.billing.challenge', resultKey: 'work.billing.result', imageUrl: '', liveUrl: '', githubUrl: '' },
  { slug: 'green-electricity', name: 'work.green.name', category: 'angular', descriptionKey: 'work.green.description', role: 'career.seniorUi', technologies: ['Angular', 'TypeScript', 'Angular Material', 'NgRx', 'RxJS', 'Angular Universal', 'REST API'], architecture: 'work.green.architecture', challengeKey: 'work.green.challenge', resultKey: 'work.green.result', imageUrl: '', liveUrl: '', githubUrl: '' },
];

export const architectureHighlights = [
  { id: 'systems', titleKey: 'highlights.systems.title', descriptionKey: 'highlights.systems.description' },
  { id: 'platforms', titleKey: 'highlights.platforms.title', descriptionKey: 'highlights.platforms.description' },
  { id: 'performance', titleKey: 'highlights.performance.title', descriptionKey: 'highlights.performance.description' },
  { id: 'delivery', titleKey: 'highlights.delivery.title', descriptionKey: 'highlights.delivery.description' },
] as const;

export const projectCategories = ['all', 'enterprise', 'architecture', 'angular', 'saas', 'open-source', 'personal'] as const;
