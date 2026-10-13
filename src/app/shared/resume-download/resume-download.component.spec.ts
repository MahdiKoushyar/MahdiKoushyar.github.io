import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { describe, expect, it } from 'vitest';
import en from '../../../assets/i18n/en.json';
import fa from '../../../assets/i18n/fa.json';
import { LanguageService, SiteLanguage } from '../../core/services/language.service';
import { ResumeDownloadComponent } from './resume-download.component';

describe('language-aware resume download', () => {
  for (const initial of ['en', 'fa'] as const) {
    it(`updates the PDF and label when switching from ${initial}`, async () => {
      const language = signal<SiteLanguage>(initial);
      TestBed.configureTestingModule({
        imports: [ResumeDownloadComponent, TranslocoTestingModule.forRoot({
          langs: { en, fa }, preloadLangs: true,
          translocoConfig: { availableLangs: ['en', 'fa'], defaultLang: initial, reRenderOnLangChange: true },
        })],
        providers: [{ provide: LanguageService, useValue: { language } }],
      });
      const fixture = TestBed.createComponent(ResumeDownloadComponent);
      const translations = TestBed.inject(TranslocoService);
      for (const locale of [initial, initial === 'en' ? 'fa' : 'en'] as SiteLanguage[]) {
        language.set(locale);
        translations.setActiveLang(locale);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        const suffix = locale === 'fa' ? 'FA' : 'EN';
        expect(anchor.getAttribute('href')).toBe(`/resumes/Mahdi-Koushyar-Resume-${suffix}.pdf?v=2026-10-13-farsi`);
        expect(anchor.download).toBe(`Mahdi-Koushyar-Resume-${suffix}.pdf`);
        expect(anchor.textContent).toContain(locale === 'fa' ? fa.hero.resumePersian : en.hero.resumeEnglish);
      }
    });
  }
});
