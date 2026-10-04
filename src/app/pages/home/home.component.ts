import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from '../../sections/about/about.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { ExperienceComponent } from '../../sections/experience/experience.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { HighlightsComponent } from '../../sections/highlights/highlights.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { SkillsComponent } from '../../sections/skills/skills.component';

@Component({
  selector: 'mk-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, ExperienceComponent, SkillsComponent, ProjectsComponent, HighlightsComponent, ContactComponent],
  template: `<main id="main-content" tabindex="-1"><mk-hero /><mk-about /><mk-experience /><mk-skills /><mk-projects /><mk-highlights /><mk-contact /></main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
