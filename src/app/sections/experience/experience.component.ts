import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { experiences, profile } from '../../data/portfolio.data';
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
          <div class="career-layout">
            <aside class="career-overview" [attr.aria-label]="'experience.overview' | transloco">
              <span class="career-overview__symbol" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 21V5h10v16M14 10h6v11M2 21h20M8 8h2M8 12h2M8 16h2M17 14h1M17 17h1"/></svg></span>
              <p class="eyebrow">{{ 'experience.overview' | transloco }}</p>
              <p class="career-overview__count"><strong>{{ experiences.length }}</strong><span>{{ 'experience.companies' | transloco }}</span></p>
              <p class="career-overview__focus">{{ 'experience.focus' | transloco }}</p>
              <div class="career-overview__stack" dir="ltr"><span>Angular</span><span>React</span></div>
              <a class="career-overview__link" [href]="linkedinUrl" target="_blank" rel="noopener noreferrer">{{ 'experience.profile' | transloco }} <span aria-hidden="true">↗</span></a>
            </aside>
            <ol class="career-list" [attr.aria-label]="'experience.listLabel' | transloco">
              @for (item of experiences; track item.id; let index = $index) {
                <li class="career-entry">
                  <span class="career-entry__node" aria-hidden="true">{{ index + 1 }}</span>
                  <article class="career-card" [class.career-card--current]="item.current" [attr.aria-labelledby]="'company-' + item.id">
                    <header class="career-card__header">
                      <span class="company-mark" dir="ltr" aria-hidden="true">{{ companyMarks[item.id] }}</span>
                      <div class="career-card__identity">
                        <h3 [id]="'company-' + item.id" dir="ltr">{{ item.company }}</h3>
                        <p class="career-card__role">{{ item.role | transloco }}</p>
                      </div>
                      @if (item.current) { <span class="career-badge career-badge--current"><i aria-hidden="true"></i>{{ 'experience.current' | transloco }}</span> }
                      @if (item.id === 'kingrose') { <span class="career-badge">{{ 'experience.remote' | transloco }}</span> }
                    </header>
                    <div class="career-card__meta">
                      <span class="career-card__date"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3v4M17 3v4M3 10h18M3 5h18v16H3zM7 14h3M14 14h3"/></svg>{{ item.date | transloco }}</span>
                      <span>{{ item.descriptionKey | transloco }}</span>
                    </div>
                    @if (item.achievements.length) {
                      <div class="career-card__contributions">
                        <p class="career-card__label">{{ 'experience.contributions' | transloco }}</p>
                        <ul>@for (achievement of item.achievements; track achievement) { <li>{{ achievement | transloco }}</li> }</ul>
                      </div>
                    }
                    @if (item.technologies.length) {
                      <footer class="career-card__footer">
                        <span class="career-card__label">{{ 'experience.technologies' | transloco }}</span>
                        <ul class="career-card__technologies" dir="ltr">@for (technology of item.technologies; track technology) { <li>{{ technology }}</li> }</ul>
                      </footer>
                    }
                  </article>
                </li>
              }
            </ol>
          </div>
          <p class="career-date-note">{{ 'career.dateNote' | transloco }}</p>
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
  readonly linkedinUrl = profile.socialLinks.find((link) => link.id === 'linkedin')!.url;
  // Typographic markers, not employer logos or unverified brand assets.
  readonly companyMarks: Readonly<Record<string, string>> = {
    shaygan: 'STP', tkc: 'TKC', kingrose: 'K+', alotennis: 'at',
    andishe: 'AC', pezhvak: 'PAF', raya: 'RW',
  };
}
