import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { projectCategories, projects } from '../../data/portfolio.data';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'mk-projects',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, RevealDirective, SectionHeadingComponent],
  template: `
    <section id="projects" class="section section--projects">
      <div class="shell" mkReveal>
        <mk-section-heading index="04" eyebrowKey="projects.eyebrow" titleKey="projects.title" descriptionKey="projects.lead" />
        @if (hasProjects) {
        <div class="project-filters" role="group" [attr.aria-label]="'projects.filterLabel' | transloco">
          @for (category of categories; track category) {
            <button type="button" (click)="activeCategory.set(category)" [class.active]="activeCategory() === category" [attr.aria-pressed]="activeCategory() === category">
              {{ 'projects.categories.' + category | transloco }}
            </button>
          }
        </div>
        }
        @if (filteredProjects().length) {
          <div class="projects-grid">
            @for (project of filteredProjects(); track project.slug; let index = $index) {
              <article class="project-card">
                <div class="project-card__visual">
                  @if (project.imageUrl) { <img [src]="project.imageUrl" [alt]="project.name" width="720" height="460" loading="lazy"> }
                  @else { <span class="project-card__placeholder">0{{ index + 1 }}</span> }
                </div>
                <div class="project-card__body"><p>{{ project.category }}</p><h3>{{ project.name }}</h3><p>{{ project.descriptionKey | transloco }}</p>
                  <div class="tag-list">@for (technology of project.technologies; track technology) { <span>{{ technology }}</span> }</div>
                  <a [routerLink]="['/projects', project.slug]">{{ 'projects.caseStudy' | transloco }} <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            }
          </div>
        } @else {
          <div class="project-empty">
            <div class="project-empty__visual" aria-hidden="true"><div class="case-file case-file--back"></div><div class="case-file"><span>MK / WORK</span><div class="case-file__diagram"><i></i><b></b><i></i></div><strong>Behind the<br>interface.</strong><span>ENGINEERING NOTES <b>↗</b></span></div></div>
            <div><p class="eyebrow">{{ 'projects.emptyEyebrow' | transloco }}</p><h3>{{ 'projects.emptyTitle' | transloco }}</h3><p>{{ 'projects.emptyText' | transloco }}</p><a class="button button--secondary" routerLink="/" fragment="contact">{{ 'hero.contact' | transloco }} <span aria-hidden="true">↗</span></a></div>
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly hasProjects = projects.length > 0;
  readonly categories = projectCategories;
  readonly activeCategory = signal<(typeof projectCategories)[number]>('all');
  readonly filteredProjects = computed(() => {
    const category = this.activeCategory();
    return category === 'all' ? projects : projects.filter((project) => project.category.toLowerCase() === category);
  });
}
