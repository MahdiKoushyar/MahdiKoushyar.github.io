import { DOCUMENT, ViewportScroller } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, inject, Injector, OnDestroy, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';
import { LogoMarkComponent } from '../../shared/logo-mark/logo-mark.component';

const navigation = ['home', 'about', 'experience', 'skills', 'projects', 'contact'] as const;

@Component({
  selector: 'mk-header',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, LogoMarkComponent],
  host: { '(document:keydown)': 'onKeydown($event)' },
  template: `
    <header class="site-header" [class.menu-open]="menuOpen()">
      <div class="site-header__bar shell">
        <a routerLink="/" fragment="home" class="monogram" aria-label="Mahdi Koushyar home">
          <span class="monogram__mark"><mk-logo-mark /></span>
        </a>

        <nav class="desktop-nav" [attr.aria-label]="'nav.primary' | transloco">
          @for (item of navigation; track item) {
            <a routerLink="/" [fragment]="item" [class.active]="activeSection() === item" [attr.aria-current]="activeSection() === item ? 'location' : null">
              {{ 'nav.' + item | transloco }}
            </a>
          }
        </nav>

        <div class="header-actions">
          <button type="button" class="icon-button language-button" (click)="language.toggle()" [attr.aria-label]="'controls.language' | transloco">
            <span aria-hidden="true">{{ language.language() === 'en' ? 'FA' : 'EN' }}</span>
          </button>
          <button type="button" class="icon-button" (click)="theme.toggle()" [attr.aria-label]="'controls.theme' | transloco" [attr.aria-pressed]="theme.theme() === 'dark'">
            @if (theme.theme() === 'dark') {
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>
            } @else {
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
            }
          </button>
          <button type="button" class="icon-button menu-button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-controls="mobile-navigation" [attr.aria-label]="'controls.menu' | transloco">
            <span class="menu-button__lines" aria-hidden="true"><i></i><i></i></span>
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" class="mobile-nav" [class.open]="menuOpen()" [attr.aria-hidden]="!menuOpen()" [attr.aria-label]="'nav.primary' | transloco">
        <div class="shell mobile-nav__inner">
          <p class="eyebrow">{{ 'nav.menu' | transloco }}</p>
          @for (item of navigation; track item; let index = $index) {
            <a routerLink="/" [fragment]="item" (click)="closeMenu()" [attr.tabindex]="menuOpen() ? 0 : -1">
              <span>0{{ index + 1 }}</span>{{ 'nav.' + item | transloco }}
            </a>
          }
        </div>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);
  private readonly scroller = inject(ViewportScroller);
  readonly theme = inject(ThemeService);
  readonly language = inject(LanguageService);
  readonly navigation = navigation;
  readonly menuOpen = signal(false);
  readonly activeSection = signal('home');
  private observer?: IntersectionObserver;

  constructor() {
    this.scroller.setOffset(() => [0, (this.document.querySelector('.site-header')?.getBoundingClientRect().height ?? 84) + 24]);
    afterNextRender(() => this.observeSections());
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed()).subscribe(() => {
      afterNextRender(() => this.observeSections(), { injector: this.injector });
    });
  }

  private observeSections(): void {
      this.observer?.disconnect();
      const sections = navigation.map((id) => this.document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
      this.observer = new IntersectionObserver(() => {
        // Entries contain only changed intersections, not every visible chapter.
        const readingLine = this.document.documentElement.clientHeight * 0.4;
        const current = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= readingLine && bounds.bottom > readingLine;
        });
        if (current) this.activeSection.set(current.id);
      }, { rootMargin: '-40% 0px -59%', threshold: 0 });
      sections.forEach((section) => this.observer?.observe(section));
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.document.body.classList.toggle('menu-lock', this.menuOpen());
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.document.body.classList.remove('menu-lock');
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen()) return;
    if (event.key === 'Escape') {
      this.closeMenu();
      this.document.querySelector<HTMLButtonElement>('.menu-button')?.focus();
    }
    if (event.key === 'Tab') {
      const controls = [...this.document.querySelectorAll<HTMLElement>('.site-header a[href], .site-header button')]
        .filter((element) => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && this.document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && this.document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.document.body.classList.remove('menu-lock');
  }
}
