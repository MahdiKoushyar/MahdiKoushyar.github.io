import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'mk-not-found',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  template: `
    <main id="main-content" class="not-found shell" tabindex="-1">
      <p class="not-found__code">404</p><p class="eyebrow">{{ 'notFound.eyebrow' | transloco }}</p><h1>{{ 'notFound.title' | transloco }}</h1><p>{{ 'notFound.text' | transloco }}</p>
      <a class="button button--primary" routerLink="/">{{ 'notFound.action' | transloco }}</a>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
