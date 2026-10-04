import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { profile } from '../../data/portfolio.data';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

@Component({
  selector: 'mk-contact',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoPipe, RevealDirective, SectionHeadingComponent, SocialLinksComponent],
  template: `
    <section id="contact" class="section section--contact">
      <div class="shell" mkReveal>
        <mk-section-heading index="06" eyebrowKey="contact.eyebrow" titleKey="contact.title" descriptionKey="contact.lead" />
        <div class="contact-grid">
          <div class="contact-aside">
            <p class="contact-aside__statement">{{ 'contact.statement' | transloco }}</p>
            @if (profile.email) { <a class="contact-email" [href]="'mailto:' + profile.email">{{ profile.email }}</a> }
            @if (profile.location) { <p>{{ profile.location }}</p> }
            <mk-social-links />
            <div class="contact-note"><span aria-hidden="true"></span><p>{{ 'contact.response' | transloco }}</p></div>
          </div>

          <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            @if (showSummary()) {
              <div class="form-summary" role="alert" tabindex="-1" id="form-error-summary">
                <strong>{{ 'contact.errors.summary' | transloco }}</strong>
              </div>
            }
            <div class="field-row">
              <div class="field"><label for="contact-name">{{ 'contact.fields.name' | transloco }} <span aria-hidden="true">*</span></label><input id="contact-name" formControlName="name" autocomplete="name" [attr.aria-invalid]="invalid('name')" aria-describedby="name-error">
                @if (invalid('name')) { <small id="name-error" role="alert">{{ 'contact.errors.required' | transloco }}</small> }
              </div>
              <div class="field"><label for="contact-email">{{ 'contact.fields.email' | transloco }} <span aria-hidden="true">*</span></label><input id="contact-email" type="email" formControlName="email" autocomplete="email" [attr.aria-invalid]="invalid('email')" aria-describedby="email-error">
                @if (invalid('email')) { <small id="email-error" role="alert">{{ 'contact.errors.email' | transloco }}</small> }
              </div>
            </div>
            <div class="field"><label for="contact-subject">{{ 'contact.fields.subject' | transloco }} <span aria-hidden="true">*</span></label><input id="contact-subject" formControlName="subject" [attr.aria-invalid]="invalid('subject')" aria-describedby="subject-error">
              @if (invalid('subject')) { <small id="subject-error" role="alert">{{ 'contact.errors.required' | transloco }}</small> }
            </div>
            <div class="field"><label for="contact-message">{{ 'contact.fields.message' | transloco }} <span aria-hidden="true">*</span></label><textarea id="contact-message" formControlName="message" rows="5" [attr.aria-invalid]="invalid('message')" aria-describedby="message-error"></textarea>
              @if (invalid('message')) { <small id="message-error" role="alert">{{ 'contact.errors.message' | transloco }}</small> }
            </div>
            <div class="contact-form__bottom"><p>{{ 'contact.privacy' | transloco }}</p><button class="button button--primary" type="submit">{{ 'contact.send' | transloco }} <span aria-hidden="true">↗</span></button></div>
            @if (status()) { <p class="form-status" role="status">{{ status() | transloco }}</p> }
          </form>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  readonly profile = profile;
  readonly showSummary = signal(false);
  readonly status = signal('');
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  invalid(controlName: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.showSummary());
  }

  submit(): void {
    this.status.set('');
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.showSummary.set(true);
      setTimeout(() => document.getElementById('form-error-summary')?.focus());
      return;
    }
    this.showSummary.set(false);
    this.status.set('contact.notConfigured');
  }
}
