import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShadowWithColor]',
  standalone: true,
})
export class ShadowWithColorDirective {
  @Input() color: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('white');
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.boxShadow = `2px 2px 5px ${color}`;
  }
}
