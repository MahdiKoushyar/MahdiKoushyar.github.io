import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly theme = signal<Theme>(this.readInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.setAttribute('data-theme', theme);
      this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0c0f' : '#f4f3ef');
      if (this.isBrowser) localStorage.setItem('mk-theme', theme);
    });
  }

  toggle(): void {
    this.theme.update((current) => current === 'dark' ? 'light' : 'dark');
  }

  private readInitialTheme(): Theme {
    const fromDocument = this.document.documentElement.getAttribute('data-theme');
    if (fromDocument === 'light' || fromDocument === 'dark') return fromDocument;
    if (!this.isBrowser) return 'dark';
    const stored = localStorage.getItem('mk-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
