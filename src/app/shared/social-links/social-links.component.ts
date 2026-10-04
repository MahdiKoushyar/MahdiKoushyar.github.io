import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { profile } from '../../data/portfolio.data';

@Component({
  selector: 'mk-social-links',
  standalone: true,
  template: `
    @if (links().length) {
      <ul class="social-links" aria-label="Social links">
        @for (link of links(); track link.id) {
          <li><a [href]="link.url" target="_blank" rel="noreferrer" [attr.aria-label]="link.label">{{ link.label }} <span aria-hidden="true">↗</span></a></li>
        }
      </ul>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly links = computed(() => profile.socialLinks.filter((link) => Boolean(link.url)));
}
