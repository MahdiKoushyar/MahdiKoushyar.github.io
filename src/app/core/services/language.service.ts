import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type SiteLanguage = 'en' | 'fa';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly transloco = inject(TranslocoService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly language = signal<SiteLanguage>(this.readInitialLanguage());
  readonly direction = computed(() => this.language() === 'fa' ? 'rtl' : 'ltr');

  constructor() {
    effect(() => {
      const language = this.language();
      this.document.documentElement.lang = language;
      this.document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
      this.transloco.setActiveLang(language);
      if (this.isBrowser) localStorage.setItem('mk-language', language);
    });
  }

  toggle(): void {
    this.language.update((current) => current === 'en' ? 'fa' : 'en');
  }

  private readInitialLanguage(): SiteLanguage {
    const fromDocument = this.document.documentElement.lang;
    if (fromDocument === 'fa') return 'fa';
    if (!this.isBrowser) return 'en';
    return localStorage.getItem('mk-language') === 'fa' ? 'fa' : 'en';
  }
}
