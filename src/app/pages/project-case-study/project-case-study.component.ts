import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { projects } from '../../data/portfolio.data';

@Component({
  selector: 'mk-project-case-study',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  template: `
    <main id="main-content" class="case-study shell" tabindex="-1">
      <a class="case-study__back" routerLink="/" fragment="projects">← {{ 'caseStudy.back' | transloco }}</a>
      @if (project(); as item) {
        <header><p class="eyebrow">{{ item.category }} · {{ item.role }}</p><h1>{{ item.name }}</h1><p>{{ item.descriptionKey | transloco }}</p></header>
        <div class="case-study__grid">
          @for (section of sections; track section.key) {
            <section><span>{{ section.index }}</span><h2>{{ 'caseStudy.' + section.key | transloco }}</h2><p>{{ projectText(item, section.key) | transloco }}</p></section>
          }
        </div>
      } @else {
        <div class="case-study__empty"><p class="eyebrow">{{ 'caseStudy.emptyEyebrow' | transloco }}</p><h1>{{ 'caseStudy.emptyTitle' | transloco }}</h1><p>{{ 'caseStudy.emptyText' | transloco }}</p><a class="button button--primary" routerLink="/" fragment="projects">{{ 'caseStudy.back' | transloco }}</a></div>
      }
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCaseStudyComponent {
  private readonly route = inject(ActivatedRoute);
  readonly project = computed(() => projects.find((project) => project.slug === this.route.snapshot.paramMap.get('slug')));
  readonly sections = [
    { index: '01', key: 'problem' }, { index: '02', key: 'challenge' }, { index: '03', key: 'role' },
    { index: '04', key: 'architecture' }, { index: '05', key: 'solution' }, { index: '06', key: 'decisions' },
    { index: '07', key: 'performance' }, { index: '08', key: 'results' }, { index: '09', key: 'lessons' },
  ] as const;

  projectText(project: (typeof projects)[number], key: string): string {
    if (key === 'challenge') return project.challengeKey;
    if (key === 'results') return project.resultKey;
    return `caseStudy.placeholder.${key}`;
  }
}
