import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteLanguage } from './language.service';
import { profile } from '../../data/portfolio.data';

const metadata = {
  en: {
    title: 'Mahdi Koushyar — Software Engineer & Frontend Architect',
    description: 'Portfolio of Mahdi Koushyar, focused on scalable frontend architecture, Angular systems, and high-performance digital products.',
  },
  fa: {
    title: 'مهدی کوشیار — مهندس نرم‌افزار و معمار فرانت‌اند',
    description: 'پورتفولیوی مهدی کوشیار؛ متخصص معماری مقیاس‌پذیر فرانت‌اند، سیستم‌های Angular و تجربه‌های دیجیتال سریع.',
  },
} as const;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(language: SiteLanguage): void {
    const content = metadata[language];
    this.title.setTitle(content.title);
    this.meta.updateTag({ name: 'description', content: content.description });
    this.meta.updateTag({ property: 'og:title', content: content.title });
    this.meta.updateTag({ property: 'og:description', content: content.description });
    this.meta.updateTag({ name: 'twitter:title', content: content.title });
    this.meta.updateTag({ name: 'twitter:description', content: content.description });
    this.document.querySelector('link[rel="canonical"]')?.setAttribute('href', profile.canonicalUrl);
  }
}
