import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'mk-section-heading',
  standalone: true,
  imports: [TranslocoPipe],
  template: `
    <div class="section-heading">
      <span class="section-heading__index" aria-hidden="true">{{ index() }}</span>
      <div>
        <p class="eyebrow">{{ eyebrowKey() | transloco }}</p>
        <h2>{{ titleKey() | transloco }}</h2>
        @if (descriptionKey()) { <p class="section-heading__description">{{ descriptionKey() | transloco }}</p> }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  readonly index = input.required<string>();
  readonly eyebrowKey = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input<string>('');
}
