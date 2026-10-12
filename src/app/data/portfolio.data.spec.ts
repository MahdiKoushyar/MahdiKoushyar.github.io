import { describe, expect, it } from 'vitest';
import en from '../../assets/i18n/en.json';
import fa from '../../assets/i18n/fa.json';
import { experiences, profile, projectCategories, projects, skillGroups } from './portfolio.data';

describe('portfolio content integrity', () => {
  it('publishes the supplied profiles and business-card email', () => {
    expect(profile.socialLinks.filter((link) => link.url)).toEqual([
      { id: 'github', url: 'https://github.com/MahdiKoushyar', label: 'GitHub' },
      { id: 'linkedin', url: 'https://www.linkedin.com/in/mahdi-koushyar-b55984116/', label: 'LinkedIn' },
      { id: 'email', url: `mailto:${profile.email}`, label: 'Email' },
    ]);
  });

  it('publishes verified employers and projects without invented end dates or links', () => {
    expect(experiences.map((item) => item.company)).toEqual(['ShayganTadbirParsian', 'TKC', 'Kingrose+', 'alotennis', 'Andishe Computer', 'Pezhvak Andishe Farzin', 'RayaWeb']);
    expect(experiences.filter((item) => item.current).map((item) => item.id)).toEqual(['tkc']);
    expect(projects).toHaveLength(4);
    expect(projects.filter((item) => item.liveUrl).map((item) => item.liveUrl)).toEqual(['https://sharjbook.com/']);
    expect(projects.every((item) => item.githubUrl === '')).toBe(true);
    expect(fa.career.andishe.date).toContain('۱۳۹۵');
    expect(en.career.andishe.date).toContain('2016');
    expect(en.career.kingrose.description).toContain('Remote');
  });

  it('resolves all career, project and skill content in both languages', () => {
    const keys = [
      ...['overview', 'companies', 'focus', 'profile', 'listLabel', 'current', 'remote', 'contributions', 'technologies'].map((key) => `experience.${key}`),
      ...experiences.flatMap((item) => [item.role, item.date, item.descriptionKey, ...item.achievements]),
      ...projects.flatMap((item) => [item.name, item.role, item.descriptionKey, item.architecture, item.challengeKey, item.resultKey]),
      ...skillGroups.flatMap((item) => [item.titleKey, `skills.descriptions.${item.index}`]),
    ];
    for (const translations of [en, fa]) {
      for (const key of keys) {
        const value = key.split('.').reduce<unknown>((node, segment) => (node as Record<string, unknown>)?.[segment], translations);
        expect(typeof value, key).toBe('string');
        expect(value, key).not.toBe('');
      }
    }
  });

  it('exposes both final PDF downloads and the supplied phone', () => {
    expect(profile.resumeUrl).toBe('/resumes/Mahdi-Koushyar-Resume-EN.pdf');
    expect(profile.resumeFaUrl).toBe('/resumes/Mahdi-Koushyar-Resume-FA.pdf');
    expect(profile.phoneUrl).toBe('tel:+989124993798');
    expect(en.hero.availability).toContain('Open to Work');
    expect(fa.hero.availability).toContain('Open to Work');
  });

  it('positions the listed work as part of the user-confirmed 100-plus projects', () => {
    expect(en.hero.statement).toContain('more than 100 projects');
    expect(fa.hero.statement).toContain('بیش از ۱۰۰ پروژه');
    expect(en.projects.lead).toContain('not a complete project list');
    expect(fa.projects.lead).toContain('نه فهرست کامل');
    expect(projects).toHaveLength(4);
  });

  it('keeps unique skills and project filters', () => {
    expect(new Set(projectCategories).size).toBe(projectCategories.length);
    for (const group of skillGroups) {
      expect(new Set(group.skills).size).toBe(group.skills.length);
    }
  });

  it('includes the requested web and AI capabilities', () => {
    const skills = skillGroups.flatMap((group) => group.skills);
    expect(skills).toContain('React.js');
    expect(skills).toContain('WordPress');
    expect(skillGroups.flatMap((group) => group.translatedSkills ?? [])).toContain('skills.aiApplication');
  });
});
