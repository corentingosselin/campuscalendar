import { Directive, HostListener, OnInit, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appValidateField]',
  standalone: true,
})
export class ValidateFieldDirective implements OnInit {
  private control = inject(NgControl);

  ngOnInit() {
    const abstractControl = this.control.control;
    if (!abstractControl) {
      throw new Error('No abstract control found');
    }
  }

  @HostListener('blur', ['$event.target'])
  onBlur() {
    const abstractControl = this.control.control;
    if (abstractControl && abstractControl.touched) {
      if (abstractControl.invalid) {
        abstractControl.markAsDirty();
      }
    }
  }
}
