import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteLanguage } from './language.service';
import { profile } from '../../data/portfolio.data';

const metadata = {
  en: {
    title: 'Mahdi Koushyar — Senior Frontend Developer | Angular & React',
    description: 'Senior Frontend Developer working with Angular, React, TypeScript and Nx. Enterprise and ERP projects, PWA, state management and web performance. Open to remote opportunities.',
  },
  fa: {
    title: 'مهدی کوشیار — توسعه‌دهنده ارشد فرانت‌اند | Angular و React',
    description: 'توسعه‌دهنده ارشد فرانت‌اند با Angular، React، TypeScript و Nx؛ پروژه‌های سازمانی و ERP، PWA، مدیریت وضعیت و عملکرد وب. آمادهٔ همکاری ریموت.',
  },
} as const;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(language: SiteLanguage, route = '/'): void {
    const content = metadata[language];
    this.title.setTitle(content.title);
    this.meta.updateTag({ name: 'description', content: content.description });
    this.meta.updateTag({ property: 'og:title', content: content.title });
    this.meta.updateTag({ property: 'og:description', content: content.description });
    this.meta.updateTag({ name: 'twitter:title', content: content.title });
    this.meta.updateTag({ name: 'twitter:description', content: content.description });
    const canonicalUrl = new URL(route.split(/[?#]/)[0], profile.canonicalUrl).href;
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
  }
}
