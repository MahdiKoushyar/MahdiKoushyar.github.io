import { afterNextRender, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({ selector: '[mkReveal]', standalone: true })
export class RevealDirective implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.element.nativeElement.classList.add('is-visible');
        return;
      }
      this.observer = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        this.element.nativeElement.classList.add('is-visible');
        this.observer?.disconnect();
      }, { threshold: 0.14, rootMargin: '0px 0px -48px' });
      this.observer.observe(this.element.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
