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
        <header><p class="eyebrow">{{ 'projects.categories.' + item.category | transloco }} · {{ item.role | transloco }}</p><h1>{{ item.name | transloco }}</h1><p>{{ item.descriptionKey | transloco }}</p>
          <div class="tag-list">@for (technology of item.technologies; track technology) { <span dir="ltr">{{ technology }}</span> }</div>
          @if (item.liveUrl) { <a class="button button--secondary" [href]="item.liveUrl" target="_blank" rel="noopener noreferrer">{{ 'projects.publicSample' | transloco }} <span aria-hidden="true">↗</span></a> }
        </header>
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
    { index: '01', key: 'role' }, { index: '02', key: 'architecture' },
    { index: '03', key: 'challenge' }, { index: '04', key: 'results' },
  ] as const;

  projectText(project: (typeof projects)[number], key: string): string {
    if (key === 'challenge') return project.challengeKey;
    if (key === 'results') return project.resultKey;
    if (key === 'role') return project.role;
    return project.architecture;
  }
}
