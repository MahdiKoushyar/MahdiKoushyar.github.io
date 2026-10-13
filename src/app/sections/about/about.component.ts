import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { metrics } from '../../data/portfolio.data';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'mk-about',
  standalone: true,
  imports: [TranslocoPipe, RevealDirective, SectionHeadingComponent],
  template: `
    <section id="about" class="section section--about">
      <div class="shell" mkReveal>
        <mk-section-heading index="01" eyebrowKey="about.eyebrow" titleKey="about.title" descriptionKey="about.lead" />
        <div class="about-grid">
          <div class="about-copy">
            <p>{{ 'about.paragraphOne' | transloco }}</p>
            <p>{{ 'about.paragraphTwo' | transloco }}</p>
            <blockquote><span aria-hidden="true">“</span>{{ 'about.quote' | transloco }}</blockquote>
          </div>
          @if (metrics.length) {
            <div class="metrics-grid">
              @for (metric of metrics; track metric.labelKey) {
              <article class="metric-card">
                <strong>{{ metric.value }}</strong>
                <span>{{ metric.labelKey | transloco }}</span>
              </article>
              }
            </div>
          } @else {
            <div class="principles">
              @for (principle of principles; track principle; let index = $index) {
                <article class="principle"><span>0{{ index + 1 }}</span><div><h3>{{ 'about.principles.' + principle + '.title' | transloco }}</h3><p>{{ 'about.principles.' + principle + '.text' | transloco }}</p></div><span aria-hidden="true">↗</span></article>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly metrics = metrics.filter((metric) => metric.value !== '—' && metric.value !== '');
  readonly principles = ['clarity', 'craft', 'scale'] as const;
}
