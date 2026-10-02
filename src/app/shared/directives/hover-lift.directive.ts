import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[aslHoverLift]',
  standalone: true,
})
export class HoverLiftDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  @HostListener('mouseenter')
  protected onMouseEnter(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      'translateY(-3px)',
    );
  }

  @HostListener('mouseleave')
  protected onMouseLeave(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'transform');
  }
}
