import { ChangeDetectionStrategy, Component } from '@angular/core';

/** A solid, shared-stem monogram with open counters for small-size clarity. */
@Component({
  selector: 'mk-logo-mark',
  standalone: true,
  template: `
    <svg viewBox="0 0 72 48" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M6 40V8h8l10 15L34 8h8v13L55 8h10L48 25l17 15H54L42 29v11h-8V23L24 37L14 23v17Z" />
    </svg>
  `,
  styles: `:host { display: inline-flex; width: 100%; height: 100%; } svg { width: 100%; height: 100%; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMarkComponent {}
