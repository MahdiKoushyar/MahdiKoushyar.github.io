import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BackToTopComponent } from './shared/back-to-top/back-to-top.component';
import { LanguageService } from './core/services/language.service';
import { SeoService } from './core/services/seo.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'mk-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BackToTopComponent],
  template: `
    <a class="skip-link" href="#main-content">{{ language.language() === 'fa' ? 'رفتن به محتوای اصلی' : 'Skip to main content' }}</a>
    <mk-header />
    <router-outlet />
    <mk-footer />
    <mk-back-to-top />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly language = inject(LanguageService);
  private readonly theme = inject(ThemeService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => this.seo.update(this.language.language()));
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed()).subscribe(() => {
      if (this.router.url.split(/[?#]/)[0] === '/') {
        queueMicrotask(() => this.seo.update(this.language.language()));
      }
    });
    void this.theme.theme();
  }
}
