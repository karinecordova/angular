import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appShowErrorForm]',
  standalone: true,
})
export class ShowErrorFormDirective {
  errorMessageMin: string = 'A idade deve ser no mínimo de 18 anos';
  errorMessageMax: string = 'A idade deve ser no máximo de 100 anos';

  private errorElement!: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {}

  ngOnInit() {
    this.errorElement = this.renderer.createElement('p');
    this.renderer.addClass(this.errorElement, 'error-message');
    this.renderer.setStyle(this.errorElement, 'fontSize', '14px');
    this.renderer.setStyle(this.errorElement, 'display', 'none');
    this.renderer.appendChild(
      this.el.nativeElement.parentElement,
      this.errorElement
    );

    // Subscribe to the status changes of the form control
    this.control.statusChanges?.subscribe((status) => {
      this.toggleErrorMessage();
    });

    // Initial check
    this.toggleErrorMessage();
  }

  private toggleErrorMessage() {
    const isInvalidAndDirtyOrTouched =
      this.control.invalid && (this.control.dirty || this.control.touched);
    const value = this.control.value;
    if (isInvalidAndDirtyOrTouched && value < 18) {
      this.renderer.setStyle(this.errorElement, 'display', 'block');
      this.renderer.setProperty(
        this.errorElement,
        'textContent',
        this.errorMessageMin
      );
    } else if (isInvalidAndDirtyOrTouched && value > 100) {
      this.renderer.setStyle(this.errorElement, 'display', 'block');
      this.renderer.setProperty(
        this.errorElement,
        'textContent',
        this.errorMessageMax
      );
    } else {
      this.renderer.setStyle(this.errorElement, 'display', 'none');
    }
  }
}
