import { describe, expect, it } from 'vitest';
import { experiences, profile, projectCategories, projects, skillGroups } from './portfolio.data';

describe('portfolio content integrity', () => {
  it('publishes the supplied social profiles and omits the unconfigured email link', () => {
    expect(profile.socialLinks.filter((link) => link.url)).toEqual([
      { id: 'github', url: 'https://github.com/MahdiKoushyar', label: 'GitHub' },
      { id: 'linkedin', url: 'https://www.linkedin.com/in/mahdi-koushyar-b55984116/', label: 'LinkedIn' },
    ]);
  });

  it('keeps unverified career claims empty', () => {
    expect(experiences).toHaveLength(0);
    expect(projects).toHaveLength(0);
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
