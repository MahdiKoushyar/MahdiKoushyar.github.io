import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { experiences } from '../../data/portfolio.data';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'mk-experience',
  standalone: true,
  imports: [TranslocoPipe, RevealDirective, SectionHeadingComponent],
  template: `
    <section id="experience" class="section section--experience">
      <div class="shell" mkReveal>
        <mk-section-heading index="02" eyebrowKey="experience.eyebrow" titleKey="experience.title" descriptionKey="experience.lead" />
        @if (experiences.length) {
          <div class="timeline">
            @for (item of experiences; track item.id; let first = $first) {
              <article class="timeline-item" [class.current]="first">
                <div class="timeline-item__date">{{ item.date }}</div>
                <div class="timeline-item__content">
                  <p>{{ item.company }}</p><h3>{{ item.role }}</h3>
                  <p>{{ item.descriptionKey | transloco }}</p>
                  <ul>@for (achievement of item.achievements; track achievement) { <li>{{ achievement }}</li> }</ul>
                  <div class="tag-list">@for (technology of item.technologies; track technology) { <span>{{ technology }}</span> }</div>
                </div>
              </article>
            }
          </div>
        } @else {
          <div class="content-placeholder">
            <span class="content-placeholder__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 6V4h8v2M3 10l9 5 9-5M3 6h18v14H3zM10 13h4"/></svg></span>
            <div><h3>{{ 'experience.emptyTitle' | transloco }}</h3><p>{{ 'experience.emptyText' | transloco }}</p><a class="text-link" href="https://www.linkedin.com/in/mahdi-koushyar-b55984116/" target="_blank" rel="noopener noreferrer">{{ 'experience.linkedin' | transloco }} <span aria-hidden="true">↗</span></a></div>
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly experiences = experiences;
}
