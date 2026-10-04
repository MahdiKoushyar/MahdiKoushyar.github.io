import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { architectureHighlights } from '../../data/portfolio.data';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'mk-highlights',
  standalone: true,
  imports: [TranslocoPipe, RevealDirective, SectionHeadingComponent],
  template: `
    <section id="architecture" class="section section--highlights">
      <div class="shell" mkReveal>
        <mk-section-heading index="05" eyebrowKey="highlights.eyebrow" titleKey="highlights.title" descriptionKey="highlights.lead" />
        <div class="architecture-map">
          <div class="architecture-map__core"><span>MK</span><small>{{ 'highlights.core' | transloco }}</small></div>
          @for (item of highlights; track item.id; let index = $index) {
            <article class="architecture-card architecture-card--{{ index + 1 }}">
              <span>0{{ index + 1 }}</span><h3>{{ item.titleKey | transloco }}</h3><p>{{ item.descriptionKey | transloco }}</p>
            </article>
          }
          <svg viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true"><path d="M500 280C390 280 410 120 265 120M500 280C610 280 590 120 735 120M500 280C390 280 410 440 265 440M500 280C610 280 590 440 735 440"/></svg>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsComponent {
  readonly highlights = architectureHighlights;
}
