import { afterNextRender, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'mk-back-to-top',
  standalone: true,
  imports: [TranslocoPipe],
  template: `
    <button type="button" class="back-to-top" [class.visible]="visible()" (click)="scrollTop()" [attr.aria-label]="'controls.backToTop' | transloco">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent {
  readonly visible = signal(false);

  constructor() {
    afterNextRender(() => addEventListener('scroll', () => this.visible.set(scrollY > 720), { passive: true }));
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}
