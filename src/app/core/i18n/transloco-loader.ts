import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import en from '../../../assets/i18n/en.json';
import fa from '../../../assets/i18n/fa.json';

const translations: Record<string, Translation> = { en, fa };

@Injectable({ providedIn: 'root' })
export class PortfolioTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    return Promise.resolve(translations[lang] ?? translations['en']);
  }
}
