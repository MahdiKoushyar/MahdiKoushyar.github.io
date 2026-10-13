import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/services/language.service';
import { profile } from '../../data/portfolio.data';

@Component({
  selector: 'mk-resume-download',
  standalone: true,
  imports: [TranslocoPipe],
  template: `
    <a class="button button--secondary" [href]="resume().url" [attr.download]="resume().filename">
      {{ resume().labelKey | transloco }} <span aria-hidden="true">↓</span>
    </a>
  `,
  styles: `:host { display: inline-flex; min-inline-size: 0; } a { inline-size: 100%; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeDownloadComponent {
  private readonly language = inject(LanguageService);
  readonly resume = computed(() => {
    const persian = this.language.language() === 'fa';
    return {
      url: `${persian ? profile.resumeFaUrl : profile.resumeUrl}?v=${profile.resumeVersion}`,
      filename: `Mahdi-Koushyar-Resume-${persian ? 'FA' : 'EN'}.pdf`,
      labelKey: persian ? 'hero.resumePersian' : 'hero.resumeEnglish',
    };
  });
}
