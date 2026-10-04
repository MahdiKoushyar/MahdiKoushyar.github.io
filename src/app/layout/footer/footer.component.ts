import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/services/language.service';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { LogoMarkComponent } from '../../shared/logo-mark/logo-mark.component';

@Component({
  selector: 'mk-footer',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, SocialLinksComponent, LogoMarkComponent],
  template: `
    <footer class="site-footer">
      <div class="shell site-footer__grid">
        <div><a routerLink="/" class="footer-mark" aria-label="Mahdi Koushyar home"><mk-logo-mark /></a><p>{{ 'footer.line' | transloco }}</p></div>
        <div class="site-footer__links">
          <a routerLink="/" fragment="projects">{{ 'nav.projects' | transloco }}</a>
          <a routerLink="/" fragment="contact">{{ 'nav.contact' | transloco }}</a>
          <button type="button" (click)="language.toggle()">{{ language.language() === 'en' ? 'فارسی' : 'English' }}</button>
        </div>
        <mk-social-links />
      </div>
      <div class="shell site-footer__bottom">
        <span>© {{ year }} Mahdi Koushyar</span>
        <span>{{ 'footer.built' | transloco }}</span>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly language = inject(LanguageService);
  readonly year = new Date().getFullYear();
}
