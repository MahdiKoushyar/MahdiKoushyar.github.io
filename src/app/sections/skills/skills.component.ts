import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { skillGroups } from '../../data/portfolio.data';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'mk-skills',
  standalone: true,
  imports: [TranslocoPipe, RevealDirective, SectionHeadingComponent],
  template: `
    <section id="skills" class="section section--skills">
      <div class="shell" mkReveal>
        <mk-section-heading index="03" eyebrowKey="skills.eyebrow" titleKey="skills.title" descriptionKey="skills.lead" />
        <div class="skills-matrix">
          @for (group of groups; track group.titleKey; let index = $index) {
            <article class="skill-group">
              <div class="skill-group__heading"><span>{{ group.index }}</span><svg class="skill-group__icon" viewBox="0 0 32 32" aria-hidden="true"><path [attr.d]="icons[index]" /></svg><h3>{{ group.titleKey | transloco }}</h3></div>
              <div class="tag-list tag-list--large">
                @for (skill of group.skills; track skill) { <span dir="ltr">{{ skill }}</span> }
                @for (skillKey of group.translatedSkills; track skillKey) { <span>{{ skillKey | transloco }}</span> }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly icons = [
    'M11 9 4 16l7 7M21 9l7 7-7 7M18 5l-4 22',
    'm16 3 13 7-13 7L3 10Zm-13 13 13 7 13-7M3 22l13 7 13-7',
    'M11 10H7a6 6 0 0 0 0 12h4M21 10h4a6 6 0 0 1 0 12h-4M10 16h12',
    'M5 25a13 13 0 1 1 22 0M16 17l7-7M9 24h14',
    'm12 5-8 8 8 8M20 11l8 8-8 8M19 3l-6 26',
  ];
  readonly groups = skillGroups;
}
