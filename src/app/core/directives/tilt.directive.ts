import { afterNextRender, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

/** Small pointer-driven depth effect; touch and reduced-motion stay stationary. */
@Directive({ selector: '[mkTilt]', standalone: true })
export class TiltDirective implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly events = new AbortController();
  private frame = 0;

  constructor() {
    afterNextRender(() => {
      const node = this.element.nativeElement;
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      const reset = () => {
        cancelAnimationFrame(this.frame);
        node.style.setProperty('--tilt-x', '0deg');
        node.style.setProperty('--tilt-y', '0deg');
      };
      node.addEventListener('pointermove', (event) => {
        if (motion.matches || event.pointerType !== 'mouse') return;
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 7;
        const y = ((event.clientY - rect.top) / rect.height - .5) * -7;
        cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => {
          node.style.setProperty('--tilt-x', `${y}deg`);
          node.style.setProperty('--tilt-y', `${x}deg`);
        });
      }, { signal: this.events.signal, passive: true });
      node.addEventListener('pointerleave', reset, { signal: this.events.signal });
      motion.addEventListener('change', reset, { signal: this.events.signal });
    });
  }

  ngOnDestroy(): void {
    this.events.abort();
    if (this.frame) cancelAnimationFrame(this.frame);
  }
}
