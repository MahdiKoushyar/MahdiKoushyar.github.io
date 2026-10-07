import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { profile } from '../../data/portfolio.data';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { TiltDirective } from '../../core/directives/tilt.directive';

@Component({
  selector: 'mk-hero',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, SocialLinksComponent, TiltDirective],
  template: `
    <section id="home" class="hero" aria-labelledby="hero-title">
      <div class="hero__grid" aria-hidden="true"></div>
      <div class="hero__halo" aria-hidden="true"></div>
      <div class="shell hero__inner">
        <div class="hero__content">
          <div class="availability"><span></span>{{ 'hero.availability' | transloco }}</div>
          <p class="hero__kicker">{{ 'hero.kicker' | transloco }}</p>
          <h1 id="hero-title"><span>{{ 'hero.firstName' | transloco }}</span><span>{{ 'hero.lastName' | transloco }}<span class="accent-dot">.</span></span></h1>
          <p class="hero__roles">{{ 'hero.roles' | transloco }}</p>
          <p class="hero__statement">{{ 'hero.statement' | transloco }}</p>
          <div class="hero__actions">
            <a routerLink="/" fragment="contact" class="button button--primary">{{ 'hero.contact' | transloco }} <span class="direction-arrow" aria-hidden="true">↗</span></a>
            @if (profile.resumeUrl) {
              <a [href]="profile.resumeUrl" class="button button--secondary" download>{{ 'hero.resume' | transloco }}</a>
            }
            <a routerLink="/" fragment="skills" class="button button--secondary">{{ 'hero.exploreSkills' | transloco }}</a>
          </div>
          <mk-social-links />
          <div class="hero-focus" [attr.aria-label]="'hero.focusLabel' | transloco">
            <span>Angular / React</span><span>WordPress</span><span>{{ 'skills.aiApplication' | transloco }}</span>
          </div>
        </div>

        <div class="system-preview" mkTilt [attr.aria-label]="'hero.visualLabel' | transloco">
          <div class="system-preview__label"><span class="status-dot"></span>{{ 'hero.visualLabel' | transloco }}<span class="system-preview__code" aria-hidden="true">MK / 01</span></div>
          <div class="system-scene" aria-hidden="true">
            <div class="system-scene__orbit"></div>
            <div class="system-scene__orbit system-scene__orbit--outer"></div>
            <div class="system-scene__cross system-scene__cross--one">+</div>
            <div class="system-scene__cross system-scene__cross--two">+</div>
            <div class="system-plane system-plane--domain" [class.selected]="activeLayer() === 'domain'"><span class="plane-glyph">&#123; &#125;</span><span>DOMAIN</span><i></i></div>
            <div class="system-plane system-plane--state" [class.selected]="activeLayer() === 'state'"><span class="plane-glyph">↔</span><span>STATE</span><i></i></div>
            <div class="system-plane system-plane--interface" [class.selected]="activeLayer() === 'interface'"><span class="plane-window"><i></i><i></i><i></i><b></b></span><span>INTERFACE</span><i></i></div>
            <div class="system-scene__caption"><span></span>DESIGNED TO CONNECT</div>
          </div>
          <div class="system-layers" role="group" [attr.aria-label]="'hero.exploreLayers' | transloco">
            @for (layer of layers; track layer; let index = $index) {
              <button type="button" [class.active]="activeLayer() === layer" [attr.aria-pressed]="activeLayer() === layer" (click)="activeLayer.set(layer)"><span>0{{ index + 1 }}</span>{{ 'hero.layers.' + layer | transloco }}</button>
            }
          </div>
          <p class="system-preview__detail" aria-live="polite">{{ 'hero.layerDetails.' + activeLayer() | transloco }}</p>
        </div>
      </div>
      <div class="shell hero__foot"><span>{{ 'hero.stackLabel' | transloco }}</span><div class="hero-stack" dir="ltr"><span>Angular</span><span>TypeScript</span><span>Nx</span><span>Signals</span></div><a routerLink="/" fragment="about">{{ 'hero.scroll' | transloco }} <span aria-hidden="true">↓</span></a></div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly profile = profile;
  readonly layers = ['interface', 'state', 'domain'] as const;
  readonly activeLayer = signal<(typeof this.layers)[number]>('interface');
}
