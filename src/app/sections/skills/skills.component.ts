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
          @for (group of groups; track group.titleKey) {
            <article class="skill-group">
              <div class="skill-group__heading"><span>{{ group.index }}</span><h3>{{ group.titleKey | transloco }}</h3></div>
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
  readonly groups = skillGroups;
}
